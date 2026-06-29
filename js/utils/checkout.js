/**
 * Checkout Utility
 *
 * Handles payment initiation for the $9.99 PDF guide and $99 call.
 * To go live, replace the TODO sections with your real Stripe integration.
 *
 * Integration options:
 *   A) Stripe Checkout (hosted) — simplest, recommended
 *   B) Stripe Payment Links — no-code option
 *   C) Stripe.js + Elements — fully custom checkout
 */

import { getGuideProduct, CALL_PRODUCT } from '../data/products.js';
import { trackClickPdfUpgrade, trackBookCallClick, trackCheckoutStarted } from './analytics.js';
import { navigate } from '../router.js';

// ------------------------------------------------------------
// Stripe Configuration
// TODO: Replace with your real Stripe publishable key.
// ------------------------------------------------------------
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51TnbCvQY5IxVGsVP';

// TODO: Replace with your real Stripe Checkout success URL.
const CHECKOUT_SUCCESS_URL = `${window.location.origin}/#/success`;

// TODO: Replace with your real Stripe Checkout cancel URL.
const CHECKOUT_CANCEL_URL = `${window.location.origin}/#/results`;

// ------------------------------------------------------------
// Initiate PDF Guide Checkout
// ------------------------------------------------------------
/**
 * Initiates checkout for the formation-specific implementation guide.
 *
 * @param {string} formationId — e.g. '4-2-3-1'
 */
export async function initiateCheckout(formationId) {
  const product = getGuideProduct(formationId);

  if (!product) {
    console.error(`[Checkout] No product found for formation: ${formationId}`);
    return;
  }

  // Fire analytics event
  trackClickPdfUpgrade(formationId);
  trackCheckoutStarted(formationId);

  // Get stored email if available to prefill Checkout
  const email = getStoredEmail();

  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formationId, email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const session = await response.json();
    if (session.url) {
      // Redirect to Stripe Checkout or Mock redirect URL
      window.location.href = session.url;
    } else {
      throw new Error(session.error || 'No session URL returned');
    }
  } catch (err) {
    console.error('[Checkout] Error initiating checkout:', err);
    alert('Checkout service is currently unavailable. Please try again later.');
  }
}

// ------------------------------------------------------------
// Book Tactical Blueprint Call — $99
// ------------------------------------------------------------
/**
 * Opens the booking link for the $99 Tactical Blueprint Call.
 * @param {string} source — where the CTA was clicked from
 */
export function bookCall(source = 'unknown') {
  trackBookCallClick(source);

  if (CALL_PRODUCT.bookingLink === 'BOOKING_LINK_PLACEHOLDER') {
    console.log('[Checkout] Booking link not configured yet.');
    alert(
      'The booking link has not been configured yet.\n\n' +
      'Replace BOOKING_LINK_PLACEHOLDER in js/data/products.js with your scheduling link (e.g. Calendly or TidyCal).'
    );
    return;
  }

  // Open booking link in a new tab
  window.open(CALL_PRODUCT.bookingLink, '_blank', 'noopener noreferrer');
}

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

/** Get the stored lead email (for Stripe pre-fill) */
function getStoredEmail() {
  try {
    const lead = JSON.parse(localStorage.getItem('ff_lead'));
    return lead?.email || undefined;
  } catch {
    return undefined;
  }
}

/** Get the purchased formation from session (for success page) */
export function getPurchasedFormation() {
  try {
    return {
      formationId: sessionStorage.getItem('ff_purchased_formation'),
      productName: sessionStorage.getItem('ff_purchased_product_name'),
      fileUrl: sessionStorage.getItem('ff_purchased_file_url'),
    };
  } catch {
    return { formationId: null, productName: null, fileUrl: null };
  }
}
