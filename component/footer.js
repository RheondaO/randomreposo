// /component/footer.js
export function loadFooter() {
  const footerContainer = document.getElementById("footer");
  if (!footerContainer) return;

  footerContainer.innerHTML = `
  <div class="help-container">
    <div class="help-tooltip"> 
  <h4>Manifestation Targets</h4><br>(in $AnnualIncome (Post-Tax)):
  <br><b>$333,888
  <br> $266,112
  <br> $198,336</b>
  <br><br>Gold Star if we define what that requires fully.
  <br><a href="mailto:rheondadotogletree@outlook.com">rheondadotogletree@outlook.com</a>
  </div>
    <div class="help-button">?</div>
  </div>
    <div class="footer-content">
      <p><i>This portfolio is a product of AI-Human collaboration, showcasing the ability to manage and lead AI tools for higher technical output.</i></p>
      <p>&copy; 2026 Property of Rheonda Dorothy Ogletree. Built with Transparency. All rights reserved.</p>
      <div class="social-links">
        <a href="https://github.com/RheondaO/randomreposo">Git</a>
        <a href="https://breathinganomalypseudonym.substack.com/">Sub</a>
        <a href="https://www.linkedin.com/in/rheondadogletree">Li</a>
      </div>
    </div>
  `;
}
