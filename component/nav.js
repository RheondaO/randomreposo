// /component/nav.js
export function loadNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Debounce: prevent rapid clicks
  let isNavigating = false;
  const NAVIGATION_DELAY = 500; // 500ms delay between clicks

  // Get all nav links
  const navLinks = nav.querySelectorAll('a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Prevent rapid navigation
      if (isNavigating) {
        e.preventDefault();
        return;
      }

      // Check if it's an external link or same page
      const href = link.getAttribute('href');
      const isSamePage = href === window.location.pathname || 
                         href === window.location.href;

      if (isSamePage) {
        e.preventDefault();
        return; // Don't navigate
      }

      // Mark as navigating
      isNavigating = true;

      // Show loader
      const { SiteLoader } = await import('./loader.js');
      SiteLoader.showLoader();

      // Allow navigation after brief delay
      setTimeout(() => {
        window.location.href = href;
      }, NAVIGATION_DELAY);

      // Reset flag after full transition
      setTimeout(() => {
        isNavigating = false;
      }, NAVIGATION_DELAY + 1000);
    });
  });
  
  navContainer.innerHTML = `
    <nav>
      <div class="nav-container">
        <a href="index.html" class="logo">sales portfolio</a>    
  <ul class="nav-links">
        <li class="nav-item">
        <a href="index.html">home</a></li>

        <li class="nav-item">
          <a href="knowledgebase.html#admin">meet the admin</a>
          <span class="nav-tooltip">¡AI poweruser!</span>
        </li>
<!-------------
        <li class="nav-item">
          <a href="knowledgebase.html">battlecards</a>
          <span class="nav-tooltip">¡AI poweruser!</span>
        </li>
------------->
      </ul>
  </div>
      </div>
    </nav>
  `;
}
