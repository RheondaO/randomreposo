// /component/nav.js
export async function loadNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Debounce: prevent rapid clicks
  let isNavigating = false;
  const NAVIGATION_DELAY = 500; // 500ms delay between clicks

  // Import loader
  const { SiteLoader } = await import('./loader.js');

  // Get all nav links
  const navLinks = nav.querySelectorAll('a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const isSamePage = href === window.location.pathname || 
                         href === window.location.href;

      // Don't prevent default for same page or if already navigating
      if (isSamePage || isNavigating) {
        e.preventDefault();
        return;
      }

      // Prevent rapid navigation
      e.preventDefault();
      isNavigating = true;

      // Show loader (just the ring, no hats)
      SiteLoader.showLoader();

      // Navigate after delay
      setTimeout(() => {
        window.location.href = href;
      }, NAVIGATION_DELAY);

      // Reset flag
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
