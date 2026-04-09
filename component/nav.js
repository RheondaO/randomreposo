// /component/nav.js
export function loadNav() {
  const navContainer = document.getElementById("nav");
  if (!navContainer) return;

  navContainer.innerHTML = `
    <nav>
      <div class="nav-container">
        <a href="index.html" class="logo">sales portfolio</a>    
  <ul class="nav-links">
        <li><a href="index.html">home</a></li>

        <li class="nav-item">
          <a href="#" class="disabled">meet the admin</a>
          <span class="nav-tooltip">coming soon <3</span>
        </li>

        <li class="nav-item">
          <a href="#" class="disabled">knowledgebase</a>
          <span class="nav-tooltip">¡AI poweruser! </span>
        </li>
      </ul>
  </div>
      </div>
    </nav>
  `;
}
