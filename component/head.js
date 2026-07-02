// component/head.js
export function loadSharedHead({ title, description }) {
  document.title = title || "Sales Portfolio";
  
  // 1. Guard check: Only insert head content if the stylesheet doesn't exist yet
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
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description || "Sales Portfolio showcasing Mutability");
  }

  // 2. Execution Wrapper: This fires off components safely
  const initializeComponents = async () => {
    try {
      // Import your framework layout modules in parallel
      const [
        { loadNav },
        { loadFooter },
        _ // This imports and registers 'site-loader' element lifecycle hooks automatically
      ] = await Promise.all([
        import("./nav.js"),
        import("./footer.js"),
        import("./loader.js")
      ]);

      // Execute layout injections
      loadNav();
      loadFooter();

// PLACE IT HERE: Dynamic script injection for the full-width bot tray
      if (!document.getElementById("bottom-agent-box")) {
        const trayScript = document.createElement("script");
        trayScript.src = "./component/agent-box.js";
        trayScript.defer = true;
        document.head.appendChild(trayScript);
      }


      
    } catch (error) {
      console.error("Failed to safely initialize dynamic modules:", error);
      // Failsafe rescue: Lift the CSS shield if a module fails to parse
      document.documentElement.classList.add('loader-initialized');
    }
  };

  // 3. READINESS CHECK: If the DOM is already parsed by the browser, execute immediately!
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeComponents);
  } else {
    initializeComponents();
  }
}
