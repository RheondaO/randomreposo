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
