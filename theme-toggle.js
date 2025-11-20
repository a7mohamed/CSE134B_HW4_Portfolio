// theme-toggle.js
// Theme Toggle with localStorage

(function() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) {
    console.log('Theme toggle button not found');
    return;
  }
  
  const html = document.documentElement;
  
  // Check for saved theme preference or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme on page load
  html.setAttribute('data-theme', savedTheme);
  updateButtonText(savedTheme);
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    console.log('Switching from', currentTheme, 'to', newTheme);
    
    // Update DOM
    html.setAttribute('data-theme', newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update button text
    updateButtonText(newTheme);
  });
  
  function updateButtonText(theme) {
    if (theme === 'dark') {
      themeToggle.textContent = '☀️ Light Mode';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      themeToggle.textContent = '🌙 Dark Mode';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }
  
  console.log('Theme toggle initialized. Current theme:', savedTheme);
})();