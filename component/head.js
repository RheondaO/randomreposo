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
  
  async function initComponents() {
  try {
    // Start downloading all three files simultaneously over the network
    const [loaderMod, navMod, footerMod] = await Promise.all([
      import("./loader.js"),
      import("./nav.js"),
      import("./footer.js")
    ]);

    // Once all are downloaded, execute them cleanly
    loaderMod.loadLoader();
    navMod.loadNav();
    footerMod.loadFooter();
    
  } catch (error) {
    console.error("Error loading components:", error);
  }
}

  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded");
  } else {
    initComponents();
  }
}
