// client-side router
let currentRoutes = {};

export function initRouter(routes, defaultRoute = '#/') {
  currentRoutes = routes;
  
  const handleRouteChange = () => {
    let rawHash = window.location.hash || '#/';
    let hash = rawHash.split('?')[0];
    
    // Check for parameter routes, e.g., #/library/4-3-3
    let matchingRoute = null;
    let params = {};
    
    for (const routePath in currentRoutes) {
      // Convert e.g. '#/library/:id' to a regex
      if (routePath.includes(':')) {
        const regexPath = routePath.replace(/:[^\s/]+/g, '([\\w-]+)');
        const regex = new RegExp(`^${regexPath}$`);
        const match = hash.match(regex);
        if (match) {
          matchingRoute = routePath;
          const paramName = routePath.split(':').pop();
          params[paramName] = match[1];
          break;
        }
      } else if (routePath === hash) {
        matchingRoute = routePath;
        break;
      }
    }
    
    if (!matchingRoute) {
      matchingRoute = defaultRoute;
      window.location.hash = defaultRoute;
      return;
    }
    
    const renderFn = currentRoutes[matchingRoute];
    const appContainer = document.getElementById('app');
    
    if (appContainer && renderFn) {
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Page entry transition
      appContainer.classList.remove('animate-fade-in');
      void appContainer.offsetWidth; // Trigger reflow
      appContainer.classList.add('animate-fade-in');
      
      // Render
      renderFn(appContainer, params);
      
      // Update header active links
      updateActiveLinks(hash);
    }
  };
  
  window.addEventListener('hashchange', handleRouteChange);
  // Initial run
  handleRouteChange();
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function updateActiveLinks(currentHash) {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentHash || (currentHash.startsWith('#/library') && href === '#/library')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
