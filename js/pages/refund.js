import { SUPPORT_EMAIL } from '../data/products.js';

export function renderRefundPage(container) {
  container.innerHTML = `
    <div class="container animate-fade-in mt-5 mb-6" style="max-width: 800px;">
      <div class="card" style="padding: var(--space-5); line-height: 1.8;">
        
        <span class="tag tag-accent mb-3">Legal & Trust</span>
        <h1 class="font-heading fw-800 mb-2" style="font-size: var(--text-xl); text-align: left;">Refund Policy</h1>
        <p class="text-muted mb-4" style="font-size: var(--text-xs);">Last Updated: June 2026</p>
        
        <p class="text-secondary mb-4">
          We want to make sure you have the tools you need to support your players. 
          Please read our refund policy below regarding digital products.
        </p>
        
        <div class="divider mb-4"></div>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">1. Digital Product Policy</h3>
        <p class="text-secondary mb-4">
          Because the tactical implementation guides are digital products delivered instantly upon purchase, 
          refunds are generally limited once the file has been accessed, downloaded, or viewed.
        </p>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">2. Refund Situations We Consider</h3>
        <p class="text-secondary mb-3">
          We review refund requests manually and aim to resolve all issues fairly. 
          We will consider refund requests under the following circumstances:
        </p>
        <ul style="color: var(--color-text-secondary); margin-left: var(--space-4); margin-bottom: var(--space-4); font-size: var(--text-sm);">
          <li><strong>Duplicate Purchase</strong> — If you accidentally bought the same guide twice in a single session.</li>
          <li><strong>Technical Access Issue</strong> — If a system error prevents you from loading or printing the guide after purchase.</li>
          <li><strong>System/Delivery Error</strong> — If the system delivers a guide that does not match the formation you checked out with.</li>
          <li><strong>Payment Processing Error</strong> — Double charges or checkout connection failures.</li>
        </ul>
        
        <h3 class="font-heading text-accent mb-2" style="font-size: var(--text-md);">3. How to Request a Refund</h3>
        <p class="text-secondary mb-4">
          To request a refund, please email us at 
          <a href="mailto:${SUPPORT_EMAIL}" style="color: var(--color-accent); font-weight: 600;">${SUPPORT_EMAIL}</a> 
          with your purchase email address and details of the guide purchased. 
          Our support team reviews requests manually and will get back to you within 24 hours.
        </p>
        
        <div class="divider mb-4"></div>
        
        <div style="background: var(--color-surface); padding: var(--space-3); border-radius: var(--radius-md); border-left: 3px solid var(--color-accent);">
          <p class="text-muted" style="font-size: var(--text-xs); margin-bottom: 0; line-height: 1.5;">
            <strong>Disclaimer:</strong> This content is for educational coaching purposes and does not guarantee specific match results. 
            For download issues or refund requests, reach out directly to <a href="mailto:${SUPPORT_EMAIL}" style="color: var(--color-accent);">${SUPPORT_EMAIL}</a>.
          </p>
        </div>
        
      </div>
    </div>
  `;
}
