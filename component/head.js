// /component/head.js

export function loadSharedHead({ title, description }) {
  document.title = title || "Sales Portfolio";
  const headContent = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description || "Sales Portfolio showcasing Mutability"}" />
    
    <style>
      body {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s ease-out;
      }
      .loading-screen {
        visibility: visible !important;
        opacity: 1 !important;
      }
    </style>
    
    <link rel="icon" type="image/png" href="./art/favicon.png" />
    <link rel="stylesheet" href="./art/style.css" />
  `;
  document.head.insertAdjacentHTML("beforeend", headContent);

  const loadComponents = async () => {
    try {
      const [{ loadNav }, { loadFooter }, { loadLoader }] = await Promise.all([
        import("./nav.js"),
        import("./footer.js"),
        import("./loader.js")
      ]);
      
      loadNav();
      loadFooter();
      loadLoader(); // This now triggers body reveal when complete
      
    } catch (error) {
      console.error("Error loading components:", error);
      document.body.style.visibility = "visible";
      document.body.style.opacity = "1";
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadComponents);
  } else {
    loadComponents();
  }
}
      
      // Start loader immediately (shows while others load)
      loadLoader();
      
      // Load nav and footer in background (silently, while loader visible)
      loadNav();
      loadFooter();
      
      // Reveal body when loader fade-out completes
      // (assumes loadLoader() animates for ~1-2 seconds)
      setTimeout(() => {
        document.body.style.visibility = "visible";
        document.body.style.opacity = "1";
      }, 2000); // Adjust timing to match your loader animation duration
      
    } catch (error) {
      console.error("Error loading components:", error);
      document.body.style.visibility = "visible";
      document.body.style.opacity = "1";
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadComponents);
  } else {
    loadComponents();
  }
}

/*
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
*/
