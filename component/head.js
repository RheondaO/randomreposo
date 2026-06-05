// /component/head.js
export function loadSharedHead({ title, description }) {
  document.title = title || "Sales Portfolio";

  document.documentElement.style.backgroundColor = "#ffffff";

  if (document.body) {
    document.body.style.backgroundColor = "#ffffff";
  }

  const headContent = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description || "Sales Portfolio showcasing Mutability"}" />
    
    <link rel="icon" type="image/png" href="./art/favicon.png" />
    <link rel="stylesheet" href="./art/style.css" />
  `;

  document.head.insertAdjacentHTML("beforeend", headContent);
  
  document.addEventListener("DOMContentLoaded", async () => {
   const { loadLoader } = await import("./loader.js");
   const { loadNav } = await import("./nav.js");
   const { loadFooter } = await import("./footer.js");
   
   loadLoader();
   loadNav();
   loadFooter();
});

  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded");
  } else {
    initComponents();
  }
}
