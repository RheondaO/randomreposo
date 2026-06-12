// /component/head.js
export function loadSharedHead({ title, description }) {
  document.title = title || "Sales Portfolio";

  const headContent = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description || "Sales Portfolio showcasing Mutability"}" />
    
    <link rel="preconnect" href="https://googleapis.com">
    <link rel="preconnect" href="https://gstatic.com" crossorigin>

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
}
