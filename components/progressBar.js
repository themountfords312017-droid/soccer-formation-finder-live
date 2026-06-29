import { SECTIONS } from '../data/questions.js';

export function renderProgressBar(container, currentSectionIndex, currentQuestionGlobalIndex, totalQuestionsGlobal) {
  const currentSection = SECTIONS[currentSectionIndex];
  
  // Calculate percentage
  const percentage = Math.round((currentQuestionGlobalIndex / totalQuestionsGlobal) * 100);

  const html = `
    <div class="progress-container">
      <div class="progress-info">
        <span class="fw-600 text-accent">
          Section ${currentSectionIndex + 1} of ${SECTIONS.length}: ${currentSection.title}
        </span>
        <span>${percentage}% Complete</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percentage}%"></div>
      </div>
      <div class="progress-dots">
        ${SECTIONS.map((sec, idx) => `
          <div class="progress-dot ${idx === currentSectionIndex ? 'active' : ''}" title="${sec.title}"></div>
        `).join('')}
      </div>
    </div>
  `;
  container.innerHTML = html;
}
