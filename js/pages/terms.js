import { SUPPORT_EMAIL } from '../data/products.js';

export function renderTermsPage(container) {
  container.innerHTML = `
    <div class="container animate-fade-in mt-5 mb-6" style="max-width: 800px;">
      <div class="card" style="padding: var(--space-5); line-height: 1.8;">
        
        <span class="tag tag-accent mb-3">Legal & Trust</span>
        <h1 class="font-heading fw-800 mb-2" style="font-size: var(--text-xl); text-align: left;">Terms of Use</h1>
        <p class="text-muted mb-4" style="font-size: var(--text-xs);">Last Updated: June 2026</p>
        
        <p class="text-secondary mb-4">
          Welcome to Soccer Formation Finder. By using our website and purchasing our digital guides, you agree to the following terms.
        </p>
        
        <div class="divider mb-4"></div>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">1. Educational Coaching Guidance</h3>
        <p class="text-secondary mb-3">
          Soccer Formation Finder is built to provide educational and instructional soccer coaching insights. 
          Our formation recommendations, tactical breakdowns, and training suggestions are based on standard coaching principles and the specific answers you provide in the quiz.
        </p>
        <p class="text-secondary mb-4" style="border-left: 3px solid var(--color-warning); padding-left: var(--space-3); font-style: italic; color: var(--color-text-secondary);">
          <strong>Disclaimer:</strong> Tactical guidance, layouts, and recommendations are not a guarantee of match results or player performance. 
          Coaches remain fully responsible for their own team decisions, player safety, and training session management.
        </p>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">2. Digital Products & Ownership</h3>
        <p class="text-secondary mb-3">
          Our paid implementation guides are digital products delivered instantly in HTML/web format. 
          When you purchase a guide, you are granted a single-coach license to use the content for your own team coaching.
        </p>
        <p class="text-secondary mb-4">
          <strong>Restrictions:</strong> You must not copy, resell, redistribute, sub-license, or claim these implementation guides or their text/handout content as your own. 
          All materials are copyrighted by Soccer Formation Finder.
        </p>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">3. Payments & Guide Access</h3>
        <p class="text-secondary mb-3">
          Payment is required in full before accessing any paid implementation guide. 
          We reserve the right to change our pricing, guide structures, and available formations at any time.
        </p>
        <p class="text-secondary mb-4">
          Misuse of the website, automated scraping, sharing purchase links, or attempting to bypass payment checks may result in your access to the tool or guides being restricted or blocked.
        </p>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">4. Changes to Site Content</h3>
        <p class="text-secondary mb-4">
          We aim to keep our recommendations and guides updated with best coaching practices. 
          We reserve the right to modify, update, or discontinue any portion of the site or guides at our discretion.
        </p>
        
        <div class="divider mb-4"></div>
        
        <div style="background: var(--color-surface); padding: var(--space-3); border-radius: var(--radius-md); border-left: 3px solid var(--color-accent);">
          <p class="text-muted" style="font-size: var(--text-xs); margin-bottom: 0; line-height: 1.5;">
            For questions regarding these terms, please contact support at <a href="mailto:${SUPPORT_EMAIL}" style="color: var(--color-accent);">${SUPPORT_EMAIL}</a>. 
            This content is for educational coaching purposes and does not guarantee specific match results.
          </p>
        </div>
        
      </div>
    </div>
  `;
}
