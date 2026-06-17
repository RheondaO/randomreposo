// components/loader.js
class SiteLoader extends HTMLElement {
connectedCallback() {
    document.documentElement.classList.add('loader-initialized');
    
    // 1. Force the loader to be a direct child of body to ensure fixed positioning works globally
    document.body.appendChild(this);

    const isFirstVisit = !sessionStorage.getItem("loaderShown");

    this.innerHTML = `
      <div class="loading-screen" id="loadingScreen">
        <div class="loader"></div>
        <div class="loading-text" id="hatContainer"></div>
      </div>
    `;

    const loadingScreen = this.querySelector('#loadingScreen');
    const hatContainer = this.querySelector('#hatContainer');

    if (isFirstVisit) {
      // 1. ALL OUT MODE: First time opening the site
      sessionStorage.setItem("loaderShown", "true");
      this.runFullHatAnimation(hatContainer, loadingScreen);
    } else {
      // 2. QUICK TRANSITION MODE: Switching between pages (Just the ring)
      this.runQuickLoader(loadingScreen);
    }
  }

  runFullHatAnimation(hatContainer, loadingScreen) {
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

        // Individual hat presentation slide duration
        setTimeout(() => {
          if (hatElement.parentNode) hatContainer.removeChild(hatElement);
        }, 1500);

        currentHatIndex++;
        setTimeout(showNextHat, 1700);
      } else {
        // All hats completed -> Fade out the screen over 1 second
        this.fadeOut(loadingScreen, 1000); 
      }
    };

    // Kick off the sequence
    showNextHat();
  }

  runQuickLoader(loadingScreen) {
    // Keep the infinity ring spinning briefly during page switches (e.g., 1.2 seconds)
    // and then initiate a faster fade out sequence.
    setTimeout(() => {
      this.fadeOut(loadingScreen, 1000); // 1s fade out for transitions
    }, 1000);
  }

  fadeOut(element, fadeDuration) {
    element.style.transition = `opacity ${fadeDuration}ms ease`;
    element.style.opacity = "0";

    setTimeout(() => {
      element.style.display = "none";
      
      // Safety: If you are using head.js inline-CSS to prevent layout flash, 
      // explicitly make sure the body elements recover here:
      document.body.style.visibility = "visible";
      document.body.style.opacity = "1";

      const pageContent = document.getElementById("page-content");
      if (pageContent) pageContent.style.display = "block";
    }, fadeDuration);
  }
}

customElements.define('site-loader', SiteLoader);

// At the bottom of loader.js, after the class definition
customElements.whenDefined('site-loader').then(() => {
    // This code runs once the browser has registered the element
    const loader = document.querySelector('site-loader');
    const screen = loader.querySelector('#loadingScreen');
    if (screen) {
        screen.classList.add('is-visible');
    }
});
