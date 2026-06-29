import { navigate } from '../router.js';
import { trackStartQuiz, trackEvent } from '../utils/analytics.js';

// ─────────────────────────────────────────────────────────
// Hero Tactics Board: 4-2-3-1 with attack/defend shapes
// Full SVG pitch — polished, intentional, structured
// ─────────────────────────────────────────────────────────
function buildTacticsBoard() {
  // Pitch dimensions (viewBox 300 x 420)
  // Positions are % of W x H, stored as [x%, y%]
  // Formation: 4-2-3-1 (bottom = GK, top = ST)
  const W = 300, H = 420;

  const positions = {
    gk:  { x: 150, y: 390, label: 'GK' },
    rb:  { x: 255, y: 330, label: 'RB' },
    rcb: { x: 195, y: 315, label: 'CB' },
    lcb: { x: 105, y: 315, label: 'CB' },
    lb:  { x: 45,  y: 330, label: 'LB' },
    rdm: { x: 185, y: 245, label: 'DM' },
    ldm: { x: 115, y: 245, label: 'DM' },
    ram: { x: 240, y: 175, label: 'AM' },
    cam: { x: 150, y: 165, label: 'CAM' },
    lam: { x: 60,  y: 175, label: 'AM' },
    st:  { x: 150, y: 100, label: 'ST' },
  };

  // Pitch markings
  const pitch = `
    <!-- Pitch surface -->
    <rect x="10" y="10" width="280" height="400" rx="4" fill="hsl(152,38%,9%)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <!-- Outer boundary -->
    <rect x="20" y="20" width="260" height="380" rx="2" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>

    <!-- Halfway line -->
    <line x1="20" y1="210" x2="280" y2="210" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>

    <!-- Centre circle -->
    <circle cx="150" cy="210" r="36" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
    <circle cx="150" cy="210" r="2"  fill="rgba(255,255,255,0.15)"/>

    <!-- Top penalty area -->
    <rect x="72" y="20" width="156" height="68" rx="1" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
    <!-- Top goal area -->
    <rect x="108" y="20" width="84" height="30" rx="1" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <!-- Top goal -->
    <rect x="120" y="16" width="60" height="8" rx="1" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>

    <!-- Bottom penalty area -->
    <rect x="72" y="312" width="156" height="68" rx="1" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
    <!-- Bottom goal area -->
    <rect x="108" y="350" width="84" height="30" rx="1" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <!-- Bottom goal -->
    <rect x="120" y="376" width="60" height="8" rx="1" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  `;

  // Connection lines between players (simplified shape lines)
  const lines = [
    // Back 4
    [positions.lb, positions.lcb], [positions.lcb, positions.rcb], [positions.rcb, positions.rb],
    // GK to CBs
    [positions.gk, positions.lcb], [positions.gk, positions.rcb],
    // DM double pivot
    [positions.ldm, positions.rdm],
    // CBs to DMs
    [positions.lcb, positions.ldm], [positions.rcb, positions.rdm],
    // DMs to AMs
    [positions.ldm, positions.lam], [positions.rdm, positions.ram],
    [positions.ldm, positions.cam], [positions.rdm, positions.cam],
    // AMs to ST
    [positions.lam, positions.st], [positions.cam, positions.st], [positions.ram, positions.st],
  ].map(([a, b]) =>
    `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="rgba(74,222,128,0.15)" stroke-width="1" stroke-dasharray="3,3"/>`
  ).join('');

  // Player dots + labels
  const dots = Object.values(positions).map(p => `
    <g>
      <circle cx="${p.x}" cy="${p.y}" r="10" fill="hsl(152,60%,14%)" stroke="hsl(152,70%,48%)" stroke-width="1.5"/>
      <text x="${p.x}" y="${p.y + 1}" text-anchor="middle" dominant-baseline="middle"
        font-family="'Outfit',sans-serif" font-size="${p.label.length > 2 ? '5.5' : '6.5'}"
        font-weight="700" fill="hsl(152,70%,68%)">${p.label}</text>
    </g>
  `).join('');

  return `
    <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
      ${pitch}
      ${lines}
      ${dots}
    </svg>
  `;
}

export function renderHomePage(container) {
  trackEvent('homepage_viewed');
  const html = `
    <!-- 1. HERO SECTION -->
    <section class="home-hero" style="padding-top: var(--space-6); padding-bottom: var(--space-5); text-align: center;">
      <div class="container home-hero-content animate-slide-up" style="max-width: 960px;">
        <span class="tag tag-accent mb-3" style="font-size: 11px; letter-spacing: 0.06em;">FREE FORMATION TOOL</span>
        <h1 class="font-heading fw-800 mb-3" style="font-size: clamp(2rem, 5vw, 3rem); line-height: 1.15;">
          Find the Best Soccer Formation for Your Team
        </h1>
        <p class="text-secondary mb-5 mx-auto" style="max-width: 620px; font-size: var(--text-md); line-height: 1.7;">
          Answer a few questions about your squad, coaching level, and match-day problems. Get a tactical blueprint showing your recommended formation, attacking shape, defensive shape, transitions, and training focus.
        </p>
        <div class="mb-3">
          <button id="start-finder-btn" class="btn btn-primary btn-large" style="font-size: var(--text-base); padding: var(--space-3) var(--space-6); min-width: 260px;">
            Start the Formation Finder
          </button>
        </div>
        <p class="text-muted" style="font-size: var(--text-xs);">
          Built for grassroots, high school, college club, and adult amateur soccer coaches. Free to use.
        </p>

        <!-- ── TACTICS BOARD VISUAL ── -->
        <div style="max-width: 860px; margin: var(--space-5) auto 0; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface); padding: var(--space-4); box-shadow: var(--shadow-lg);">

          <!-- Shape legend row -->
          <div style="display: flex; gap: var(--space-3); justify-content: center; margin-bottom: var(--space-3); flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: hsl(152,70%,48%); border: 1.5px solid hsl(152,70%,68%); display: inline-block;"></span>
              <span style="font-size: 11px; font-weight: 700; font-family: var(--font-heading); color: var(--color-text-secondary); letter-spacing: 0.04em;">DEFAULT</span>
              <span style="font-size: 11px; font-weight: 800; font-family: var(--font-heading); color: var(--color-accent);">4-2-3-1</span>
            </div>
            <span style="color: var(--color-border); font-size: 14px;">|</span>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 11px; font-weight: 700; font-family: var(--font-heading); color: var(--color-text-secondary);">ATTACK</span>
              <span style="font-size: 11px; font-weight: 800; font-family: var(--font-heading); color: hsl(45,90%,58%);">3-2-5</span>
            </div>
            <span style="color: var(--color-border); font-size: 14px;">|</span>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 11px; font-weight: 700; font-family: var(--font-heading); color: var(--color-text-secondary);">DEFEND</span>
              <span style="font-size: 11px; font-weight: 800; font-family: var(--font-heading); color: hsl(200,70%,58%);">4-4-2</span>
            </div>
          </div>

          <!-- Pitch + Result card side by side on wider screens -->
          <div style="display: flex; gap: var(--space-4); align-items: stretch; flex-wrap: wrap;">

            <!-- Full pitch diagram -->
            <div style="flex: 1; min-width: 180px; max-width: 220px; margin: 0 auto;">
              ${buildTacticsBoard()}
            </div>

            <!-- Sample result preview card -->
            <div style="flex: 1; min-width: 220px; display: flex; flex-direction: column; gap: var(--space-3); justify-content: center;">

              <!-- Card header -->
              <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--color-text-muted); padding-bottom: var(--space-2); border-bottom: 1px solid var(--color-border);">Sample Team Tactical Blueprint</div>

              <!-- Recommended formation -->
              <div style="display: flex; align-items: center; justify-content: space-between; background: var(--color-surface-light); border: 1px solid var(--color-accent); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3);">
                <span style="font-size: 11px; font-weight: 600; color: var(--color-text-secondary);">Recommended</span>
                <span style="font-size: 1.4rem; font-weight: 800; font-family: var(--font-heading); color: var(--color-accent);">4-2-3-1</span>
              </div>

              <!-- Attack shape -->
              <div style="display: flex; align-items: center; justify-content: space-between; background: var(--color-surface-light); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3);">
                <span style="font-size: 11px; font-weight: 600; color: hsl(45,90%,58%);">Attack</span>
                <span style="font-size: 1rem; font-weight: 800; font-family: var(--font-heading); color: var(--color-text);">3-2-5</span>
              </div>

              <!-- Defend shape -->
              <div style="display: flex; align-items: center; justify-content: space-between; background: var(--color-surface-light); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3);">
                <span style="font-size: 11px; font-weight: 600; color: hsl(200,70%,58%);">Defend</span>
                <span style="font-size: 0.9rem; font-weight: 800; font-family: var(--font-heading); color: var(--color-text);">4-4-2 Mid-Block</span>
              </div>

              <!-- Top priority -->
              <div style="display: flex; align-items: flex-start; gap: 8px; background: var(--color-surface-light); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3);">
                <span style="font-size: 11px; font-weight: 600; color: var(--color-accent); flex-shrink: 0;">Top Priority</span>
                <span style="font-size: 11px; color: var(--color-text-secondary); line-height: 1.4;">Protect central areas</span>
              </div>

              <p style="font-size: 10px; color: var(--color-text-muted); text-align: center; margin: 0; font-style: italic;">
                Sample result — your blueprint is based on your answers.
              </p>
            </div>

          </div>
        </div>
        <!-- ── END TACTICS BOARD ── -->

      </div>
    </section>

    <!-- 2. TRUST BAR -->
    <div style="background-color:var(--color-primary);border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border);padding:var(--space-3) 0;">
      <div class="container" style="max-width:900px;">
        <div style="display:flex;justify-content:space-around;align-items:center;flex-wrap:wrap;gap:var(--space-3);">
          <div style="font-size:var(--text-xs);color:var(--color-text-secondary);display:flex;align-items:center;gap:8px;font-weight:600;">
            <span style="color:var(--color-accent);">✓</span> Built by a UEFA licensed coach
          </div>
          <div style="font-size:var(--text-xs);color:var(--color-text-secondary);display:flex;align-items:center;gap:8px;font-weight:600;">
            <span style="color:var(--color-accent);">✓</span> For grassroots &amp; amateur coaches
          </div>
          <div style="font-size:var(--text-xs);color:var(--color-text-secondary);display:flex;align-items:center;gap:8px;font-weight:600;">
            <span style="color:var(--color-accent);">✓</span> Based on real tactical principles
          </div>
          <div style="font-size:var(--text-xs);color:var(--color-text-secondary);display:flex;align-items:center;gap:8px;font-weight:600;">
            <span style="color:var(--color-accent);">✓</span> More than a formation quiz
          </div>
        </div>
      </div>
    </div>

    <!-- 3. HOW IT WORKS -->
    <section class="section container" style="padding-top:var(--space-6);padding-bottom:var(--space-6);">
      <div class="text-center mb-5">
        <span class="tag tag-accent mb-2">Process</span>
        <h2 class="font-heading">How It Works</h2>
      </div>
      <div class="grid-3" style="gap:var(--space-4);max-width:900px;margin:0 auto;">
        <div class="card" style="padding:var(--space-4);text-align:center;">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--color-accent-glow);border:1px solid var(--color-accent);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3);font-family:var(--font-heading);font-weight:700;color:var(--color-accent);font-size:var(--text-base);">1</div>
          <h3 class="font-heading mb-2" style="font-size:var(--text-base);">Answer Team Questions</h3>
          <p class="text-secondary" style="font-size:var(--text-sm);line-height:1.5;margin-bottom:0;">Tell us about your squad, coaching level, strengths, weaknesses, and match-day problems.</p>
        </div>
        <div class="card" style="padding:var(--space-4);text-align:center;">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--color-accent-glow);border:1px solid var(--color-accent);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3);font-family:var(--font-heading);font-weight:700;color:var(--color-accent);font-size:var(--text-base);">2</div>
          <h3 class="font-heading mb-2" style="font-size:var(--text-base);">Get Your Formation Recommendation</h3>
          <p class="text-secondary" style="font-size:var(--text-sm);line-height:1.5;margin-bottom:0;">The tool recommends a default formation based on your team profile and tactical needs.</p>
        </div>
        <div class="card" style="padding:var(--space-4);text-align:center;">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--color-accent-glow);border:1px solid var(--color-accent);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3);font-family:var(--font-heading);font-weight:700;color:var(--color-accent);font-size:var(--text-base);">3</div>
          <h3 class="font-heading mb-2" style="font-size:var(--text-base);">Receive Your Team Tactical Blueprint</h3>
          <p class="text-secondary" style="font-size:var(--text-sm);line-height:1.5;margin-bottom:0;">See how your team can attack, defend, transition, train, and prepare for match day.</p>
        </div>
      </div>
    </section>

    <!-- 4. WHAT YOU RECEIVE -->
    <section class="section" style="background-color:var(--color-primary);border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border);padding-top:var(--space-6);padding-bottom:var(--space-6);">
      <div class="container" style="max-width:820px;">
        <div class="text-center mb-5">
          <span class="tag tag-accent mb-2">Free Result</span>
          <h2 class="font-heading">What You Receive</h2>
          <p class="text-secondary mx-auto" style="max-width:560px;font-size:var(--text-sm);line-height:1.6;">Your free Team Tactical Blueprint includes these key areas.</p>
        </div>
        <div class="grid-2" style="gap:var(--space-3);">
          ${[
            ['📋', 'Recommended default formation', 'The ideal starting system that fits your players.'],
            ['⚔️', 'Attacking shape', 'How your structure evolves when you have the ball.'],
            ['🛡️', 'Defensive shape', 'How your block organizes when you are out of possession.'],
            ['🔄', 'Transition principles', 'Clear rules for winning and losing the ball.'],
            ['🏋️', 'Training focus', 'What to work on in your weekly sessions.'],
            ['📝', 'Match-day checklist', 'What to watch before, during, and after the game.'],
          ].map(([icon, title, desc]) => `
            <div class="card" style="padding:var(--space-3) var(--space-4);display:flex;gap:var(--space-3);align-items:flex-start;">
              <span style="font-size:18px;flex-shrink:0;margin-top:1px;">${icon}</span>
              <div>
                <h4 class="font-heading text-accent mb-1" style="font-size:var(--text-sm);">${title}</h4>
                <p class="text-muted" style="font-size:var(--text-xs);line-height:1.4;margin-bottom:0;">${desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 5. BUILT BY A REAL COACH -->
    <section class="section container" style="padding-top:var(--space-6);padding-bottom:var(--space-6);">
      <div style="max-width:860px;margin:0 auto;">
        <div class="card" style="padding:var(--space-5);">
          <div style="display:flex;gap:var(--space-5);align-items:flex-start;flex-wrap:wrap;">
            <!-- Photo col -->
            <div style="flex-shrink:0;width:148px;text-align:center;">
              <div style="width:148px;height:148px;border-radius:50%;border:2px solid var(--color-accent);overflow:hidden;background:var(--color-surface-light);display:flex;align-items:center;justify-content:center;">
                <img src="assets/paul-mountford.jpg" alt="Paul Mountford — UEFA Licensed Coach" style="width:100%;height:100%;object-fit:cover;object-position:center top;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=\\'font-size:2.5rem;\\'>🎓</span>';" />
              </div>
              <p class="text-muted" style="font-size:10px;margin-top:8px;line-height:1.4;">Paul Mountford<br/><span style='color:var(--color-accent);font-weight:600;'>UEFA Licensed Coach</span></p>
            </div>
            <!-- Text col -->
            <div style="flex:1;min-width:240px;">
              <span class="tag tag-accent mb-2">About the Creator</span>
              <h2 class="font-heading mb-2" style="font-size:var(--text-lg);">Built by a Real Coach</h2>
              <p class="text-secondary mb-2" style="font-size:var(--text-sm);line-height:1.65;">Paul Mountford is a UEFA licensed coach and Head of Women's Football at the University of Lancashire, with experience across grassroots, academy, university, and senior football environments.</p>
              <p class="text-secondary mb-2" style="font-size:var(--text-sm);line-height:1.65;">His coaching work focuses on helping teams play with clearer structure, stronger tactical understanding, and more confidence on match day.</p>
              <p class="text-secondary mb-3" style="font-size:var(--text-sm);line-height:1.65;">Soccer Formation Finder was created to give grassroots and amateur coaches a practical way to understand their team setup — from default formation, to attacking shape, defensive structure, transitions, and training focus.</p>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${[
                  'UEFA Licensed Coach',
                  'Head of Women\'s Football — University of Lancashire',
                  'Grassroots &amp; Senior Team Experience',
                  'Multiple Awards &amp; Titles',
                ].map(c => `<span style="display:inline-block;padding:3px 10px;background:var(--color-surface-light);border:1px solid var(--color-border);border-radius:var(--radius-xl);font-size:11px;font-weight:600;color:var(--color-text-secondary);line-height:1.6;">${c}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. FINAL CTA -->
    <section class="section container" style="padding-top:var(--space-5);padding-bottom:var(--space-6);text-align:center;">
      <div class="card card-highlight mx-auto" style="max-width:560px;padding:var(--space-5);">
        <h2 class="font-heading mb-2">Ready to Find Your Best Formation?</h2>
        <p class="text-secondary mb-4" style="font-size:var(--text-sm);line-height:1.5;">
          Start the free Formation Finder and receive your personalized Team Tactical Blueprint.
        </p>
        <button id="cta-start-btn" class="btn btn-primary btn-large" style="font-size:var(--text-sm);padding:var(--space-3) var(--space-5);min-width:240px;">
          Start the Formation Finder
        </button>
        <p class="text-muted" style="font-size:11px;margin-top:var(--space-2);">Free to use. No credit card required.</p>
      </div>
    </section>
  `;

  container.innerHTML = html;

  container.querySelector('#start-finder-btn').addEventListener('click', () => {
    trackStartQuiz();
    navigate('#/quiz');
  });
  container.querySelector('#cta-start-btn').addEventListener('click', () => {
    trackStartQuiz();
    navigate('#/quiz');
  });
}
