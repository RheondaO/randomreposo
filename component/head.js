// /component/head.js
export function loadSharedHead({ title, description }) {
  document.title = title || "AI Portfolio";

  const headContent = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description || "AI Portfolio showcasing Rheonda’s AI and automation projects."}" />
    
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
}
