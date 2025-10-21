// components/loader.js

class SiteLoader extends HTMLElement {
  connectedCallback() {
    const container = this;

    // Only show once per session
    if (sessionStorage.getItem("loaderShown")) {
      container.style.display = "none";
      return;
    }

    fetch("components/loader.html")
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
        sessionStorage.setItem("loaderShown", "true");

        const loadingScreen = container.querySelector(".loading-screen");
        const hatContainer = container.querySelector("#hatContainer");

        if (!loadingScreen || !hatContainer) return;

        // Fade in the loader
        requestAnimationFrame(() => loadingScreen.classList.add("fade-in"));

        // Hat names
        const hats = [
          "dad hat","easter sunday hat","top hat",
          "baseball cap","beanie","beret",
          "cowboy hat","bucket hat","fedora",
          "snapback","chef's hat"
        ];
        let currentHatIndex = 0;

        function showNextHat() {
          if (currentHatIndex < hats.length) {
            const hatEl = document.createElement("div");
            hatEl.className = "hat-name";
            hatEl.textContent = hats[currentHatIndex];
            hatContainer.appendChild(hatEl);

            setTimeout(() => hatContainer.removeChild(hatEl), 1500);
            currentHatIndex++;
            setTimeout(showNextHat, 1500);
          } else {
            // Fade out the entire loading screen
            setTimeout(() => {
              loadingScreen.classList.add("fade-out");
              setTimeout(() => container.style.display = "none", 1000);
            }, 500);
          }
        }

        // Start the hat animation
        showNextHat();

      })
      .catch(err => console.error("Failed to load loader:", err));
  }
}

customElements.define("site-loader", SiteLoader);
