import { getResults, getLead } from '../utils/storage.js';
import { getPurchasedFormation, bookCall } from '../utils/checkout.js';
import { CALL_PRODUCT, SUPPORT_EMAIL, getGuideProduct } from '../data/products.js';
import { trackPurchaseSuccess, trackClickCallCta, trackPdfDownloaded } from '../utils/analytics.js';
import { navigate } from '../router.js';

export function renderSuccessPage(container) {
  // Parse session_id from URL hash query params
  const hash = window.location.hash;
  let sessionId = null;
  if (hash.includes('?')) {
    const query = hash.split('?')[1];
    const params = new URLSearchParams(query);
    sessionId = params.get('session_id');
  }

  // Guard: if no session_id is present, show error
  if (!sessionId) {
    container.innerHTML = `
      <div class="container text-center mt-6 mb-6">
        <div class="card" style="max-width:500px;margin:0 auto;padding:var(--space-5);border-left:3px solid var(--color-danger);">
          <span style="font-size:32px;">⚠️</span>
          <h2 class="font-heading mt-3">No Purchase Session Found</h2>
          <p class="text-secondary mb-4">Complete the Formation Finder to choose your best formation and unlock the guide from your results page.</p>
          <a href="#/quiz" class="btn btn-primary">Start the Formation Finder</a>
        </div>
      </div>
    `;
    return;
  }

  // Render loading state while verifying the session
  container.innerHTML = `
    <div class="container text-center mt-6 mb-6">
      <div class="card" style="max-width:500px;margin:0 auto;padding:var(--space-5);">
        <div style="font-size:32px;margin-bottom:var(--space-3);" class="animate-pulse">⚽</div>
        <h2 class="font-heading">Verifying Purchase...</h2>
        <p class="text-secondary mb-0">Checking your payment session. Please hold on...</p>
      </div>
    </div>
  `;

  // Fetch session verification status from server API
  fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data.verified) {
        renderSuccessContent(container, sessionId, data.formationId, data.productName);
      } else {
        renderErrorContent(container, data.error || 'This checkout session is not paid.');
      }
    })
    .catch(err => {
      console.error('[Success] Verification error:', err);
      renderErrorContent(container, 'Failed to connect to verification server. Please try again.');
    });
}

function renderSuccessContent(container, sessionId, formationId, productName) {
  const lead = getLead();

  // Fire analytics once per session
  const analyticsKey = `ff_analytics_success_${formationId}`;
  if (!sessionStorage.getItem(analyticsKey)) {
    trackPurchaseSuccess(formationId);
    try { sessionStorage.setItem(analyticsKey, '1'); } catch (e) {}
  }

  container.innerHTML = `
    <div class="container animate-fade-in" style="max-width:680px;margin:0 auto;padding:var(--space-5) var(--space-4) var(--space-6);">

      <!-- Success Banner -->
      <div class="card" style="border:2px solid var(--color-accent);padding:var(--space-5);text-align:center;margin-bottom:var(--space-4);position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:var(--color-accent);"></div>

        <div style="width:64px;height:64px;border-radius:50%;background:var(--color-accent-glow);border:2px solid var(--color-accent);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3);">
          <span style="font-size:28px;">✓</span>
        </div>

        <span class="tag tag-accent mb-3">Payment Confirmed</span>
        <h1 class="font-heading mb-2" style="font-size:var(--text-xl);">Your ${formationId} Guide Is Ready</h1>
        <p class="text-secondary mb-4" style="font-size:var(--text-sm);line-height:1.6;max-width:480px;margin:0 auto var(--space-4);">
          Thank you for your purchase.${lead ? ` Coach ${lead.name}, your` : ' Your'} <strong>${productName}</strong> is ready to download below.
        </p>

        <!-- Download CTA (secure link) -->
        <button
          id="download-guide-btn"
          class="btn btn-primary btn-large"
          style="font-size:var(--text-base);padding:var(--space-3) var(--space-6);min-width:280px;"
        >
          ⬇️ Download Your ${formationId} Guide
        </button>

        <p class="text-muted" style="font-size:11px;margin-top:var(--space-2);">
          Securely fetches your PDF from the server.
          <br/>Questions or download issue? <a href="mailto:${SUPPORT_EMAIL}" style="color:var(--color-accent);">Contact support</a>.
        </p>
      </div>

      <!-- What's in the guide reminder -->
      <div class="card" style="padding:var(--space-4);margin-bottom:var(--space-4);">
        <h3 class="font-heading text-accent mb-3" style="font-size:var(--text-base);">What's in your guide</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);">
          ${[
            'Full formation breakdown',
            'Default team shape',
            'Attacking shape',
            'Defensive shape',
            'Transition rules',
            'Key player roles',
            'Training routine',
            'Session plan ideas',
            'Match-day checklist',
            'Common problems & fixes',
            'Coach instructions',
            'Printable player handout',
          ].map(item => `
            <div style="display:flex;align-items:center;gap:8px;font-size:var(--text-xs);color:var(--color-text-secondary);">
              <span style="color:var(--color-accent);font-weight:700;flex-shrink:0;">✓</span> ${item}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Back to blueprint -->
      <div class="card" style="padding:var(--space-4);margin-bottom:var(--space-4);text-align:center;">
        <p class="text-secondary mb-3" style="font-size:var(--text-sm);">
          Want to review your free Team Tactical Blueprint again?
        </p>
        <button id="back-to-results-btn" class="btn btn-secondary" style="font-size:var(--text-xs);">
          ← Back to My Blueprint
        </button>
      </div>

      <!-- Call CTA -->
      <div class="card" style="padding:var(--space-4);border-left:3px solid var(--color-border);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:var(--space-3);flex-wrap:wrap;">
          <div style="flex:1;min-width:220px;">
            <h3 class="font-heading mb-1" style="font-size:var(--text-base);">${CALL_PRODUCT.headline}</h3>
            <p class="text-secondary mb-0" style="font-size:var(--text-sm);line-height:1.5;">
              You've got the guide — now implement it with expert support.
              A 60-minute 1-to-1 session to apply this tactical blueprint directly to your squad, training schedule, and next fixtures.
            </p>
          </div>
          <div style="text-align:center;flex-shrink:0;">
            <span style="font-size:1.6rem;font-weight:800;font-family:var(--font-heading);color:var(--color-text);">$99</span>
            <br/>
            <button id="book-call-success-btn" class="btn btn-outline mt-2" style="font-size:var(--text-xs);white-space:nowrap;">
              Book a Tactical Call
            </button>
          </div>
        </div>
      </div>

      <!-- Support -->
      <p class="text-muted text-center mt-4" style="font-size:11px;">
        Questions or download issue? <a href="mailto:${SUPPORT_EMAIL}" style="color:var(--color-accent);">Contact support</a>.
      </p>

    </div>
  `;

  // Download guide button — downloads securely from API
  container.querySelector('#download-guide-btn')?.addEventListener('click', () => {
    trackPdfDownloaded(formationId);
    window.open(`/api/download-guide?session_id=${encodeURIComponent(sessionId)}`, '_blank');
  });

  // Back to results
  container.querySelector('#back-to-results-btn')?.addEventListener('click', () => {
    navigate('#/results');
  });

  // Book call
  container.querySelector('#book-call-success-btn')?.addEventListener('click', () => {
    trackClickCallCta('success_page');
    bookCall('success_page');
  });
}

function renderErrorContent(container, errorMessage) {
  container.innerHTML = `
    <div class="container text-center mt-6 mb-6">
      <div class="card" style="max-width:500px;margin:0 auto;padding:var(--space-5);border-left:3px solid var(--color-danger);">
        <span style="font-size:32px;">⚠️</span>
        <h2 class="font-heading mt-3">Access Denied</h2>
        <p class="text-secondary mb-4">${errorMessage}</p>
        <div style="display:flex;gap:var(--space-3);justify-content:center;">
          <a href="#/results" class="btn btn-secondary">Back to Results</a>
          <a href="mailto:${SUPPORT_EMAIL}" class="btn btn-outline">Contact Support</a>
        </div>
      </div>
    </div>
  `;
}
