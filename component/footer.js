// /component/footer.js
export function loadFooter() {
  const footerContainer = document.getElementById("footer");
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <div class="footer-content">
      <p>&copy; 2025 Property of Rheonda Dorothy Ogletree. Built with Transparency. All rights reserved.</p>
      <div class="social-links">
        <a href="https://github.com/RheondaO">Git</a>
        <a href="https://breathinganomalypseudonym.substack.com/">Sub</a>
        <a href="https://www.linkedin.com/in/rheondadogletree">Li</a>
      </div>
    </div>
  `;
}
