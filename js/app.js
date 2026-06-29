import { initRouter } from './router.js';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initAnalytics } from './utils/analytics.js';

// Page imports
import { renderHomePage }          from './pages/home.js';
import { renderQuestionnairePage } from './pages/questionnaire.js';
import { renderResultsPage }       from './pages/results.js';
import { renderLibraryPage }       from './pages/library.js';
import { renderBlueprintPage }     from './pages/blueprint.js';
import { renderContactPage }       from './pages/contact.js';
import { renderAboutPage }         from './pages/about.js';
import { renderReviewsPage }       from './pages/reviews.js';
import { renderSuccessPage }       from './pages/success.js';
import { renderPrivacyPage }       from './pages/privacy.js';
import { renderTermsPage }         from './pages/terms.js';
import { renderRefundPage }        from './pages/refund.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialise analytics (placeholder — connect platforms in utils/analytics.js)
  initAnalytics();

  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');

  // 2. Render global layouts (header & footer)
  if (headerContainer) renderHeader(headerContainer);
  if (footerContainer) renderFooter(footerContainer);

  // 3. Map routes to their page renderer functions
  const routes = {
    '#/':           renderHomePage,
    '#/quiz':       renderQuestionnairePage,
    '#/results':    renderResultsPage,
    '#/library':    renderLibraryPage,
    '#/library/:id': renderLibraryPage,
    '#/blueprint':  renderBlueprintPage,
    '#/contact':    renderContactPage,
    '#/about':      renderAboutPage,
    '#/reviews':    renderReviewsPage,
    '#/success':    renderSuccessPage,
    '#/privacy-policy': renderPrivacyPage,
    '#/terms-of-use':   renderTermsPage,
    '#/refund-policy':  renderRefundPage,
  };

  // 4. Initialize Hash Router with default fallback to home
  initRouter(routes, '#/');
});
