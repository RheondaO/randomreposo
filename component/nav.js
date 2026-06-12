// /component/nav.js
export function loadNav() {
  const navContainer = document.getElementById("nav");
  if (!navContainer) return;

  // 1. Inject the navigation HTML structure
  navContainer.innerHTML = `
    <nav>
      <div class="nav-container">
        <a href="index.html" class="logo">sales portfolio</a>    
        <ul class="nav-links">
          <li class="nav-item">
            <a href="index.html">home</a>
          </li>
          <li class="nav-item">
            <a href="knowledgebase.html#admin">meet the admin</a>
            <span class="nav-tooltip">¡AI poweruser!</span>
          </li>
        </ul>
      </div>
    </nav>
  `;

  // 2. Target the specific home/index navigation links
  const indexLinks = navContainer.querySelectorAll('a[href="index.html"]');

  indexLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = link.getAttribute('href');

      // 1. QUICKEST STRIKE: Force an instant state via the root document element.
      // This bypasses the JS paint-render queue delay entirely.
      document.documentElement.classList.add('navigating-out');

      // 2. Look for the site-loader element to ensure the UI states align
      const siteLoader = document.querySelector('site-loader');
      if (siteLoader) {
        const loadingScreen = siteLoader.querySelector('#loadingScreen');
        if (loadingScreen) {
          loadingScreen.style.display = 'block';
          
          // Let the browser paint the display block rule, then smoothly transition opacity
          requestAnimationFrame(() => {
            loadingScreen.style.opacity = '1';
          });
        }
      }

      // 3. Hold the page context firmly for 400ms before changing locations
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 1000);
    });
  });
}
