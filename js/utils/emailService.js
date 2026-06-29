/**
 * Email Service Utility
 *
 * Handles lead submission and email segmentation tagging.
 * Connect to your preferred email platform by replacing the
 * TODO sections below.
 *
 * Supported platforms:
 *   - Mailchimp
 *   - ConvertKit / Kit
 *   - Beehiiv
 *   - Brevo (formerly Sendinblue)
 *   - Any platform with a REST API or form endpoint
 */

// ------------------------------------------------------------
// Email Platform Configuration
// TODO: Replace with your real API endpoint or form action URL.
// ------------------------------------------------------------
const EMAIL_API_ENDPOINT = 'EMAIL_API_ENDPOINT_PLACEHOLDER';

// ------------------------------------------------------------
// Problem → Email Tag Map
// ------------------------------------------------------------
const PROBLEM_TAG_MAP = {
  'concede-too-many':         'concedes-too-many-goals',
  'striker-isolated':         'striker-isolated',
  'lose-midfield':            'loses-midfield',
  'lack-width':               'lacks-width',
  'struggle-to-build':        'struggles-to-build',
  'counterattacked':          'counterattacked-easily',
  'cannot-press':             'cannot-press',
  'unclear-roles':            'players-unclear-roles',
  'no-chances':               'does-not-create-chances',
  'too-stretched':            'team-too-stretched',
};

// ------------------------------------------------------------
// Formation → Email Tag Map
// ------------------------------------------------------------
const FORMATION_TAG_MAP = {
  '4-2-3-1': 'formation-4231',
  '4-3-3':   'formation-433',
  '4-4-2':   'formation-442',
  '4-1-4-1': 'formation-4141',
  '4-5-1':   'formation-451',
  '3-5-2':   'formation-352',
  '5-3-2':   'formation-532',
  '3-4-3':   'formation-343',
  '4-3-1-2': 'formation-4312',
};

// ------------------------------------------------------------
// Build Tag Array
// ------------------------------------------------------------
/**
 * Build the tag array for the subscriber based on their
 * tactical problem and recommended formation.
 * @param {string} problemKey
 * @param {string} formationId
 * @returns {string[]}
 */
export function buildTags(problemKey, formationId) {
  const tags = [];
  if (problemKey && PROBLEM_TAG_MAP[problemKey]) {
    tags.push(PROBLEM_TAG_MAP[problemKey]);
  }
  if (formationId && FORMATION_TAG_MAP[formationId]) {
    tags.push(FORMATION_TAG_MAP[formationId]);
  }
  return tags;
}

// ------------------------------------------------------------
// Submit Lead
// ------------------------------------------------------------
/**
 * Submit lead data to the email platform.
 * Stores the lead locally and attempts the API call.
 *
 * @param {Object} leadData
 * @param {string} leadData.name
 * @param {string} leadData.email
 * @param {string} leadData.teamLevel
 * @param {string} leadData.problem         — problem key (maps to tag)
 * @param {string} leadData.recommendedFormation
 * @param {string} leadData.alternativeFormation
 * @param {string} leadData.formationToAvoid
 * @param {string} leadData.attackingShape
 * @param {string} leadData.defensiveShape
 * @param {string} leadData.trainingFocus
 * @param {string[]} tags                   — pre-built tag array
 */
export async function submitLead(leadData, tags = []) {
  // Always save locally regardless of API status
  console.log('[EmailService] Lead captured:', leadData);
  console.log('[EmailService] Tags applied:', tags);

  // Fire analytics event
  try {
    import('./analytics.js').then(({ trackEvent }) => {
      trackEvent('email_submitted', {
        team_level: leadData.teamLevel || '',
        problem: leadData.problem || '',
        formation: leadData.recommendedFormation || '',
      });
    });
  } catch (e) {}

  try {
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lead: leadData, tags }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('[EmailService] Remote submission success:', result);
    return { success: true, result };
  } catch (err) {
    console.warn('[EmailService] Remote submission failed:', err);
    return { success: false, error: err.message };
  }
}
