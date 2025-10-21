// /component/nav.js
export function loadNav() {
  const navContainer = document.getElementById("nav");
  if (!navContainer) return;

  navContainer.innerHTML = `
    <nav>
      <div class="nav-container">
        <a href="index.html" class="logo">ai portfolio</a>
        <ul class="nav-links">
          <li><a href="index.html">home</a></li>
          <li><a href="knowledgebase.html">knowledgebase</a></li>
          <li><a href="agentlibrary.html">agent library</a></li>
          <li><a href="thelab.html">the lab</a></li>
          <li><a href="contact.html">contact</a></li>
        </ul>
      </div>
    </nav>
  `;
}
