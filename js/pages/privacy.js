import { SUPPORT_EMAIL } from '../data/products.js';

export function renderPrivacyPage(container) {
  container.innerHTML = `
    <div class="container animate-fade-in mt-5 mb-6" style="max-width: 800px;">
      <div class="card" style="padding: var(--space-5); line-height: 1.8;">
        
        <span class="tag tag-accent mb-3">Legal & Trust</span>
        <h1 class="font-heading fw-800 mb-2" style="font-size: var(--text-xl); text-align: left;">Privacy Policy</h1>
        <p class="text-muted mb-4" style="font-size: var(--text-xs);">Last Updated: June 2026</p>
        
        <p class="text-secondary mb-4">
          At Soccer Formation Finder, we believe in straightforward, honest coaching and transparent data practices. 
          This policy explains in plain English what information we collect, how it is used, and how we protect it.
        </p>
        
        <div class="divider mb-4"></div>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">1. Information We Collect</h3>
        <p class="text-secondary mb-3">
          To build your custom blueprint and process orders, we may collect the following details:
        </p>
        <ul style="color: var(--color-text-secondary); margin-left: var(--space-4); margin-bottom: var(--space-4); font-size: var(--text-sm);">
          <li><strong>Name & Email Address</strong> — Used to send your results and delivery details.</li>
          <li><strong>Team Level & Tactical Environment</strong> — Details about your team's age group and competition level.</li>
          <li><strong>Biggest Tactical Problem</strong> — The specific coaching difficulties you submit in the questionnaire.</li>
          <li><strong>Quiz Answers & Recommended Formation</strong> — Your responses to help identify the best team shape.</li>
          <li><strong>Purchase Details</strong> — Confirmation of purchases for invoice purposes.</li>
          <li><strong>Support Messages</strong> — Any queries or feedback you send to us.</li>
          <li><strong>Basic Website Analytics</strong> — Anonymous performance statistics (if cookies/analytics are enabled).</li>
        </ul>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">2. How We Use Your Data</h3>
        <p class="text-secondary mb-3">
          We use this information solely to provide a high-quality coaching tool and support service:
        </p>
        <ul style="color: var(--color-text-secondary); margin-left: var(--space-4); margin-bottom: var(--space-4); font-size: var(--text-sm);">
          <li>To generate and deliver your free <strong>Team Tactical Blueprint</strong>.</li>
          <li>To email your blueprint results copy to your inbox.</li>
          <li>To deliver and grant access to purchased implementation guides.</li>
          <li>To provide customer support and reply to messages.</li>
          <li>To analyze tool performance and improve the user experience.</li>
          <li>To send relevant coaching tips and system updates (only if you opt-in or submit your email for results).</li>
        </ul>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">3. Payments & Security</h3>
        <p class="text-secondary mb-3">
          All transactions are processed securely via <strong>Stripe</strong>. 
          Soccer Formation Finder does not directly store, see, or process your credit card details. 
          Stripe handles all payment details in accordance with their industry-standard security regulations.
        </p>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">4. Data Sharing & Deletion</h3>
        <p class="text-secondary mb-3">
          Your personal data is never sold, traded, or shared with third-party advertisers. 
          If you would like us to permanently delete your contact details and quiz history, simply email us at 
          <a href="mailto:${SUPPORT_EMAIL}" style="color: var(--color-accent); font-weight: 600;">${SUPPORT_EMAIL}</a> 
          and we will process your deletion request.
        </p>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">5. Analytics & Cookies</h3>
        <p class="text-secondary mb-4">
          We use basic performance cookies to understand how coaches navigate our website and where traffic comes from. 
          This helps us optimize load speeds and fix interface issues.
        </p>
        
        <div class="divider mb-4"></div>
        
        <div style="background: var(--color-surface); padding: var(--space-3); border-radius: var(--radius-md); border-left: 3px solid var(--color-accent);">
          <p class="text-muted" style="font-size: var(--text-xs); margin-bottom: 0; line-height: 1.5;">
            <strong>Disclaimer:</strong> This website provides educational coaching content and does not guarantee specific match outcomes or league performance. 
            For any legal or support queries, please contact <a href="mailto:${SUPPORT_EMAIL}" style="color: var(--color-accent);">${SUPPORT_EMAIL}</a>.
          </p>
        </div>
        
      </div>
    </div>
  `;
}
