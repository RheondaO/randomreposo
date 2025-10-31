// components/loader.js
class SiteLoader extends HTMLElement {
  connectedCallback() {
    // Only show once per session
    if (sessionStorage.getItem("loaderShown")) {
      this.style.display = "none";

      // Show page content immediately if loader already shown
      /* const pageContent = document.getElementById("page-content");
      if (pageContent) pageContent.style.display = "block";
      return; */
    }

    // Build loader
    this.innerHTML = `
      <div class="loading-screen" id="loadingScreen">
        <div class="loader"></div>
        <div class="loading-text" id="hatContainer"></div>
      </div>
    `;

    sessionStorage.setItem("loaderShown", "true");

    const hats = [
      "dad hat", "easter sunday hat", "top hat", "baseball cap",
      "beanie", "beret", "cowboy hat", "bucket hat",
      "fedora", "snapback", "chef's hat"
    ];

    let currentHatIndex = 0;
    const hatContainer = this.querySelector('#hatContainer');
    const loadingScreen = this.querySelector('.loading-screen');

    function showNextHat() {
      if (currentHatIndex < hats.length) {
        const hatElement = document.createElement('div');
        hatElement.className = 'hat-name';
        hatElement.textContent = hats[currentHatIndex];
        hatContainer.appendChild(hatElement);

        setTimeout(() => {
          hatContainer.removeChild(hatElement);
        }, 1500);

        currentHatIndex++;
        setTimeout(showNextHat, 1500);
      } else {
        // Fade out loader
        loadingScreen.style.transition = "opacity 1s ease";
        loadingScreen.style.opacity = "0";

        setTimeout(() => {
          loadingScreen.style.display = "none";

          // Show page content
          const pageContent = document.getElementById("page-content");
          if (pageContent) pageContent.style.display = "block";
        }, 1000);
      }
    }

    // Start animation immediately
    showNextHat();
  }
}

customElements.define('site-loader', SiteLoader);
