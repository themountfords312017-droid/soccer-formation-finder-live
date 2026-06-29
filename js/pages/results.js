import { navigate } from '../router.js';
import { getResults, clearAll, getLead } from '../utils/storage.js';
import { renderFormationDiagram } from '../components/formationDiagram.js';
import { downloadReport } from '../utils/pdf.js';
import { getGuideProduct, CALL_PRODUCT, SUPPORT_EMAIL } from '../data/products.js';
import { initiateCheckout, bookCall } from '../utils/checkout.js';
import { trackViewResult, trackClickCallCta } from '../utils/analytics.js';

export function renderResultsPage(container) {
  const report = getResults();
  const lead = getLead();

  if (!report) {
    container.innerHTML = `
      <div class="container text-center mt-6 mb-6">
        <div class="card" style="max-width:500px;margin:0 auto;padding:var(--space-5);">
          <span style="font-size:32px;">⚠️</span>
          <h2 class="font-heading mt-3">No Blueprint Found</h2>
          <p class="text-secondary mb-4">Please complete the tactical questionnaire first to view your blueprint.</p>
          <a href="#/quiz" class="btn btn-primary">Start the Formation Finder</a>
        </div>
      </div>
    `;
    return;
  }

  const rec = report.recommended;
  const alt = report.alternative;
  const av  = report.avoid;
  const gm  = report.gameModel;

  const product = getGuideProduct(rec.formation.id);

  // Fire analytics
  trackViewResult(rec.formation.id, rec.score);

  // ------------------------------------------------------------------
  // Upgrade Tab content (formation-specific)
  // ------------------------------------------------------------------
  const upgradeTabHtml = product ? `
    <div style="max-width:680px;margin:0 auto;">

      <!-- Primary upsell card -->
      <div style="border:2px solid var(--color-accent);border-radius:var(--radius-lg);background:var(--color-surface);position:relative;overflow:hidden;margin-bottom:var(--space-4);">
        <div style="height:4px;background:linear-gradient(90deg,var(--color-accent),hsl(152,70%,60%));"></div>
        <div style="padding:var(--space-5);">
          <span class="tag tag-accent mb-2" style="font-size:11px;letter-spacing:0.06em;">FORMATION GUIDE — PDF DOWNLOAD</span>
          <h2 class="font-heading mb-2" style="font-size:var(--text-xl);">Unlock the Complete ${rec.formation.name} Implementation Guide</h2>
          <p class="text-secondary mb-4" style="font-size:var(--text-sm);line-height:1.6;">
            Your free blueprint shows what suits your team. The full guide shows you how to actually coach it.
          </p>

          <!-- Free vs Full -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-4);">
            <div style="background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-3);">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-muted);margin-bottom:var(--space-2);">Free Blueprint</div>
              ${['Best-fit formation','Attack shape','Defensive shape','Top priorities'].map(i=>`
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;font-size:var(--text-xs);color:var(--color-text-secondary);">
                  <span style="color:var(--color-accent);font-weight:700;">✓</span> ${i}
                </div>
              `).join('')}
            </div>
            <div style="background:var(--color-accent-glow);border:1px solid var(--color-accent);border-radius:var(--radius-md);padding:var(--space-3);">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-accent);margin-bottom:var(--space-2);">Full Guide ✦</div>
              ${['Full implementation plan','Coaching breakdown','Player roles','Training routine','Match-day checklist','Printable PDF'].map(i=>`
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;font-size:var(--text-xs);color:var(--color-text-secondary);">
                  <span style="color:var(--color-accent);font-weight:700;">✓</span> ${i}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Feature list -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);margin-bottom:var(--space-4);">
            ${['Full formation breakdown','Attacking shape coaching','Defensive shape coaching','Transition rules','Key player roles','Training session plan','Match-day checklist','Common problems &amp; fixes'].map(item=>`
              <div style="display:flex;align-items:center;gap:8px;font-size:var(--text-xs);color:var(--color-text-secondary);">
                <span style="color:var(--color-accent);font-weight:700;flex-shrink:0;">✓</span> ${item}
              </div>
            `).join('')}
          </div>

          <!-- Price + CTA -->
          <div style="display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap;margin-bottom:var(--space-3);">
            <span style="font-size:2.4rem;font-weight:800;font-family:var(--font-heading);color:var(--color-accent);">$9.99</span>
            <span class="text-muted" style="font-size:var(--text-xs);">one-time · instant PDF download</span>
          </div>
          <button id="upgrade-pdf-btn" class="btn btn-primary btn-large btn-block" style="font-size:var(--text-base);padding:var(--space-3) var(--space-5);">
            Download the ${rec.formation.name} Guide — $9.99
          </button>
          <p class="text-muted text-center" style="font-size:11px;margin-top:var(--space-2);">
            Instant PDF download. One-time payment. Questions? <a href="mailto:${SUPPORT_EMAIL}" style="color:var(--color-accent);">Contact support</a>
          </p>
        </div>
      </div>

      <!-- Secondary call CTA -->
      <div class="card" style="padding:var(--space-4);border-left:3px solid var(--color-border);">
        <h3 class="font-heading mb-1" style="font-size:var(--text-base);">${CALL_PRODUCT.headline}</h3>
        <p class="text-secondary mb-3" style="font-size:var(--text-sm);line-height:1.5;">${CALL_PRODUCT.body}</p>
        <ul style="list-style:none;padding:0;margin:0 0 var(--space-3);display:flex;flex-direction:column;gap:6px;">
          ${['Your squad profile','Your current formation','Your attacking &amp; defensive shape','Your biggest tactical problem','Your training routine','Your next steps']
            .map(item => `<li style="font-size:var(--text-xs);color:var(--color-text-secondary);display:flex;align-items:center;gap:8px;"><span style="color:var(--color-accent);">→</span> ${item}</li>`).join('')}
        </ul>
        <button id="book-call-tab-btn" class="btn btn-outline" style="font-size:var(--text-sm);">${CALL_PRODUCT.ctaLabel}</button>
        <p class="text-muted" style="font-size:11px;margin-top:var(--space-2);">Premium 1-to-1 support. 60 min session via video call.</p>
      </div>
    </div>
  ` : `
    <div class="card" style="padding:var(--space-4);text-align:center;">
      <p class="text-secondary">Guide not available for this formation yet.</p>
    </div>
  `;

  // ------------------------------------------------------------------
  // Full page HTML
  // ------------------------------------------------------------------
  const html = `
    <div class="container results-container animate-fade-in mt-4 mb-6">

      <!-- Top action bar -->
      <div class="flex-between mb-4" style="gap:var(--space-3);flex-wrap:wrap;">
        <button id="back-to-quiz-btn" class="btn btn-secondary btn-icon" style="padding:6px 14px;font-size:var(--text-xs);">
          ← Retake Finder
        </button>
        <div style="display:flex;gap:var(--space-2);">
          <button id="download-pdf-btn" class="btn btn-outline" style="padding:6px 14px;font-size:var(--text-xs);">Print Blueprint</button>
        </div>
      </div>

      <!-- Header banner -->
      <div class="card mb-5" style="display:flex;justify-content:space-between;align-items:center;gap:var(--space-4);padding:var(--space-4);border-left:4px solid var(--color-accent);flex-wrap:wrap;">
        <div>
          <span class="tag tag-accent mb-2">Your Team Tactical Blueprint</span>
          <h1 class="font-heading mb-1" style="font-size:2.2rem;color:var(--color-accent);">${rec.formation.name}</h1>
          <p class="text-secondary mb-0" style="font-size:var(--text-sm);max-width:500px;line-height:1.5;">
            Your recommended default formation. Attack as <strong>${rec.formation.recommendedAttackingShape}</strong>. Defend in a <strong>${rec.formation.recommendedDefensiveShape}</strong>.
          </p>
          ${lead ? `<p class="text-muted mt-2 mb-0" style="font-size:10px;font-weight:600;">Prepared for Coach ${lead.name} · ${lead.teamLevel}</p>` : ''}
        </div>
        <!-- Score ring -->
        <div class="score-ring-container" style="flex-shrink:0;position:relative;width:100px;height:100px;display:flex;align-items:center;justify-content:center;">
          <svg class="score-ring" width="100" height="100">
            <circle cx="50" cy="50" r="40" style="stroke:var(--color-border);stroke-width:6;fill:none;"></circle>
            <circle cx="50" cy="50" r="40" style="stroke:var(--color-accent);stroke-width:6;fill:none;stroke-dasharray:251.2;stroke-dashoffset:${251.2 * (1 - rec.score / 100)};stroke-linecap:round;transform:rotate(-90deg);transform-origin:50px 50px;"></circle>
          </svg>
          <div style="position:absolute;display:flex;flex-direction:column;align-items:center;">
            <span style="font-size:var(--text-md);font-weight:800;font-family:var(--font-heading);color:var(--color-text);">${rec.score}%</span>
            <span style="font-size:8px;color:var(--color-text-muted);font-weight:600;text-transform:uppercase;">Match</span>
          </div>
        </div>
      </div>

      <!-- ── UPGRADE BLOCK: directly below result header ── -->
      ${product ? `
      <div style="margin-bottom:var(--space-5);border:2px solid var(--color-accent);border-radius:var(--radius-lg);background:var(--color-surface);position:relative;overflow:hidden;">
        <!-- accent top bar -->
        <div style="height:4px;background:linear-gradient(90deg,var(--color-accent),hsl(152,70%,60%));"></div>

        <div style="padding:var(--space-5);">
          <!-- header row -->
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:var(--space-4);flex-wrap:wrap;margin-bottom:var(--space-4);">
            <div style="flex:1;min-width:240px;">
              <span class="tag tag-accent mb-2" style="font-size:11px;letter-spacing:0.06em;">FORMATION GUIDE — PDF DOWNLOAD</span>
              <h2 class="font-heading mb-2" style="font-size:var(--text-xl);line-height:1.2;">Unlock the Complete ${rec.formation.name} Implementation Guide</h2>
              <p class="text-secondary mb-0" style="font-size:var(--text-sm);line-height:1.6;">
                Your free blueprint shows what suits your team. The full guide shows you how to actually coach it.
              </p>
            </div>
            <!-- Price callout -->
            <div style="text-align:center;flex-shrink:0;padding:var(--space-3) var(--space-4);background:var(--color-accent-glow);border:1px solid var(--color-accent);border-radius:var(--radius-md);">
              <div style="font-size:2.4rem;font-weight:800;font-family:var(--font-heading);color:var(--color-accent);line-height:1;">$9.99</div>
              <div style="font-size:10px;color:var(--color-text-muted);margin-top:4px;font-weight:600;">ONE-TIME · INSTANT PDF</div>
            </div>
          </div>

          <!-- Free vs Full comparison -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-4);">
            <!-- Free -->
            <div style="background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-3);">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-muted);margin-bottom:var(--space-2);">Free Blueprint</div>
              ${['Best-fit formation','Attack shape','Defensive shape','Top priorities'].map(i=>`
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;font-size:var(--text-xs);color:var(--color-text-secondary);">
                  <span style="color:var(--color-accent);font-weight:700;">✓</span> ${i}
                </div>
              `).join('')}
            </div>
            <!-- Full Guide -->
            <div style="background:var(--color-accent-glow);border:1px solid var(--color-accent);border-radius:var(--radius-md);padding:var(--space-3);">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-accent);margin-bottom:var(--space-2);">Full Guide ✦</div>
              ${['Full implementation plan','Coaching breakdown','Player roles','Training routine','Match-day checklist','Printable PDF'].map(i=>`
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;font-size:var(--text-xs);color:var(--color-text-secondary);">
                  <span style="color:var(--color-accent);font-weight:700;">✓</span> ${i}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Feature bullets -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);margin-bottom:var(--space-4);">
            ${['Full formation breakdown','Attacking shape coaching','Defensive shape coaching','Transition rules','Key player roles','Training session plan','Match-day checklist','Common problems &amp; fixes'].map(item=>`
              <div style="display:flex;align-items:center;gap:8px;font-size:var(--text-xs);color:var(--color-text-secondary);">
                <span style="color:var(--color-accent);font-weight:700;flex-shrink:0;">✓</span> ${item}
              </div>
            `).join('')}
          </div>

          <!-- CTA -->
          <button id="inline-upgrade-btn" class="btn btn-primary btn-large btn-block" style="font-size:var(--text-base);padding:var(--space-3) var(--space-5);letter-spacing:0.01em;">
            Download the ${rec.formation.name} Guide — $9.99
          </button>
          <p class="text-muted text-center" style="font-size:11px;margin-top:var(--space-2);">
            Instant PDF download. One-time payment. Questions? <a href="mailto:${SUPPORT_EMAIL}" style="color:var(--color-accent);">Contact support</a>
          </p>
        </div>
      </div>
      ` : ''}
      <!-- ── END UPGRADE BLOCK ── -->

      <!-- Tabs -->
      <div class="results-tabs mb-4" style="display:flex;gap:var(--space-1);border-bottom:1px solid var(--color-border);padding-bottom:1px;overflow-x:auto;scrollbar-width:none;">
        ${[
          ['overview','1. Overview'],
          ['default','2. Default Shape'],
          ['attack','3. Attacking Shape'],
          ['defense','4. Defensive Shape'],
          ['transitions','5. Transitions'],
          ['training','6. Training'],
          ['matchday','7. Match-Day'],
          ['upgrade','8. Upgrade ↑'],
        ].map(([id, label], i) => `
          <button class="results-tab-btn${i === 0 ? ' active' : ''}" data-tab="${id}" style="background:none;border:none;padding:var(--space-2) var(--space-3);font-family:var(--font-heading);font-size:var(--text-xs);font-weight:600;color:${i === 0 ? 'var(--color-accent)' : 'var(--color-text-secondary)'};cursor:pointer;border-bottom:2px solid ${i === 0 ? 'var(--color-accent)' : 'transparent'};white-space:nowrap;${id === 'upgrade' ? 'color:var(--color-accent);' : ''}">${label}</button>
        `).join('')}
      </div>

      <!-- TAB 1: OVERVIEW -->
      <div class="results-tab-content active" id="tab-overview">
        <div class="grid-2">
          <div class="flex-col" style="gap:var(--space-4);">
            <div class="card" style="padding:var(--space-4);">
              <h3 class="font-heading text-accent mb-2" style="font-size:var(--text-md);">Your Recommended Formation</h3>
              <p class="text-secondary mb-4" style="font-size:var(--text-sm);line-height:1.5;">
                Based on your answers, the <strong>${rec.formation.name}</strong> is the best starting point for your team right now. This is the starting point — not the final answer. Every team is different, so adapt these principles to your players.
              </p>
              <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:var(--space-2);">
                <li style="font-size:var(--text-sm);color:var(--color-text-secondary);">
                  <strong style="color:var(--color-accent);">✓ Recommended:</strong> ${rec.formation.name} (${rec.score}% match)
                </li>
                <li style="font-size:var(--text-sm);color:var(--color-text-secondary);">
                  <strong style="color:var(--color-warning);">⚡ Alternative:</strong> ${alt.formation.name} (${alt.score}% match)
                </li>
                <li style="font-size:var(--text-sm);color:var(--color-text-secondary);">
                  <strong style="color:var(--color-danger);">⚠ Avoid:</strong> ${av.formation.name} — conflicts with your squad profile
                </li>
              </ul>
            </div>

            <div style="padding:var(--space-3);border:1px solid var(--color-border);border-radius:var(--radius-md);background:var(--color-bg);">
              <p style="font-size:var(--text-xs);color:var(--color-text-muted);line-height:1.5;margin:0;">
                <strong style="color:var(--color-text-secondary);">Coach's Note:</strong> A formation is only the starting point. Player roles matter more than numbers on a tactics board. Adapt these principles to your players.
              </p>
            </div>
          </div>

          <div class="flex-col" style="gap:var(--space-4);">
            <div class="card" style="padding:var(--space-4);">
              <h3 class="font-heading text-accent mb-3" style="font-size:var(--text-md);">Top Formation Matches</h3>
              <div style="display:flex;flex-direction:column;gap:var(--space-3);">
                ${report.top3Rankings.map((rank, idx) => {
                  const best = idx === 0;
                  return `
                    <div style="padding:var(--space-3);border:1px solid ${best ? 'var(--color-accent)' : 'var(--color-border)'};border-radius:var(--radius-md);background:${best ? 'var(--color-accent-glow)' : 'var(--color-surface)'};">
                      <div class="flex-between">
                        <span style="font-weight:700;font-size:var(--text-sm);">${idx + 1}. ${rank.name}</span>
                        <span class="tag${best ? ' tag-accent' : ''}" style="font-size:10px;">${rank.score}% Fit</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Upgrade nudge removed — full upsell now sits above the tabs -->
          </div>
        </div>
      </div>

      <!-- TAB 2: DEFAULT FORMATION -->
      <div class="results-tab-content" id="tab-default">
        <div class="grid-2">
          <div class="flex-col" style="gap:var(--space-4);">
            <div class="card text-center" style="padding:var(--space-4);">
              <h3 class="font-heading mb-3" style="font-size:var(--text-md);">Default Starting Shape</h3>
              <div id="pitch-default-container" style="background-color:hsl(220,40%,10%);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4);display:inline-block;width:100%;"></div>
            </div>
            <div class="coach-note-box">
              <div class="coach-note-icon">📝</div>
              <p class="coach-note-text" style="font-size:var(--text-xs);">
                <strong>Coach's Note:</strong> Use these positions for kickoffs and restarts. Focus on regional coverage and player partnerships rather than rigid static positions.
              </p>
            </div>
          </div>
          <div class="flex-col" style="gap:var(--space-4);">
            <div class="card" style="padding:var(--space-4);">
              <h3 class="font-heading text-accent mb-2" style="font-size:var(--text-md);">Key Positional Roles</h3>
              <p class="text-secondary mb-4" style="font-size:var(--text-sm);line-height:1.5;">
                The ${rec.formation.name} provides clear reference positions for kickoff, goal kicks, and restarts.
              </p>
              <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:var(--space-3);">
                ${Object.values(rec.keyRoles).slice(0, 4).map(role => `
                  <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                    <strong>• ${role.name}:</strong> ${role.description}
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: ATTACKING SHAPE -->
      <div class="results-tab-content" id="tab-attack">
        <div class="grid-2">
          <div class="flex-col" style="gap:var(--space-4);">
            <div class="card text-center" style="padding:var(--space-4);">
              <h3 class="font-heading mb-3" style="font-size:var(--text-md);">Attacking Shape: ${rec.formation.recommendedAttackingShape}</h3>
              <div id="pitch-attack-container" style="background-color:hsl(220,40%,10%);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4);display:inline-block;width:100%;"></div>
            </div>
            <div class="coach-note-box">
              <div class="coach-note-icon">⚽</div>
              <p class="coach-note-text" style="font-size:var(--text-xs);">
                <strong>Coach's Note (The Attacking Five):</strong> Five players contributing attacking threat through width, depth, half-spaces, box presence, and support. This does not mean five flat across the front — it means five connected in the final third.
              </p>
            </div>
          </div>
          <div class="flex-col" style="gap:var(--space-4);">
            <div class="card" style="padding:var(--space-4);">
              <h3 class="font-heading text-accent mb-2" style="font-size:var(--text-md);">In Possession</h3>
              <p class="text-secondary mb-4" style="font-size:var(--text-sm);line-height:1.5;">
                When your team has the ball, your shape evolves from ${rec.formation.name} into a ${rec.formation.recommendedAttackingShape} attacking structure.
              </p>
              <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:var(--space-3);">
                <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                  <strong>• Attacking Mechanics:</strong> ${rec.formation.attackingShapeExplanation}
                </li>
                ${rec.formation.attackingPrinciples.slice(0, 3).map(p => `
                  <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                    <strong>• Rule:</strong> ${p}
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: DEFENSIVE SHAPE -->
      <div class="results-tab-content" id="tab-defense">
        <div class="grid-2">
          <div class="flex-col" style="gap:var(--space-4);">
            <div class="card text-center" style="padding:var(--space-4);">
              <h3 class="font-heading mb-3" style="font-size:var(--text-md);">Defensive Shape: ${rec.formation.recommendedDefensiveShape}</h3>
              <div id="pitch-defense-container" style="background-color:hsl(220,40%,10%);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4);display:inline-block;width:100%;"></div>
            </div>
            <div class="coach-note-box">
              <div class="coach-note-icon">🛡️</div>
              <p class="coach-note-text" style="font-size:var(--text-xs);">
                <strong>Coach's Note (Fallback Block):</strong> A compact 4-4-2 mid-block is a reliable and teachable defensive fallback structure. If your press is broken, recover immediately into your defensive shape — do not chase the ball in panic.
              </p>
            </div>
          </div>
          <div class="flex-col" style="gap:var(--space-4);">
            <div class="card" style="padding:var(--space-4);">
              <h3 class="font-heading text-accent mb-2" style="font-size:var(--text-md);">Out of Possession</h3>
              <p class="text-secondary mb-4" style="font-size:var(--text-sm);line-height:1.5;">
                Without the ball, your team shifts into a compact ${rec.formation.recommendedDefensiveShape} to protect central areas, deny space, and force the opponent wide.
              </p>
              <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:var(--space-3);">
                <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                  <strong>• Defensive Movement:</strong> ${rec.formation.defensiveShapeExplanation}
                </li>
                <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                  <strong>• Fallback Rule:</strong> ${rec.formation.fallbackDefensivePrinciple}
                </li>
                ${rec.formation.defensivePrinciples.slice(0, 2).map(p => `
                  <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                    <strong>• Rule:</strong> ${p}
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 5: TRANSITIONS -->
      <div class="results-tab-content" id="tab-transitions">
        <div class="grid-2">
          <div class="card" style="padding:var(--space-4);">
            <h3 class="font-heading text-accent mb-2" style="font-size:var(--text-md);">Transition Principles</h3>
            <p class="text-secondary mb-4" style="font-size:var(--text-sm);line-height:1.5;">
              Matches are often won and lost in the moments of transition. Clear rules create structure immediately after winning or losing the ball.
            </p>
            <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:var(--space-3);">
              <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                <strong style="color:var(--color-accent);">⚽ When We Win the Ball:</strong> ${rec.formation.transitionPrinciples.attacking}
              </li>
              <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                <strong style="color:var(--color-warning);">🛡️ When We Lose the Ball:</strong> ${rec.formation.transitionPrinciples.defensive}
              </li>
              <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                <strong>• First Action:</strong> ${gm.winBall}
              </li>
              <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                <strong>• Recovery Rule:</strong> ${gm.loseBall}
              </li>
            </ul>
          </div>
          <div class="flex-col" style="gap:var(--space-4);">
            <div class="coach-note-box" style="margin-top:0;">
              <div class="coach-note-icon">⚡</div>
              <p class="coach-note-text" style="font-size:var(--text-xs);">
                <strong>Coach's Note (The 5-Second Rule):</strong> The first 5 seconds after a transition are critical. Press immediately on loss, or find a safe outlet on recovery. Hesitation is the biggest mistake in transition.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 6: TRAINING -->
      <div class="results-tab-content" id="tab-training">
        <div class="grid-2">
          <div class="card" style="padding:var(--space-4);">
            <h3 class="font-heading text-accent mb-2" style="font-size:var(--text-md);">Tactical Training Focus</h3>
            <p class="text-secondary mb-4" style="font-size:var(--text-sm);line-height:1.5;">
              Your weekly sessions should reinforce your formation's key principles. Focus on repetition and clarity over variety.
            </p>
            <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:var(--space-3);">
              ${rec.formation.trainingTopics.slice(0, 3).map((topic, idx) => `
                <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                  <strong>• Session 0${idx + 1}:</strong> ${topic.title} — ${topic.matchLink}
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="flex-col" style="gap:var(--space-4);">
            <div class="coach-note-box" style="margin-top:0;">
              <div class="coach-note-icon">🏋️</div>
              <p class="coach-note-text" style="font-size:var(--text-xs);">
                <strong>Coach's Note:</strong> If your training does not directly connect to your match-day formation, your structure will break down on the weekend. Train what you play.
              </p>
            </div>
            ${product ? `
            <div class="card" style="padding:var(--space-3);border-left:3px solid var(--color-accent);background:var(--color-accent-glow);">
              <p class="font-heading mb-1" style="font-size:var(--text-xs);">Want a full 5-session training routine for the ${rec.formation.name}?</p>
              <p class="text-muted mb-2" style="font-size:11px;">The complete implementation guide includes a structured weekly session plan with setups, coaching points, and progressions.</p>
              <button class="upgrade-secondary-btn btn btn-primary" style="font-size:11px;padding:6px 12px;">Download the ${rec.formation.name} Guide — $9.99</button>
            </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- TAB 7: MATCH-DAY -->
      <div class="results-tab-content" id="tab-matchday">
        <div class="grid-2">
          <div class="card" style="padding:var(--space-4);">
            <h3 class="font-heading text-accent mb-2" style="font-size:var(--text-md);">Match-Day Coaching Checklist</h3>
            <p class="text-secondary mb-4" style="font-size:var(--text-sm);line-height:1.5;">
              Use these checkpoints to diagnose, adjust, and correct your team's shape before, during, and after the game.
            </p>
            <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:var(--space-3);">
              <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                <strong>• Before Kickoff:</strong> ${rec.formation.matchDayChecklist.before[0]}
              </li>
              <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                <strong>• During Play:</strong> ${rec.formation.matchDayChecklist.during[0]}
              </li>
              <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                <strong>• Halftime:</strong> ${rec.formation.matchDayChecklist.halftime[0]}
              </li>
              <li style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">
                <strong>• Post-Match:</strong> ${rec.formation.matchDayChecklist.after[0]}
              </li>
            </ul>
          </div>
          <div class="flex-col" style="gap:var(--space-4);">
            <div class="coach-note-box" style="margin-top:0;">
              <div class="coach-note-icon">📋</div>
              <p class="coach-note-text" style="font-size:var(--text-xs);">
                <strong>Coach's Note:</strong> Limit halftime changes to one tactical fix. Do not overwhelm players with excessive instructions between halves.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 8: UPGRADE -->
      <div class="results-tab-content" id="tab-upgrade">
        ${upgradeTabHtml}
      </div>

    </div>
  `;

  container.innerHTML = html;

  // Render pitch diagrams
  renderFormationDiagram(container.querySelector('#pitch-default-container'),  rec.formation.id, { shapeType: 'default' });
  renderFormationDiagram(container.querySelector('#pitch-attack-container'),   rec.formation.id, { shapeType: 'attack' });
  renderFormationDiagram(container.querySelector('#pitch-defense-container'),  rec.formation.id, { shapeType: 'defense' });

  // Tab switching
  const tabBtns     = container.querySelectorAll('.results-tab-btn');
  const tabContents = container.querySelectorAll('.results-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.style.borderBottomColor = 'transparent';
        b.style.color = b.getAttribute('data-tab') === 'upgrade'
          ? 'var(--color-accent)'
          : 'var(--color-text-secondary)';
      });
      btn.classList.add('active');
      btn.style.borderBottomColor = 'var(--color-accent)';
      btn.style.color = 'var(--color-accent)';
      tabContents.forEach(c => {
        c.classList.toggle('active', c.id === `tab-${tabId}`);
      });
    });
  });

  // Retake button
  container.querySelector('#back-to-quiz-btn').addEventListener('click', () => {
    clearAll();
    navigate('#/quiz');
  });

  // Print button
  container.querySelector('#download-pdf-btn').addEventListener('click', () => downloadReport());

  // All upgrade buttons (main tab + secondary cards)
  const formationId = rec.formation.id;

  const upgradeMain = container.querySelector('#upgrade-pdf-btn');
  if (upgradeMain) {
    upgradeMain.addEventListener('click', () => initiateCheckout(formationId));
  }

  const upgradeInline = container.querySelector('#inline-upgrade-btn');
  if (upgradeInline) {
    upgradeInline.addEventListener('click', () => initiateCheckout(formationId));
  }

  container.querySelectorAll('.upgrade-secondary-btn').forEach(btn => {
    btn.addEventListener('click', () => initiateCheckout(formationId));
  });

  // Call CTA buttons
  const callTabBtn = container.querySelector('#book-call-tab-btn');
  if (callTabBtn) {
    callTabBtn.addEventListener('click', () => {
      trackClickCallCta('results_upgrade_tab');
      bookCall('results_upgrade_tab');
    });
  }
}
