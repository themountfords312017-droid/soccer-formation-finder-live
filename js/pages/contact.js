import { navigate } from '../router.js';
import { SUPPORT_EMAIL } from '../data/products.js';

export function renderContactPage(container) {
  container.innerHTML = `
    <div class="container animate-fade-in mt-5 mb-6" style="max-width: 680px;">

      <!-- Page header -->
      <div class="text-center mb-5">
        <span class="tag tag-accent mb-3">Support</span>
        <h1 class="font-heading fw-800 mb-2">Contact Support</h1>
        <p class="text-secondary mx-auto" style="max-width: 520px; font-size: var(--text-sm); line-height: 1.6;">
          Need help with your tactical blueprint, guide download, or purchase? Send a message and we’ll get back to you as soon as possible.
        </p>
      </div>

      <!-- Contact options -->
      <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-5);">

        <!-- Email card -->
        <div class="card" style="padding: var(--space-4); display: flex; align-items: center; gap: var(--space-4);">
          <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--color-accent-glow); border: 1px solid var(--color-accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px;">
            📩
          </div>
          <div>
            <h3 class="font-heading mb-1" style="font-size: var(--text-base);">Email Support</h3>
            <p class="text-secondary mb-1" style="font-size: var(--text-sm);">
              Send us an email directly for download assistance, invoice requests, or technical support.
            </p>
            <a href="mailto:${SUPPORT_EMAIL}" style="color: var(--color-accent); font-weight: 600; font-size: var(--text-sm);">${SUPPORT_EMAIL}</a>
          </div>
        </div>

      </div>

      <!-- Simple contact form -->
      <div class="card" style="padding: var(--space-5);" id="contact-card">
        <h2 class="font-heading mb-1" style="font-size: var(--text-lg);">Send a Message</h2>
        <p class="text-secondary mb-4" style="font-size: var(--text-sm);">Fill in the details below to open a ticket.</p>

        <form id="contact-form">
          <div class="form-group">
            <label class="form-label" for="contact-name">Your Name</label>
            <input type="text" id="contact-name" class="form-input" placeholder="Coach Name" required autocomplete="name" />
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-email">Email Address</label>
            <input type="email" id="contact-email" class="form-input" placeholder="coach@example.com" required autocomplete="email" />
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-subject">Reason for contact</label>
            <select id="contact-subject" class="form-select" required>
              <option value="" disabled selected>Select a reason...</option>
              <option value="download-issue">Guide download issue</option>
              <option value="payment-question">Payment question</option>
              <option value="wrong-guide">Wrong guide received</option>
              <option value="blueprint-question">Tactical Blueprint question</option>
              <option value="general-support">General support</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-message">Message</label>
            <textarea id="contact-message" class="form-textarea" rows="4" placeholder="How can we help you..." required></textarea>
          </div>

          <div class="mt-4">
            <button type="submit" class="btn btn-primary btn-large btn-block">Send Message</button>
          </div>

          <p class="text-muted text-center" style="font-size: 11px; margin-top: var(--space-2);">
            We review support requests manually and typically respond within 24 hours.
          </p>
        </form>
      </div>

      <!-- Disclaimer note -->
      <p class="text-muted text-center mt-4" style="font-size: var(--text-xs); line-height: 1.5; max-width: 500px; margin: var(--space-4) auto 0;">
        This content is for educational coaching purposes and does not guarantee specific match results. 
        For immediate help, contact us directly at <a href="mailto:${SUPPORT_EMAIL}" style="color: var(--color-accent);">${SUPPORT_EMAIL}</a>.
      </p>

    </div>
  `;

  // Form submit handler
  const form = container.querySelector('#contact-form');
  const card = container.querySelector('#contact-card');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = container.querySelector('#contact-name').value.trim();
    const email   = container.querySelector('#contact-email').value.trim();
    const subject = container.querySelector('#contact-subject').value;
    const message = container.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) return;

    // TODO: Connect form submission to backend service (e.g. Formspree, SendGrid, or server endpoint)
    // For now, save locally to localStorage for validation
    try {
      const list = JSON.parse(localStorage.getItem('ff_contacts') || '[]');
      list.push({ name, email, subject, message, date: new Date().toISOString() });
      localStorage.setItem('ff_contacts', JSON.stringify(list));
    } catch {}

    // Success state
    card.innerHTML = `
      <div class="text-center animate-scale-in" style="padding: var(--space-5) 0;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-accent-glow); border: 2px solid var(--color-accent); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-3); font-size: 24px;">
          ✓
        </div>
        <h2 class="font-heading text-accent mb-2">Message Sent</h2>
        <p class="text-secondary mb-4" style="font-size: var(--text-sm); max-width: 380px; margin: 0 auto var(--space-4); line-height: 1.6;">
          Thanks, ${name}. We've received your request and will get back to you at <strong>${email}</strong> as soon as possible.
        </p>
        <button id="success-home-btn" class="btn btn-secondary" style="font-size: var(--text-xs);">Back to Home</button>
      </div>
    `;

    card.querySelector('#success-home-btn').addEventListener('click', () => navigate('#/'));
  });
}
