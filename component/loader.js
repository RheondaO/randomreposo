// components/loader.js
class SiteLoader extends HTMLElement {
  connectedCallback() {
    // Only run on index page
    const isIndexPage = window.location.pathname === "/" || 
                        window.location.pathname.endsWith("index.html");
    
    if (!isIndexPage) return;

    const isFirstVisit = !sessionStorage.getItem("loaderShown");

    // Build loader
    this.innerHTML = `
      <div class="loading-screen" id="loadingScreen">
        <div class="loader"></div>
        <div class="loading-text" id="hatContainer"></div>
      </div>
    `;

    const loadingScreen = this.querySelector('.loading-screen');
    const hatContainer = this.querySelector('#hatContainer');

    if (isFirstVisit) {
      // FIRST VISIT: Show hats animation
      sessionStorage.setItem("loaderShown", "true");
      this.showHatsAnimation(hatContainer, loadingScreen);
    } else {
      // RETURNING: Just show loader ring, fade immediately
      this.showQuickLoader(loadingScreen);
    }
  }

  showHatsAnimation(hatContainer, loadingScreen) {
    const hats = [
      "dad hat", "easter sunday hat", "top hat", "baseball cap",
      "beanie", "beret", "cowboy hat", "bucket hat",
      "fedora", "snapback", "chef's hat"
    ];

    let currentHatIndex = 0;

    const showNextHat = () => {
      if (currentHatIndex < hats.length) {
        const hatElement = document.createElement('div');
        hatElement.className = 'hat-name';
        hatElement.textContent = hats[currentHatIndex];
        hatContainer.appendChild(hatElement);

        setTimeout(() => {
          hatContainer.removeChild(hatElement);
        }, 1500);

        currentHatIndex++;
        setTimeout(showNextHat, 1700);
      } else {
        // All hats done - fade out
        this.fadeOutLoader(loadingScreen);
      }
    };

    showNextHat();
  }

  showQuickLoader(loadingScreen) {
    // Just show the ring for 1 second (page switching)
    setTimeout(() => {
      this.fadeOutLoader(loadingScreen);
    }, 2000);
  }

  fadeOutLoader(loadingScreen) {
    loadingScreen.style.transition = "opacity 1s ease-out";
    loadingScreen.style.opacity = "0";

    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }
}

customElements.define('site-loader', SiteLoader);
