// components/head.js
export function loadSharedHead({
  title = "AI Portfolio | Rheonda",
  description = "Rheonda's AI Portfolio – exploring AI agents, automation, and creative intelligence.",
} = {}) {
  const head = document.head;

  // Clear old head items except <base> and <script>
  const preserve = ["BASE", "SCRIPT"];
  [...head.children].forEach(child => {
    if (!preserve.includes(child.tagName)) child.remove();
  });

  // --- META + LINKS ---
  const metaCharset = Object.assign(document.createElement("meta"), {
    charset: "UTF-8",
  });

  const metaViewport = Object.assign(document.createElement("meta"), {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0",
  });

  const metaDescription = Object.assign(document.createElement("meta"), {
    name: "description",
    content: description,
  });

  const headTitle = document.createElement("title");
  headTitle.textContent = title;

  const favicon = Object.assign(document.createElement("link"), {
    rel: "icon",
    href: "folderder/favicon.png",
  });

  const fontLink = Object.assign(document.createElement("link"), {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap",
  });

  const mainCSS = Object.assign(document.createElement("link"), {
    rel: "stylesheet",
    href: "folderder/style.css",
  });

  head.append(metaCharset, metaViewport, metaDescription, headTitle, favicon, fontLink, mainCSS);

  // --- NAV & FOOTER MODULE LOADER ---
  document.addEventListener("DOMContentLoaded", () => {
    // Dynamically load nav and footer components
    import("./nav.js")
      .then(() => console.log("✅ Nav loaded"))
      .catch(err => console.error("❌ Failed to load nav:", err));

    import("./footer.js")
      .then(() => console.log("✅ Footer loaded"))
      .catch(err => console.error("❌ Failed to load footer:", err));
  });
}
