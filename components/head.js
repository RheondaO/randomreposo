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

  // Meta, Title, Favicon
  const metaCharset = document.createElement("meta");
  metaCharset.setAttribute("charset", "UTF-8");

  const metaViewport = document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content = "width=device-width, initial-scale=1.0";

  const metaDescription = document.createElement("meta");
  metaDescription.name = "description";
  metaDescription.content = description;

  const headTitle = document.createElement("title");
  headTitle.textContent = title;

  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.href = "folderder/favicon.png";

  // Fonts
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Jersey+25&family=Open+Sans:ital,wdth,wght@0,88.8,333;1,88.8,333&display=swap";

  // Main CSS
  const mainCSS = document.createElement("link");
  mainCSS.rel = "stylesheet";
  mainCSS.href = "folderder/style.css";

  head.append(metaCharset, metaViewport, metaDescription, headTitle, favicon, fontLink, mainCSS);

  // Load nav/footer modules after DOM ready
  document.addEventListener("DOMContentLoaded", async () => {
    await import("components/nav.js");
    await import("components/footer.js");
  });
}
