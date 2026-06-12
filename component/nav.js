// /component/nav.js
export function loadNav() {
  const navContainer = document.getElementById("nav");
  if (!navContainer) return;

  // 1. Inject the navigation HTML structure
  navContainer.innerHTML = `
    <nav>
      <div class="nav-container">
        <a href="https://rheondao.github.io/randomreposo/" class="logo">sales portfolio</a>    
        <ul class="nav-links">
          <li class="nav-item">
            <a href="https://rheondao.github.io/randomreposo/">home</a>
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
  const indexLinks = navContainer.querySelectorAll('a[href="https://rheondao.github.io/randomreposo/"]');

  indexLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Prevent the immediate page tear-down flash
      e.preventDefault();

      // Look for the site-loader element on the current page
      const siteLoader = document.querySelector('site-loader');
      if (siteLoader) {
        const loadingScreen = siteLoader.querySelector('#loadingScreen');
        if (loadingScreen) {
          // Immediately pop the loader back to full visibility 
          loadingScreen.style.display = 'block';
          loadingScreen.style.opacity = '1';
        }
      }

      // Hold the transition barrier for 400ms before shifting locations
      setTimeout(() => {
        window.location.href = link.getAttribute('href');
      }, 2000);
    });
  });
}
