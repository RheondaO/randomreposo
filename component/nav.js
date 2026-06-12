// /component/nav.js
export function loadNav() {
  const navContainer = document.getElementById("nav");
  if (!navContainer) return;

  // Inject the navigation HTML structure
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

  // 1. Target all navigation links globally since all pages now share a loader
  const navLinks = navContainer.querySelectorAll('a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.getAttribute('href');

      // Skip tracking if it's an inline link placeholder or an action snippet
      if (!targetUrl || targetUrl.startsWith('javascript:')) return;

      // CRUCIAL BUG FIX: If clicking an anchor hash on the CURRENT page, 
      // let the browser handle it naturally without fading out!
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const [targetPath, targetHash] = targetUrl.split('#');
      if ((targetPath === currentPath || !targetPath) && targetHash) {
        return; 
      }

      e.preventDefault();

      // 2. QUICKEST STRIKE: Apply the outward navigation mask to the document root.
      document.documentElement.classList.add('navigating-out');

      // 3. Unhide the site-loader element explicitly on the current window framework
      const siteLoader = document.querySelector('site-loader');
      if (siteLoader) {
        const loadingScreen = siteLoader.querySelector('#loadingScreen');
        if (loadingScreen) {
          loadingScreen.style.display = 'block';
          
          // Let the engine map the display state block rule, then smoothly balance opacity
          requestAnimationFrame(() => {
            loadingScreen.style.opacity = '1';
          });
        }
      }

      // 4. Hold the screen mask cleanly for 350ms, then swap pages
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 350); 
    });
  });
}
