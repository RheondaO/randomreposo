// /component/head.js
export function loadSharedHead({ title, description }) {
  document.title = title || "Sales Portfolio";

  document.documentElement.style.backgroundColor = "#ffffff";


  const headContent = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description || "Sales Portfolio showcasing Mutability"}" />
    
    <link rel="icon" type="image/png" href="./art/favicon.png" />
    <link rel="stylesheet" href="./art/style.css" />
  `;

  if (!document.querySelector('link[href="./art/style.css"]')) {
  document.head.insertAdjacentHTML("beforeend", headContent);
}
  
async function initComponents() {

  const hasLoadedBefore = sessionStorage.getItem("portfolio-loaded");

  if (!hasLoadedBefore) {
    import("./loader.js").then(({ loadLoader }) => {
      loadLoader();
      sessionStorage.setItem("portfolio-loaded", "true");
    });
  
  } else {
    const loaderElement = document.getElementById("loadLoader");
    if (loaderElement) {
      loaderElement.style.display = "none";
    }

    if (document.body) {
    document.body.style.backgroundColor = "#ffffff";
  }
  }

  // 2. Kick off the navigation immediately without waiting for the loader
  import("./nav.js")
  .then(({ loadNav }) => loadNav())
  .catch(err => console.error("Nav failed:", err));

  // 3. Kick off the footer immediately
  import("./footer.js").then(({ loadFooter }) => loadFooter());
}

 if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initComponents);
  } else {
    initComponents();
  }
}
