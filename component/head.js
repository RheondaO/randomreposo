export function loadSharedHead({ title, description }) {
  document.title = title || "Sales Portfolio";

  // 1. Guard check: Only insert if the stylesheet doesn't exist yet
  if (!document.querySelector('link[href="./art/style.css"]')) {
    const headContent = `
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="${description || "Sales Portfolio showcasing Mutability"}" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Jersey+25&family=Open+Sans:ital,wdth,wght@0,88.8,333;1,88.8,333&display=swap" rel="stylesheet">
      <link rel="icon" type="image/png" href="./art/favicon.png" />
      <link rel="stylesheet" href="./art/style.css" />
    `;
    document.head.insertAdjacentHTML("beforeend", headContent);
  } else {
    // 2. Optimization: If style exists, just update the meta tags that actually change
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description || "Sales Portfolio showcasing Mutability");
  }

  // Handle session loader checks
  const shouldSkipLoader = sessionStorage.getItem('hasVisited');
  if (!shouldSkipLoader) {
    sessionStorage.setItem('hasVisited', 'true');
  } else {
    document.documentElement.classList.add('skip-loader');
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const { loadNav } = await import("./nav.js");
    const { loadFooter } = await import("./footer.js");
    const { loadLoader } = await import("./loader.js");
    
    loadNav();
    loadFooter();
    
    if (!shouldSkipLoader) {
      loadLoader();
    } else {
      const loaderEl = document.querySelector('.loader-wrapper') || document.querySelector('#loader');
      if (loaderEl) loaderEl.style.display = 'none';
    }
  });
}
