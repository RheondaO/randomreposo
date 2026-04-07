// /component/footer.js
export function loadFooter() {
  const footerContainer = document.getElementById("footer");
  if (!footerContainer) return;

  footerContainer.innerHTML = `
  <div class="help-container">
    <div class="help-tooltip"> 
  <h4>Manifestation Targets <br>in Annual Income (Post-Tax): </h4>
  <br><p><b>$333,888
  <br> $266,112
  <br> $198,336</p></b>
  <br><i>Gold Star if we define what that requires transparently.</i>
  <br>You can email me at <a href="mailto:rheondadotogletree@outlook.com">rheondadotogletree@outlook.com</a>
  </div>
    <div class="help-button">?</div>
  </div>
    <div class="footer-content">
      <p><i>This portfolio is a product of AI-Human collaboration, showcasing the ability to manage and lead AI tools for higher technical output.</i></p>
      <p>&copy; 2026 Property of Rheonda Dorothy Ogletree. Built with Transparency. BizTech-Jargon-Friendly. All rights reserved.</p>
      <div class="social-links">
        <a href="https://github.com/RheondaO/randomreposo" target="_blank" rel="noopener noreferrer">Git</a>
        <a href="https://breathinganomalypseudonym.substack.com/" target="_blank" rel="noopener noreferrer">Sub</a>
        <a href="https://www.linkedin.com/in/rheondadogletree" target="_blank" rel="noopener noreferrer">Li</a>
        <a href="https://na2.hubs.ly/H04FmLg0" target="_blank" rel="noopener noreferrer">Rés</a>
      </div>
    </div>
  `;
}
