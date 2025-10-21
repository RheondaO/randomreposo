// components/loader.js
class SiteLoader extends HTMLElement {
  connectedCallback() {
    // Only show once per session
    if (sessionStorage.getItem("loaderShown")) {
      this.style.display = "none";
      return;
    }

    // Build loader directly in JS
    this.innerHTML = `
      <div class="loading-screen" id="loadingScreen">
        <div class="loader"></div>
        <div class="loading-text" id="hatContainer"></div>
      </div>
    `;

    sessionStorage.setItem("loaderShown", "true");

    const hats = [
      "dad hat",
      "easter sunday hat", 
      "top hat",
      "baseball cap",
      "beanie",
      "beret",
      "cowboy hat",
      "bucket hat",
      "fedora",
      "snapback",
      "chef's hat"
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
        setTimeout(() => {
          loadingScreen.classList.add('fade-out');
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 1000);
        }, 500);
      }
    }

    window.addEventListener('load', showNextHat);
  }
}

customElements.define('site-loader', SiteLoader);
