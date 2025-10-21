// components/footer.js
class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="footer-content">
          <p>&copy; 2025 Property of Rheonda Dorothy Ogletree. Built with Transparency. All rights reserved.</p>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/rheondadogletree">Li</a>
            <a href="#">Tw</a>
            <a href="https://substack.com/@breathinganomalypseudonym">Sub</a>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('site-footer', SiteFooter);
