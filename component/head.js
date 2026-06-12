// /component/head.js

// /component/head.js
export function loadSharedHead({ title, description }) {
  document.title = title || "Sales Portfolio";
  
  // 1. Check right away if the loader should be skipped for this session
  const shouldSkipLoader = sessionStorage.getItem('hasVisited');
  if (!shouldSkipLoader) {
    sessionStorage.setItem('hasVisited', 'true');
  }

  // 2. Fixed font domains and added a class helper directly to HTML if skipping loader
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

  if (shouldSkipLoader) {
    document.documentElement.classList.add('skip-loader');
  }

  // 3. Keep your component loading logic intact
  document.addEventListener("DOMContentLoaded", async () => {
    const { loadNav } = await import("./nav.js");
    const { loadFooter } = await import("./footer.js");
    const { loadLoader } = await import("./loader.js");
    
    loadNav();
    loadFooter();
    
    // Only initialize the visible loader functions if it's the first visit
    if (!shouldSkipLoader) {
      loadLoader();
    } else {
      // Proactive safety fallback: hide your loader element if it exists in HTML DOM
      const loaderEl = document.querySelector('.loader-wrapper') || document.querySelector('#loader');
      if (loaderEl) loaderEl.style.display = 'none';
    }
  });
}

/* export function loadSharedHead({ title, description }) {
  document.title = title || "Sales Portfolio";

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

  document.addEventListener("DOMContentLoaded", async () => {
   const { loadNav } = await import("./nav.js");
   const { loadFooter } = await import("./footer.js");
   const { loadLoader } = await import("./loader.js");

    
    loadNav();
    loadFooter();
    loadLoader();
  });
} */
