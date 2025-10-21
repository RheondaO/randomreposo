// components/nav.js
class SiteNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <div class="nav-container">
          <a href="index.html" class="logo">ai portfolio</a>
          <ul class="nav-links">
            <li><a href="index.html">home</a></li>
            <li><a href="knowledgebase.html">knowledgebase</a></li>
            <li><a href="agent_library.html">agent library</a></li>
            <li><a href="the_lab_page.html">the lab</a></li>
            <li><a href="contact_page.html">contact</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
}
customElements.define('site-nav', SiteNav);
