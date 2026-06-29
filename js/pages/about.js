import { navigate } from '../router.js';

export function renderAboutPage(container) {
  const html = `
    <div class="container animate-fade-in mt-5 mb-6">

      <!-- Creator Biography -->
      <section class="section" style="padding-top: 0; padding-bottom: var(--space-6);">
        <div class="creator-grid">
          <div class="creator-image-wrapper animate-scale-in">
            <img src="assets/paul-mountford.jpg" alt="Paul Mountford — UEFA Licensed Coach" class="creator-image" onerror="this.style.display='none';this.parentElement.style.background='var(--color-surface-light)';this.parentElement.innerHTML='<span style=\'font-size:3rem;display:flex;align-items:center;justify-content:center;height:100%;\'>🎓</span>';" />
          </div>
          <div class="animate-slide-up">
            <span class="tag tag-accent mb-2">About the Creator</span>
            <h1 class="font-heading mb-1" style="text-align: left; font-size: 2.5rem; color: var(--color-text);">Built by a Real Coach</h1>
            <h2 class="font-heading text-accent mb-3" style="font-size: var(--text-md); margin-top: 0; text-align: left; font-weight: 600;">
              Paul Mountford
            </h2>
            <p class="text-muted mb-4" style="font-size: var(--text-sm); font-weight: 600; line-height: 1.4;">
              UEFA Licensed Coach &nbsp;|&nbsp; Head of Women's Football at the University of Lancashire
            </p>
            <p class="text-secondary mb-3" style="line-height: 1.7; font-size: var(--text-base);">
              Paul Mountford is a UEFA licensed coach and Head of Women's Football at the University of Lancashire, with experience across grassroots, academy, university, and senior football environments.
            </p>
            <p class="text-secondary mb-3" style="line-height: 1.7; font-size: var(--text-base);">
              His coaching work focuses on helping teams play with clearer structure, stronger tactical understanding, and more confidence on match day.
            </p>
            <p class="text-secondary mb-4" style="line-height: 1.7; font-size: var(--text-base);">
              Soccer Formation Finder was created to give grassroots and amateur coaches a practical way to understand their team setup — from default formation, to attacking shape, defensive structure, transitions, and training focus.
            </p>
            <div class="divider mb-4"></div>
            <p class="text-accent fw-600 mb-0" style="font-size: var(--text-md); font-style: italic; border-left: 3px solid var(--color-accent); padding-left: var(--space-3);">
              "Built for coaches who want professional structure simplified into practical coaching they can actually use."
            </p>
          </div>
        </div>
      </section>

      <!-- Credential Cards -->
      <section class="section" style="border-top: 1px solid var(--color-border); padding-top: var(--space-6); padding-bottom: var(--space-6);">
        <div class="text-center mb-5">
          <span class="tag tag-accent mb-2">Qualifications</span>
          <h2 class="font-heading mb-2">Coaching Background</h2>
          <p class="text-secondary" style="max-width: 600px; margin: 0 auto; font-size: var(--text-sm);">
            Methodology backed by recognized formal qualifications and extensive touchline experience.
          </p>
        </div>
        <div class="grid-4">
          <div class="card card-hover flex-col" style="justify-content: space-between; padding: var(--space-4);">
            <div>
              <div style="font-size: var(--text-xl); margin-bottom: var(--space-2);">🛡️</div>
              <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md); line-height: 1.2;">UEFA Licensed Coach</h3>
              <p class="text-muted" style="font-size: var(--text-sm); line-height: 1.5; margin-bottom: 0;">
                Built on recognized football coaching education and practical coaching methodology.
              </p>
            </div>
          </div>
          <div class="card card-hover flex-col" style="justify-content: space-between; padding: var(--space-4);">
            <div>
              <div style="font-size: var(--text-xl); margin-bottom: var(--space-2);">🏫</div>
              <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md); line-height: 1.2; font-weight: 700;">Head of Women's Football</h3>
              <p class="text-muted mb-2" style="font-size: var(--text-xs); font-style: italic; color: var(--color-accent);">University of Lancashire</p>
              <p class="text-muted" style="font-size: var(--text-sm); line-height: 1.5; margin-bottom: 0;">
                Experience leading a university football program, developing team structures, and preparing teams for competitive match play.
              </p>
            </div>
          </div>
          <div class="card card-hover flex-col" style="justify-content: space-between; padding: var(--space-4);">
            <div>
              <div style="font-size: var(--text-xl); margin-bottom: var(--space-2);">👥</div>
              <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md); line-height: 1.2;">Grassroots &amp; Senior</h3>
              <p class="text-muted mb-2" style="font-size: var(--text-xs); font-style: italic; color: var(--color-accent);">Team Experience</p>
              <p class="text-muted" style="font-size: var(--text-sm); line-height: 1.5; margin-bottom: 0;">
                Practical experience with real players, real match problems, limited training time, and competitive soccer environments.
              </p>
            </div>
          </div>
          <div class="card card-hover flex-col" style="justify-content: space-between; padding: var(--space-4);">
            <div>
              <div style="font-size: var(--text-xl); margin-bottom: var(--space-2);">🎯</div>
              <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md); line-height: 1.2;">Practical Tactical Coaching</h3>
              <p class="text-muted mb-2" style="font-size: var(--text-xs); font-style: italic; color: var(--color-accent);">Simple, Teachable Principles</p>
              <p class="text-muted" style="font-size: var(--text-sm); line-height: 1.5; margin-bottom: 0;">
                Focusing on clear team structures, attacking shapes, compact defending, and transitions that amateur players can absorb.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Block -->
      <section class="section container" style="border-top: 1px solid var(--color-border); padding-top: var(--space-6); text-align: center;">
        <div class="card card-highlight mx-auto" style="max-width: 560px; padding: var(--space-5);">
          <h3 class="font-heading mb-3">Ready to Find Your Best Formation?</h3>
          <p class="text-secondary mb-4" style="font-size: var(--text-sm); line-height: 1.5;">
            Start the free Formation Finder and receive your personalized Team Tactical Blueprint.
          </p>
          <button id="about-start-btn" class="btn btn-primary btn-large">Start the Formation Finder</button>
        </div>
      </section>

    </div>
  `;

  container.innerHTML = html;
  container.querySelector('#about-start-btn').addEventListener('click', () => navigate('#/quiz'));
}
