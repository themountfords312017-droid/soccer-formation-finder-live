import { updateActiveLinks } from '../router.js';

export function renderHeader(container) {
  const headerHtml = `
    <nav class="nav container" style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-3); padding-bottom: var(--space-3); height: 70px;">

      <!-- Logo / Brand -->
      <a href="#/" class="nav-brand" style="text-decoration: none; display: flex; align-items: center; flex-shrink: 0;">
        <img src="assets/favicon-32x32.png" alt="Soccer Formation Finder" style="width: 28px; height: 28px; border-radius: var(--radius-sm); margin-right: 8px; border: 1px solid var(--color-border);" />
        <span class="nav-brand-text" style="font-weight: 800; color: var(--color-text); white-space: nowrap;">Soccer Formation Finder</span>
      </a>

      <!-- Desktop nav links -->
      <ul class="nav-links" style="margin: 0; padding: 0;">
        <li><a href="#/library" class="nav-link" style="font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Formation Library</a></li>
        <li><a href="#/about"   class="nav-link" style="font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">About</a></li>
        <li><a href="#/contact" class="nav-link" style="font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Contact</a></li>
      </ul>

      <!-- Primary CTA -->
      <div class="nav-cta-wrapper" style="flex-shrink: 0; margin-left: var(--space-4);">
        <a href="#/quiz" class="btn btn-primary" style="padding: 8px 18px; font-size: var(--text-xs); font-weight: 700; color: var(--color-bg);">Start Finder</a>
      </div>

      <!-- Hamburger (mobile) -->
      <button class="nav-hamburger" aria-label="Toggle navigation menu">
        <span></span><span></span><span></span>
      </button>

      <!-- Mobile drawer -->
      <div class="nav-mobile">
        <a href="#/"        class="nav-link">Home</a>
        <a href="#/library" class="nav-link">Formation Library</a>
        <a href="#/about"   class="nav-link">About</a>
        <a href="#/contact" class="nav-link">Contact</a>
        <a href="#/quiz"    class="btn btn-primary btn-block" style="text-align: center; color: var(--color-bg); margin-top: var(--space-2);">Start Finder</a>
      </div>
    </nav>
  `;
  container.innerHTML = headerHtml;

  const hamburger = container.querySelector('.nav-hamburger');
  const mobileMenu = container.querySelector('.nav-mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    mobileMenu.querySelectorAll('.nav-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  updateActiveLinks(window.location.hash || '#/');
}
