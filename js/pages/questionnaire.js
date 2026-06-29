import { navigate } from '../router.js';
import { SECTIONS } from '../data/questions.js';
import { renderProgressBar } from '../components/progressBar.js';
import { calculateScores } from '../engine/scoring.js';
import { generateReport } from '../engine/report.js';
import { saveAnswers, saveResults, getAnswers, saveLead, getLead } from '../utils/storage.js';
import { showLeadCapture } from '../components/leadCapture.js';
import { buildTags, submitLead } from '../utils/emailService.js';
import { trackCompleteQuiz, trackEvent } from '../utils/analytics.js';

export function renderQuestionnairePage(container) {
  // 1. Initialize local state or load existing answers
  let answers = getAnswers();
  let isIntro = true;
  
  // Calculate total questions across all sections
  let totalQuestionsGlobal = 0;
  SECTIONS.forEach(sec => {
    totalQuestionsGlobal += sec.questions.length;
  });

  // Track current question indices
  let currentSectionIdx = 0;
  let currentQuestionIdx = 0;
  let globalQuestionIdx = 0;

  // Render entry function
  const render = () => {
    if (isIntro) {
      renderIntro();
    } else {
      renderQuestion();
    }
  };

  // Render Intro/Instruction screen
  const renderIntro = () => {
    const html = `
      <div class="container quiz-container animate-fade-in">
        <div class="card quiz-card">
          <div>
            <div class="text-center mb-4">
              <span style="font-size: var(--text-xxl)">📋</span>
              <h2 class="font-heading mt-2">Let's Find Your Soccer Formation</h2>
              <p class="text-secondary" style="max-width: 500px; margin: 0 auto;">
                Answer tactical questions about your squad, training constraints, and coaching preferences across 6 distinct sections. Takes 3–5 minutes.
              </p>
            </div>
            <div class="divider mb-4"></div>
            <div class="mb-5" style="max-width: 500px; margin: 0 auto;">
              <h4 class="font-heading mb-3">Sections Checklist</h4>
              <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: var(--space-3);">
                ${SECTIONS.map((sec, idx) => `
                  <li style="display: flex; gap: var(--space-3); align-items: center;">
                    <span style="font-size: var(--text-md); background: var(--color-surface-light); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); display: flex; width: 40px; height: 40px; justify-content: center; align-items: center;">
                      ${sec.icon}
                    </span>
                    <div>
                      <span class="fw-600" style="display: block;">Section ${idx + 1}: ${sec.title}</span>
                      <span class="text-muted" style="font-size: var(--text-xs);">${sec.questions.length} question${sec.questions.length > 1 ? 's' : ''}</span>
                    </div>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
          <div class="text-center">
            <button id="begin-quiz-btn" class="btn btn-primary btn-large btn-block">Begin Assessment →</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;

    container.querySelector('#begin-quiz-btn').addEventListener('click', () => {
      isIntro = false;
      render();
    });
  };

  // Render specific question
  const renderQuestion = () => {
    const section = SECTIONS[currentSectionIdx];
    const question = section.questions[currentQuestionIdx];
    
    // Check existing answer
    const currentAnswer = answers[question.id];
    
    // Create HTML shell
    container.innerHTML = `
      <div class="container quiz-container animate-fade-in">
        <!-- Progress bar container -->
        <div id="quiz-progress"></div>
        
        <div class="card quiz-card mt-3">
          <div>
            <div class="quiz-header">
              <span class="tag tag-accent quiz-section-badge">
                <span>${section.icon}</span> ${section.title}
              </span>
              <h3 class="quiz-question-text mt-2">${question.text}</h3>
              ${question.type === 'multi' ? `
                <span class="quiz-multi-indicator">Choose up to ${question.maxSelections} strengths or problems that match your squad.</span>
              ` : ''}
            </div>
            
            <div class="quiz-body">
              <div class="option-grid">
                ${question.options.map(opt => {
                  let isSelected = false;
                  if (question.type === 'single') {
                    isSelected = currentAnswer === opt.value;
                  } else {
                    isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(opt.value);
                  }
                  
                  return `
                    <div class="option-card ${question.type === 'multi' ? 'option-checkbox' : ''} ${isSelected ? 'selected' : ''}" data-value="${opt.value}">
                      <span>${opt.label}</span>
                    </div>
                  `;
                }).join('')}
              </div>
              
              ${question.type === 'multi' ? `
                <div class="text-center mt-4 text-secondary" id="multi-select-count" style="font-size: var(--text-xs);">
                  Selected: ${Array.isArray(currentAnswer) ? currentAnswer.length : 0} of ${question.maxSelections}
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="quiz-nav">
            <button id="quiz-prev-btn" class="btn btn-secondary" ${globalQuestionIdx === 0 ? 'disabled' : ''}>← Back</button>
            ${question.type === 'multi' ? `
              <button id="quiz-next-btn" class="btn btn-primary" ${!Array.isArray(currentAnswer) || currentAnswer.length === 0 ? 'disabled' : ''}>
                ${isLastQuestion() ? 'Get My Tactical Blueprint →' : 'Next Question →'}
              </button>
            ` : `
              <div class="text-muted flex-center" style="font-size: var(--text-xs);">Click an option to continue</div>
            `}
          </div>
        </div>
      </div>
    `;

    // Render Progress Bar component
    renderProgressBar(container.querySelector('#quiz-progress'), currentSectionIdx, globalQuestionIdx, totalQuestionsGlobal);

    // Option Clicks
    const optionCards = container.querySelectorAll('.option-card');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        const value = card.getAttribute('data-value');
        
        if (question.type === 'single') {
          // Select single and auto advance
          answers[question.id] = value;
          saveAnswers(answers);
          
          // Select visual styling
          optionCards.forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          
          // Auto advance after short delay for feedback feel
          setTimeout(() => {
            advanceQuestion();
          }, 350);
          
        } else {
          // Multi select logic
          let list = Array.isArray(answers[question.id]) ? [...answers[question.id]] : [];
          
          if (list.includes(value)) {
            list = list.filter(v => v !== value);
            card.classList.remove('selected');
          } else {
            if (list.length < question.maxSelections) {
              list.push(value);
              card.classList.add('selected');
            }
          }
          
          answers[question.id] = list;
          saveAnswers(answers);
          
          // Update count
          const countDiv = container.querySelector('#multi-select-count');
          if (countDiv) countDiv.innerHTML = `Selected: ${list.length} of ${question.maxSelections}`;
          
          // Toggle Next button disable
          const nextBtn = container.querySelector('#quiz-next-btn');
          if (nextBtn) {
            nextBtn.disabled = list.length === 0;
          }

          // Disable remaining cards if max reached
          toggleDisabledOptionCards(list.length >= question.maxSelections);
        }
      });
    });

    // Handle disabled options initially for multi-select
    if (question.type === 'multi') {
      const list = Array.isArray(answers[question.id]) ? answers[question.id] : [];
      toggleDisabledOptionCards(list.length >= question.maxSelections);
    }

    // Prev Button
    container.querySelector('#quiz-prev-btn').addEventListener('click', () => {
      retreatQuestion();
    });

    // Next Button (only for multi)
    const nextBtn = container.querySelector('#quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        advanceQuestion();
      });
    }
  };

  // Helper to grey out cards when limits reached
  const toggleDisabledOptionCards = (shouldDisable) => {
    const cards = container.querySelectorAll('.option-card');
    cards.forEach(card => {
      if (!card.classList.contains('selected')) {
        if (shouldDisable) {
          card.classList.add('disabled');
        } else {
          card.classList.remove('disabled');
        }
      }
    });
  };

  const isLastQuestion = () => {
    return currentSectionIdx === SECTIONS.length - 1 && currentQuestionIdx === SECTIONS[currentSectionIdx].questions.length - 1;
  };

  const advanceQuestion = () => {
    if (isLastQuestion()) {
      handleQuizCompletion();
    } else {
      // Step forward
      globalQuestionIdx++;
      currentQuestionIdx++;
      if (currentQuestionIdx >= SECTIONS[currentSectionIdx].questions.length) {
        currentSectionIdx++;
        currentQuestionIdx = 0;
      }
      render();
    }
  };

  const retreatQuestion = () => {
    if (globalQuestionIdx > 0) {
      globalQuestionIdx--;
      currentQuestionIdx--;
      if (currentQuestionIdx < 0) {
        currentSectionIdx--;
        currentQuestionIdx = SECTIONS[currentSectionIdx].questions.length - 1;
      }
      render();
    }
  };

  // Completion calculation
  const handleQuizCompletion = () => {
    // 1. Calculate Scores
    const scores = calculateScores(answers);

    // 2. Generate detailed report
    const report = generateReport(answers, scores);

    // 3. Save to storage
    saveResults(report);

    // 4. Fire analytics
    trackCompleteQuiz(answers);
    try {
      trackEvent('quiz_completed', {
        recommendedFormation: report.recommended?.formation?.id || ''
      });
    } catch (e) {}

    // 5. Trigger Lead Capture Inline Form (required — no skip)
    showLeadCapture(container, (leadData) => {
      // Enrich saved lead with formation results, priorities, and answers
      const enriched = {
        ...leadData,
        recommendedFormation:  report.recommended?.formation?.id  || '',
        alternativeFormation:  report.alternative?.formation?.id  || '',
        formationToAvoid:      report.avoid?.formation?.id        || '',
        attackingShape:        report.recommended?.formation?.recommendedAttackingShape  || '',
        defensiveShape:        report.recommended?.formation?.recommendedDefensiveShape  || '',
        trainingFocus:         report.recommended?.formation?.trainingTopics?.[0]?.title || '',
        priorities: [
          ...(report.recommended?.formation?.attackingPrinciples?.slice(0, 2) || []),
          ...(report.recommended?.formation?.defensivePrinciples?.slice(0, 2) || [])
        ],
        quizAnswers: answers
      };
      saveLead(enriched);

      // Build tags and submit lead
      const tags = buildTags(enriched.problem, enriched.recommendedFormation);
      submitLead(enriched, tags).catch(() => {});

      navigate('#/results');
    });
  };

  // Kickstart rendering
  render();
}
