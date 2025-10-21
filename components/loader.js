// components/loader.js

export function showLoader(containerId = "loader-component", fadeDuration = 1000, displayTime = 2000) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Only show loader once per session
  if (sessionStorage.getItem("loaderShown")) {
    container.style.display = "none";
    return;
  }

  fetch("/loader.html")
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
      sessionStorage.setItem("loaderShown", "true");

      const loaderEl = container.querySelector(".loader");
      if (!loaderEl) return;

      // Make loader visible
      loaderEl.style.opacity = 1;
      loaderEl.style.transition = `opacity ${fadeDuration}ms`;

      // After displayTime, fade out
      setTimeout(() => {
        loaderEl.style.opacity = 0;
        // Remove loader from DOM after fade
        setTimeout(() => {
          container.style.display = "none";
        }, fadeDuration);
      }, displayTime);
    })
    .catch(err => console.error("Failed to load loader:", err));
}
