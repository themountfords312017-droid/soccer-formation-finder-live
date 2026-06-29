import { SUPPORT_EMAIL } from '../data/products.js';

export function renderFooter(container) {
  const footerHtml = `
    <div class="container" style="padding-top: var(--space-5); padding-bottom: var(--space-4);">
      <div class="divider mb-4"></div>
      
      <!-- Footer Main Columns -->
      <div class="footer-grid" style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-4);">

        <!-- Brand & Disclaimer -->
        <div class="footer-brand">
          <h4 class="mb-2">Soccer Formation Finder</h4>
          <p class="text-secondary mb-3" style="font-size: var(--text-sm); max-width: 400px; line-height: 1.5;">
            A tactical tool built by a UEFA licensed coach to help grassroots, youth, and amateur soccer coaches find their best setup.
          </p>
          <p class="text-muted" style="font-size: var(--text-xs); line-height: 1.4; max-width: 400px;">
            <em>Disclaimer: This content is for educational coaching purposes and does not guarantee specific match results.</em>
          </p>
        </div>

        <!-- Navigation Links -->
        <div>
          <h4 class="mb-2" style="font-size: var(--text-sm);">Main Pages</h4>
          <ul class="footer-links" style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--text-xs);">
            <li><a href="#/"        style="color: var(--color-text-secondary);">Homepage</a></li>
            <li><a href="#/quiz"    style="color: var(--color-text-secondary);">Quiz / Formation Finder</a></li>
            <li><a href="#/library" style="color: var(--color-text-secondary);">Formation Library</a></li>
            <li><a href="#/results" style="color: var(--color-text-secondary);">Results Page</a></li>
            <li><a href="#/success" style="color: var(--color-text-secondary);">Success / Download Page</a></li>
          </ul>
        </div>

        <!-- Support Info -->
        <div>
          <h4 class="mb-2" style="font-size: var(--text-sm);">Support</h4>
          <ul class="footer-links" style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--text-xs);">
            <li><a href="#/contact"             style="color: var(--color-text-secondary);">Contact Support</a></li>
            <li><a href="#/blueprint"           style="color: var(--color-text-secondary);">Tactical Blueprint Call</a></li>
            <li><a href="mailto:${SUPPORT_EMAIL}" style="color: var(--color-text-secondary);">${SUPPORT_EMAIL}</a></li>
          </ul>
        </div>

      </div>

      <!-- Legal Pipe Separated Links Row -->
      <div class="divider mb-3" style="margin: var(--space-3) 0;"></div>
      <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: var(--space-3); font-size: var(--text-xs); margin-bottom: var(--space-3);">
        <a href="#/privacy-policy" style="color: var(--color-text-secondary);">Privacy Policy</a>
        <span style="color: var(--color-text-muted);">|</span>
        <a href="#/terms-of-use" style="color: var(--color-text-secondary);">Terms of Use</a>
        <span style="color: var(--color-text-muted);">|</span>
        <a href="#/refund-policy" style="color: var(--color-text-secondary);">Refund Policy</a>
        <span style="color: var(--color-text-muted);">|</span>
        <a href="#/contact" style="color: var(--color-text-secondary);">Contact</a>
        <span style="color: var(--color-text-muted);">|</span>
        <a href="#/about" style="color: var(--color-text-secondary);">About</a>
      </div>

      <!-- Copyright Section -->
      <div style="text-align: center;">
        <p class="text-muted" style="font-size: var(--text-xs); margin-bottom: 0;">
          © 2026 Soccer Formation Finder. All rights reserved.
        </p>
      </div>
    </div>
  `;
  container.innerHTML = footerHtml;
}
