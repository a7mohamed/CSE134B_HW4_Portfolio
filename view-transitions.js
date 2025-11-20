// view-transitions.js
// View Transition API Implementation for MPA
// This intercepts navigation clicks and applies smooth transitions between pages

(function() {
  console.log('View Transition API script loaded');
  
  // Check if View Transition API is supported
  if (!document.startViewTransition) {
    console.log('View Transition API not supported in this browser');
    return;
  }
  
  console.log('View Transition API is supported!');
  
  // Function to navigate with view transition
  function navigateWithTransition(url) {
    // Start the view transition
    const transition = document.startViewTransition(() => {
      // This promise resolves when the new page is loaded
      return new Promise((resolve) => {
        window.location.href = url;
        resolve();
      });
    });
    
    return transition;
  }
  
  // Intercept all internal navigation clicks
  document.addEventListener('click', (e) => {
    // Find the closest anchor tag
    const link = e.target.closest('a');
    
    // Check if it's a valid internal link
    if (
      link && 
      link.href && 
      link.origin === location.origin && 
      !link.target && 
      !link.hasAttribute('download') &&
      !e.metaKey && 
      !e.ctrlKey && 
      !e.shiftKey && 
      !e.altKey
    ) {
      e.preventDefault();
      console.log('Intercepted navigation to:', link.href);
      
      // Use View Transition API for the navigation
      navigateWithTransition(link.href);
    }
  });
  
  // Also handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    console.log('Popstate event - applying transition');
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        window.location.reload();
      });
    }
  });
  
  console.log('View transitions initialized for all internal links');
})();