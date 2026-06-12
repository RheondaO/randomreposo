// /component/nav.js
export function loadNav() {
  const navContainer = document.getElementById("nav");
  if (!navContainer) return;

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

  const navLinks = navContainer.querySelectorAll('a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.getAttribute('href');

      if (!targetUrl || targetUrl.startsWith('javascript:')) return;

      // Avoid blocking native hash switches on the exact same page path
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const [targetPath, targetHash] = targetUrl.split('#');
      if ((targetPath === currentPath || !targetPath) && targetHash) {
        return; 
      }

      e.preventDefault();

      // Trigger outward navigation mask instantly to block layout jumps
      document.documentElement.classList.add('navigating-out');

      const siteLoader = document.querySelector('site-loader');
      if (siteLoader) {
        const loadingScreen = siteLoader.querySelector('#loadingScreen');
        if (loadingScreen) {
          loadingScreen.style.display = 'block';
          requestAnimationFrame(() => {
            loadingScreen.style.opacity = '1';
          });
        }
      }

      // Hand-off page change right as loader reaches max fade state
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 350); 
    });
  });
}
