import { CALL_PRODUCT } from '../data/products.js';
import { bookCall } from '../utils/checkout.js';
import { navigate } from '../router.js';

export function renderBlueprintPage(container) {
  container.innerHTML = `
    <div class="container animate-fade-in mt-5 mb-6">

      <!-- Hero Header -->
      <div class="text-center mb-6">
        <div class="tag tag-accent mb-3">Premium Coaching Support</div>
        <h1 class="font-heading fw-800">Tactical Blueprint Call</h1>
        <p class="text-secondary mx-auto" style="max-width: 600px; font-size: var(--text-md); line-height: 1.6;">
          The Soccer Formation Finder gives you a strong starting point. A Tactical Blueprint Call helps you turn that recommendation into a customized plan for your actual squad.
        </p>
      </div>

      <!-- Value Grid -->
      <div class="grid-3 mb-6">
        ${[
          ['👥', 'Choose Player Roles',       'We map your actual players to the roles your formation requires — double pivots, wide runners, target forwards, or holding midfielders.'],
          ['🎯', 'Build Your Game Model',      'Create clear principles for all four phases: in possession, out of possession, winning the ball, and losing it — in language your players understand.'],
          ['🏋️', 'Structure Your Training',   'Stop running random drills. We design a weekly session structure where every practice connects directly to how you want to play on match day.'],
          ['🔍', 'Fix Match-Day Problems',     'Getting counterattacked? Striker isolated? We analyze your specific breakdowns and give you targeted tactical adjustments to solve them.'],
          ['📢', 'Tactical Communication',     'Learn how to explain complex ideas in simple coaching terms — tactics boards, half-time notes, and player handouts that amateur players actually absorb.'],
          ['⚙️', 'Adapted to Your Reality',   'Whether you train once a week on a half-pitch or twice a week with good resources, we tailor the complexity to your coaching environment.'],
        ].map(([icon, title, desc]) => `
          <div class="card flex-col" style="justify-content: flex-start;">
            <div style="font-size: 28px; margin-bottom: var(--space-2)">${icon}</div>
            <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-base)">${title}</h3>
            <p class="text-muted" style="font-size: var(--text-xs); line-height: 1.5;">${desc}</p>
          </div>
        `).join('')}
      </div>

      <!-- Pricing CTA -->
      <div class="card card-highlight text-center" style="max-width: 620px; margin: 0 auto; padding: var(--space-5);">
        <div class="tag tag-accent mb-3" style="font-size: 11px;">60-MINUTE VIDEO CALL</div>
        <h2 class="font-heading mb-2">Book a Tactical Blueprint Call</h2>
        <p class="text-secondary mb-4" style="font-size: var(--text-sm); line-height: 1.6;">
          Speak directly with Paul Mountford — UEFA licensed coach. We will look at your squad profile, your formation recommendation, and map out a practical coaching plan for your team.
        </p>
        <div class="mb-4" style="background-color: var(--color-surface-light); border: 1px solid var(--color-accent); padding: var(--space-4); border-radius: var(--radius-md); display: inline-block; min-width: 220px;">
          <div class="fw-800 text-accent" style="font-size: 2.4rem; font-family: var(--font-heading); line-height: 1;">${CALL_PRODUCT.price}</div>
          <div class="text-muted" style="font-size: var(--text-xs); margin-top: 4px;">one-time · 60-minute video call · fully personalized</div>
        </div>
        <div style="display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap; margin-top: var(--space-4);">
          <button id="blueprint-book-btn" class="btn btn-primary btn-large">${CALL_PRODUCT.ctaLabel}</button>
          <a href="#/library" class="btn btn-secondary btn-large">Browse Formation Library</a>
        </div>
        <p class="text-muted mt-3" style="font-size: var(--text-xs);">
          Questions before booking? <a href="#/contact" style="color: var(--color-accent);">Send us a message</a>.
        </p>
      </div>

    </div>
  `;

  container.querySelector('#blueprint-book-btn').addEventListener('click', () => {
    bookCall('blueprint_page');
  });
}
