import { FORMATIONS, getFormation } from '../data/formations.js';
import { renderFormationDiagram } from '../components/formationDiagram.js';
import { navigate } from '../router.js';
import { getGuideProduct } from '../data/products.js';
import { initiateCheckout } from '../utils/checkout.js';

export function renderLibraryPage(container, params) {
  const formationId = params ? params.id : null;

  if (formationId) {
    renderDetailView(formationId);
  } else {
    renderGridView();
  }

  // ----------------------------------------------------------------
  // GRID VIEW — all formations
  // ----------------------------------------------------------------
  function renderGridView() {
    const html = `
      <div class="container animate-fade-in mt-5 mb-6">
        <div class="text-center mb-5">
          <h1 class="font-heading fw-800">Soccer Formations Explained</h1>
          <p class="text-secondary" style="max-width: 640px; margin: var(--space-2) auto 0; font-size: var(--text-sm); line-height: 1.6;">
            Explore the main soccer formations, understand when to use them, and unlock the full implementation guide for the system that fits your team.
          </p>
        </div>
        <div class="formation-grid">
          ${FORMATIONS.map(f => `
            <div class="card card-hover formation-card" style="cursor: pointer;" data-id="${f.id}">
              <div class="formation-card-preview" id="preview-pitch-${f.id}"></div>
              <div class="card-body" style="padding-top: 0;">
                <div>
                  <div class="flex-between mb-2">
                    <h3 class="font-heading text-accent" style="margin-bottom: 0;">${f.name}</h3>
                    <span class="tag tag-accent">${f.category.replace(/-/g, ' ')}</span>
                  </div>
                  <p class="text-secondary mb-4" style="font-size: var(--text-xs); line-height: 1.4;">${f.shortDesc}</p>
                </div>
                <div class="text-right">
                  <span class="fw-600 text-accent" style="font-size: var(--text-xs);">View Free Profile →</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.innerHTML = html;

    // Render preview pitch diagrams
    FORMATIONS.forEach(f => {
      renderFormationDiagram(container.querySelector(`#preview-pitch-${f.id}`), f.id, { compact: true, showLabels: false });
    });

    // Click → detail view
    container.querySelectorAll('.formation-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        navigate(`#/library/${id}`);
      });
    });
  }

  // ----------------------------------------------------------------
  // DETAIL VIEW — single formation profile
  // ----------------------------------------------------------------
  function renderDetailView(id) {
    const f = getFormation(id);
    if (!f) {
      container.innerHTML = `
        <div class="container text-center mt-6">
          <div class="card max-width-600 mx-auto">
            <h2 class="font-heading">Formation Not Found</h2>
            <p class="text-secondary mb-4">The formation profile you requested does not exist.</p>
            <a href="#/library" class="btn btn-primary">Back to Library</a>
          </div>
        </div>
      `;
      return;
    }

    const product = getGuideProduct(f.id);

    const html = `
      <div class="container animate-fade-in mt-5 mb-6">
        <a href="#/library" class="library-back-link">← Back to Formations</a>

        <!-- Header -->
        <div class="library-detail-header mt-3">
          <div>
            <span class="tag tag-accent mb-2">${f.category.replace(/-/g, ' ')}</span>
            <h1 class="font-heading fw-800 text-accent mb-2" style="font-size: 3.5rem;">${f.name}</h1>
            <p class="text-secondary mb-4" style="font-size: var(--text-md);">${f.overview}</p>
            <div style="display: flex; gap: var(--space-3);">
              <button id="try-formation-btn" class="btn btn-primary">Test This Formation</button>
            </div>
          </div>
          <div class="library-detail-pitch" id="detail-pitch-container"></div>
        </div>

        <div class="divider"></div>

        <!-- Strengths / Weaknesses -->
        <div class="library-split-grid">
          <div class="card">
            <h3 class="font-heading text-accent mb-3">Key Strengths</h3>
            <ul class="bullet-list strengths-list">
              ${f.strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
          <div class="card">
            <h3 class="font-heading text-warning mb-3">Possible Weaknesses</h3>
            <ul class="bullet-list weaknesses-list">
              ${f.weaknesses.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Positional Roles -->
        <div class="result-section">
          <h3 class="result-section-title text-accent">Positional Roles Breakdown</h3>
          <div class="role-grid">
            ${Object.values(f.keyRoles).map((role, idx) => {
              const emojis = ['🧤','🛡️','🏃','⚙️','🎩','⚡','⚽'];
              return `
                <div class="role-card">
                  <div class="role-icon">${emojis[idx % emojis.length]}</div>
                  <div>
                    <h4 class="font-heading text-accent" style="font-size: var(--text-base); margin-bottom: 2px;">${role.name}</h4>
                    <p class="text-muted" style="font-size: var(--text-xs); line-height: 1.4;">${role.description}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- When to Use / When to Avoid + Problems -->
        <div class="library-split-grid mt-5">
          <div class="card">
            <h3 class="font-heading mb-3">When To Use It</h3>
            <p class="text-secondary mb-4" style="font-size: var(--text-sm);">${f.bestFor}</p>
            <h3 class="font-heading mb-3">When To Avoid It</h3>
            <p class="text-secondary" style="font-size: var(--text-sm);">${f.avoidIf}</p>
          </div>
          <div class="card">
            <h3 class="font-heading text-danger mb-3">Common Problems &amp; Fixes</h3>
            <p class="text-secondary mb-3" style="font-size: var(--text-sm);">Watch for these structural breakdowns and apply the recommended coaching adjustments:</p>
            <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: var(--space-3);">
              ${f.commonProblems.map((prob, idx) => `
                <li style="font-size: var(--text-sm); line-height: 1.4;">
                  <strong class="text-danger" style="display: block; margin-bottom: 2px;">⚠️ Problem: ${prob}</strong>
                  <strong class="text-accent" style="display: block;">🛠️ Fix: ${f.fixes[idx] || ''}</strong>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Training Syllabus -->
        <div class="card mt-5">
          <h3 class="font-heading text-accent mb-3">Tactical Training Syllabus</h3>
          <p class="text-secondary mb-4" style="font-size: var(--text-sm);">To properly prepare your squad for this formation, focus your weekly sessions on these three key tactical topics:</p>
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            ${f.trainingTopics.map((topic, idx) => `
              <div class="card" style="border-left: 4px solid var(--color-accent); background-color: var(--color-surface-light);">
                <div style="display: flex; gap: var(--space-4); align-items: flex-start;">
                  <div class="training-number">0${idx + 1}</div>
                  <div style="flex-grow: 1;">
                    <h4 class="font-heading text-accent mb-2" style="font-size: var(--text-md); margin-top: 0;">${topic.title}</h4>
                    <div style="margin-bottom: var(--space-2); font-size: var(--text-xs);">
                      <strong>Drill Setup &amp; Structure:</strong>
                      <span class="text-secondary" style="margin-top: var(--space-1);">${topic.setup}</span>
                    </div>
                    <div style="margin-bottom: var(--space-2); font-size: var(--text-xs);">
                      <strong>Key Coaching Points:</strong>
                      <span class="text-secondary" style="margin-top: var(--space-1);">${topic.coachingPoints}</span>
                    </div>
                    <div class="tag tag-accent mt-2" style="font-size: 10px;">
                      🔗 Match Day Impact: ${topic.matchLink}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Paid Upgrade Section -->
        ${product ? `
        <div class="card mt-5" style="border: 2px solid var(--color-accent); padding: var(--space-5); position: relative; overflow: hidden;">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:var(--color-accent);"></div>
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:var(--space-4);flex-wrap:wrap;">
            <div style="flex:1;min-width:240px;">
              <span class="tag tag-accent mb-2" style="font-size:11px;">IMPLEMENTATION GUIDE — $9.99</span>
              <h3 class="font-heading mb-2" style="font-size:var(--text-lg);">Unlock the Complete ${f.name} Implementation Guide</h3>
              <p class="text-secondary mb-3" style="font-size:var(--text-sm);line-height:1.6;">
                This free profile gives you the overview. The full guide gives you everything you need to actually coach the ${f.name} — roles, sessions, attacking and defensive structure, match-day checklist, and a printable player handout.
              </p>
              <ul style="list-style:none;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:var(--space-3);">
                ${['Full formation breakdown','Attacking shape coaching','Defensive shape coaching','Transition rules','Key player roles','5-session training plan','Match-day checklist','Printable player handout']
                  .map(item => `<li style="font-size:var(--text-xs);color:var(--color-text-secondary);display:flex;align-items:center;gap:6px;"><span style="color:var(--color-accent);font-weight:700;">✓</span> ${item}</li>`).join('')}
              </ul>
            </div>
            <div style="text-align:center;flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:var(--space-2);padding-top:var(--space-2);">
              <span style="font-size:2.2rem;font-weight:800;font-family:var(--font-heading);color:var(--color-accent);">$9.99</span>
              <span class="text-muted" style="font-size:11px;">one-time · instant PDF download</span>
              <button id="library-upgrade-btn" class="btn btn-primary" style="min-width:200px;font-size:var(--text-sm);margin-top:4px;">
                Download the ${f.name} Guide — $9.99
              </button>
            </div>
          </div>
        </div>
        ` : ''}

      </div>
    `;
    container.innerHTML = html;

    // Render pitch diagram
    renderFormationDiagram(container.querySelector('#detail-pitch-container'), f.id);

    // Try formation → quiz
    container.querySelector('#try-formation-btn').addEventListener('click', () => navigate('#/quiz'));

    // Upgrade → checkout
    const upgradeBtn = container.querySelector('#library-upgrade-btn');
    if (upgradeBtn) {
      upgradeBtn.addEventListener('click', () => initiateCheckout(f.id));
    }
  }
}
