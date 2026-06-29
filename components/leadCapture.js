import { saveLead } from '../utils/storage.js';
import { buildTags, submitLead } from '../utils/emailService.js';

/**
 * Renders the clean inline email capture step after quiz completion.
 * 
 * @param {HTMLElement} container - The page container to render the form into.
 * @param {Function} onSubmit - Callback function receiving leadData.
 */
export function showLeadCapture(container, onSubmit) {
  // Fire analytics event
  try {
    import('../utils/analytics.js').then(({ trackEvent }) => {
      trackEvent('email_capture_viewed');
    });
  } catch (e) {}

  container.innerHTML = `
    <div class="container quiz-container animate-fade-in" style="max-width: 520px; margin: var(--space-4) auto; padding: 0 var(--space-2);">
      <div class="card" style="padding: var(--space-5); position: relative; overflow: hidden; border: 1px solid var(--color-border);">
        <!-- Top accent line -->
        <div style="position:absolute;top:0;left:0;right:0;height:4px;background:var(--color-accent);"></div>

        <div style="text-align: center; margin-bottom: var(--space-4);">
          <div style="display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; background:var(--color-accent-glow); border:1px solid var(--color-accent); border-radius:50%; margin-bottom:var(--space-2);">
            <span style="font-size:22px;">📋</span>
          </div>
          <h2 class="font-heading" style="font-size:1.6rem; margin-bottom: var(--space-2); line-height: 1.3;">Your Team Tactical Blueprint Is Ready</h2>
          <p class="text-secondary" style="font-size: var(--text-sm); line-height:1.6; margin-bottom:0; max-width:420px; margin: 0 auto;">
            Enter your details below to unlock your free tactical blueprint and receive a copy by email.
          </p>
        </div>

        <div class="divider mb-4"></div>

        <form id="lead-capture-form" class="flex-col" style="gap: var(--space-3);">
          <!-- Error alert banner -->
          <div id="lead-error-msg" class="hidden" style="color: var(--color-danger); font-size: var(--text-xs); background: rgba(239, 68, 68, 0.1); border: 1px solid var(--color-danger); padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); font-weight: 600;"></div>

          <div class="form-group">
            <label class="form-label" for="lead-name">Your Name</label>
            <input type="text" id="lead-name" class="form-input" placeholder="Coach Name" autocomplete="name" />
          </div>

          <div class="form-group">
            <label class="form-label" for="lead-email">Email Address</label>
            <input type="email" id="lead-email" class="form-input" placeholder="coach@example.com" autocomplete="email" />
          </div>

          <div class="form-group">
            <label class="form-label" for="lead-level">Team Level</label>
            <select id="lead-level" class="form-select">
              <option value="">Select team level...</option>
              <option value="U13–U15">U13–U15</option>
              <option value="U16–U18">U16–U18</option>
              <option value="High School">High School</option>
              <option value="College Club">College Club</option>
              <option value="Adult Amateur">Adult Amateur</option>
              <option value="Men’s Team">Men’s Team</option>
              <option value="Women’s Team">Women’s Team</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="lead-problem">Biggest Tactical Problem</label>
            <select id="lead-problem" class="form-select">
              <option value="">Select your main challenge...</option>
              <option value="We concede too many counterattacks">We concede too many counterattacks</option>
              <option value="We struggle to create chances">We struggle to create chances</option>
              <option value="We get overrun in midfield">We get overrun in midfield</option>
              <option value="We do not have natural wide players">We do not have natural wide players</option>
              <option value="Our defenders need more protection">Our defenders need more protection</option>
              <option value="Our striker gets isolated">Our striker gets isolated</option>
              <option value="We want to press better">We want to press better</option>
              <option value="We need to be harder to beat">We need to be harder to beat</option>
              <option value="We are not sure what formation suits us">We are not sure what formation suits us</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style="margin-top: var(--space-4);">
            <button type="submit" class="btn btn-primary btn-large btn-block" id="lead-submit-btn">
              Unlock My Free Blueprint
            </button>
          </div>

          <p class="text-muted text-center" style="font-size: 11px; margin-top: var(--space-2); line-height: 1.4; margin-bottom: 0;">
            By continuing, you agree to receive your free tactical result by email.
            We do not share your information.
          </p>
        </form>
      </div>
    </div>
  `;

  const form = container.querySelector('#lead-capture-form');
  const errorMsgDiv = container.querySelector('#lead-error-msg');
  const submitBtn = container.querySelector('#lead-submit-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = container.querySelector('#lead-name').value.trim();
    const email = container.querySelector('#lead-email').value.trim();
    const level = container.querySelector('#lead-level').value;
    const problem = container.querySelector('#lead-problem').value;

    // Strict validation
    if (!name) {
      showError('Please enter your name.');
      return;
    }
    if (!email || !validateEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }
    if (!level) {
      showError('Please select a team level.');
      return;
    }
    if (!problem) {
      showError('Please select your biggest tactical problem.');
      return;
    }

    // Hide error and show saving state
    errorMsgDiv.classList.add('hidden');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Unlocking your blueprint...';

    const leadData = {
      name,
      email,
      teamLevel: level,
      problem,
      timestamp: new Date().toISOString()
    };

    onSubmit(leadData);
  });

  function showError(msg) {
    errorMsgDiv.textContent = msg;
    errorMsgDiv.classList.remove('hidden');
    errorMsgDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
