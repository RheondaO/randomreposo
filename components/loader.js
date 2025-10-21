// components/loader.js

class SiteLoader extends HTMLElement {
  connectedCallback() {
    const container = this;

    // Only show once per session
    if (sessionStorage.getItem("loaderShown")) {
      container.style.display = "none";
      return;
    }

    fetch("/components/loader.html")
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
        sessionStorage.setItem("loaderShown", "true");

        const loaderEl = container.querySelector(".loader");
        if (!loaderEl) return;

        // Initial style for fade-in
        loaderEl.style.opacity = 1;
        loaderEl.style.transition = "opacity 1s";

        // Fade out after 2 seconds (adjust as needed)
        setTimeout(() => {
          loaderEl.style.opacity = 0;
          setTimeout(() => {
            container.style.display = "none";
          }, 1000); // match transition duration
        }, 2000);
      })
      .catch(err => console.error("Failed to load loader:", err));
  }
}

// Register the custom element
customElements.define("site-loader", SiteLoader);
