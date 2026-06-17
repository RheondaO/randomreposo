// components/loader.js
class SiteLoader extends HTMLElement {
  connectedCallback() {
    document.documentElement.classList.add('loader-initialized');
    const isFirstVisit = !sessionStorage.getItem("loaderShown");

    // 1. Create the loading screen div completely in memory
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.id = 'loadingScreen';
    
    // 2. Inject your exact original inner layout
    loadingScreen.innerHTML = `
      <div class="loader"></div>
      <div class="loading-text" id="hatContainer"></div>
    `;

    // 3. Pop it out directly to the <body> so it breaks out of the nav container's CSS
    document.body.appendChild(loadingScreen);

    const hatContainer = loadingScreen.querySelector('#hatContainer');

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
      element.remove(); // Clean up the DOM element completely after fading out
      
      document.body.style.visibility = "visible";
      document.body.style.opacity = "1";

      const pageContent = document.getElementById("page-content");
      if (pageContent) pageContent.style.display = "block";
    }, fadeDuration);
  }
}

customElements.define('site-loader', SiteLoader);
