// /component/head.js
export function loadSharedHead({ title, description }) {
  document.title = title || "Sales Portfolio";

  const headContent = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description || "Sales Portfolio showcasing Mutability"}" />
    
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
}

/* export function loadSharedHead({ title, description }) {
  document.title = title || "Sales Portfolio";
  
  // 1. Guard check: Only insert if the stylesheet doesn't exist yet
  if (!document.querySelector('link[href="./art/style.css"]')) {
    const headContent = `
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="description" content="${description || "Sales Portfolio showcasing Mutability"}"/>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Jersey+25&family=Open+Sans:ital,wdth,wght@0,88.8,333;1,88.8,333&display=swap" rel="stylesheet">
      <link rel="icon" type="image/png" href="./art/favicon.png"/>
      <link rel="stylesheet" href="./art/style.css"/>
    `;
    document.head.insertAdjacentHTML("beforeend", headContent);
  } else {
    // 2. Optimization: If style exists, just update the meta tags that actually change
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description || "Sales Portfolio showcasing Mutability");
  }
  
  // Handle session loader checks - ONLY ON INDEX
  const isIndexPage = window.location.pathname === "/" || 
                      window.location.pathname.endsWith("index.html");
  
  const shouldShowLoader = isIndexPage && !sessionStorage.getItem('hasVisited');
  
  if (shouldShowLoader) {
    sessionStorage.setItem('hasVisited', 'true');
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    const { loadNav } = await import("./nav.js");
    const { loadFooter } = await import("./footer.js");
    const { loadLoader } = await import("./loader.js");
    
    loadNav();
    loadFooter();
    
    // ✅ Load loader ONLY on index, ONLY if first visit
    if (shouldShowLoader) {
      loadLoader(); // First visit: hats animation
    } else if (isIndexPage) {
      loadLoader(); // Return visit: quick ring only
    }
    // Other pages: no loader at all

  });
}

    */
