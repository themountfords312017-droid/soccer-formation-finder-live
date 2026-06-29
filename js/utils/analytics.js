/**
 * Analytics Tracking Utility
 *
 * All tracking events are centralised here.
 * To connect a real analytics platform, replace the TODO sections below.
 *
 * Supported platforms (add your initialisation code in initAnalytics):
 *   - Google Analytics 4 (GA4)
 *   - Meta Pixel (Facebook)
 *   - TikTok Pixel
 *   - Any custom analytics platform
 */

// ------------------------------------------------------------
// Initialise Analytics
// Call this once on page load.
// ------------------------------------------------------------
export function initAnalytics() {
  // TODO: Add your GA4 initialisation here.
  // Example:
  //   gtag('config', 'G-XXXXXXXXXX');
  //
  // TODO: Add your Meta Pixel initialisation here.
  // Example:
  //   fbq('init', 'YOUR_PIXEL_ID');
  //   fbq('track', 'PageView');
  //
  // TODO: Add TikTok Pixel initialisation here.
  // Example:
  //   ttq.load('YOUR_TIKTOK_PIXEL_ID');
  //   ttq.page();
  console.log('[Analytics] Initialised (placeholder mode).');
}

// ------------------------------------------------------------
// Core Event Tracker
// ------------------------------------------------------------
/**
 * Track a named event with optional properties.
 * @param {string} eventName
 * @param {Object} [props={}]
 */
export function trackEvent(eventName, props = {}) {
  // TODO: Fire GA4 event
  // Example:
  //   if (typeof gtag !== 'undefined') {
  //     gtag('event', eventName, props);
  //   }
  //
  // TODO: Fire Meta Pixel custom event
  // Example:
  //   if (typeof fbq !== 'undefined') {
  //     fbq('trackCustom', eventName, props);
  //   }
  //
  // TODO: Fire TikTok Pixel custom event
  // Example:
  //   if (typeof ttq !== 'undefined') {
  //     ttq.track(eventName, props);
  //   }

  // Console log for development visibility
  console.log(`[Analytics] Event: ${eventName}`, props);
}

// ------------------------------------------------------------
// Pre-wired Funnel Events
// ------------------------------------------------------------

/** User clicks "Start the Formation Finder" */
export function trackStartQuiz() {
  trackEvent('start_finder_clicked');
}

/** User completes the final quiz question */
export function trackCompleteQuiz(answers) {
  trackEvent('quiz_completed', {
    team_level: answers.coaching_level || '',
    coach_experience: answers.coach_experience || '',
  });
}

/** User submits the email capture form */
export function trackSubmitEmail(leadData) {
  trackEvent('email_submitted', {
    team_level: leadData.teamLevel || '',
    problem: leadData.problem || '',
  });
}

/** User views the free results page */
export function trackViewResult(formationId, score) {
  trackEvent('result_viewed', {
    formation: formationId,
    suitability_score: score,
  });
}

/** User clicks the PDF upsell button */
export function trackClickPdfUpgrade(formationId) {
  trackEvent('guide_upsell_clicked', {
    formation: formationId,
    price: 9.99,
    currency: 'USD',
  });
}

/** User starts Stripe checkout redirect */
export function trackCheckoutStarted(formationId) {
  trackEvent('checkout_started', {
    formation: formationId,
    price: 9.99,
    currency: 'USD',
  });
}

/** User lands on the success page after purchase */
export function trackPurchaseSuccess(formationId) {
  trackEvent('purchase_completed', {
    formation: formationId,
    value: 9.99,
    currency: 'USD',
  });
}

/** User downloads the guide */
export function trackPdfDownloaded(formationId) {
  trackEvent('pdf_downloaded', {
    formation: formationId
  });
}

/** User clicks the $99 Tactical Blueprint Call CTA */
export function trackClickCallCta(source) {
  trackEvent('click_call_cta', {
    source, // e.g. 'results_tab', 'success_page', 'post_purchase'
    price: 99,
    currency: 'USD',
  });
}

/** User clicks the booking link for the $99 call */
export function trackBookCallClick(source) {
  trackEvent('book_call_click', {
    source,
    price: 99,
    currency: 'USD',
  });
}
