// components/head.js

export function loadSharedHead({
  title = "AI Portfolio | Rheonda",
  description = "Rheonda's AI Portfolio – exploring AI agents, automation, and creative intelligence.",
} = {}) {
  const head = document.head;

  // --- Clear old head items except base HTML tags ---
  const preserve = ["BASE", "SCRIPT"];
  [...head.children].forEach(child => {
    if (!preserve.includes(child.tagName)) child.remove();
  });

  // --- Meta Charset ---
  const metaCharset = document.createElement("meta");
  metaCharset.setAttribute("charset", "UTF-8");

  // --- Viewport Meta ---
  const metaViewport = document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content = "width=device-width, initial-scale=1.0";

  // --- Description Meta ---
  const metaDescription = document.createElement("meta");
  metaDescription.name = "description";
  metaDescription.content = description;

  // --- Favicon ---
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.href = "/folderder/favicon.png";

  // --- Title ---
  const headTitle = document.createElement("title");
  headTitle.textContent = title;

  // --- Fonts (example: Google Fonts) ---
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Jersey+25&family=Open+Sans:ital,wdth,wght@0,88.8,333;1,88.8,333&display=swap";

  // --- Main CSS ---
  const mainCSS = document.createElement("link");
  mainCSS.rel = "stylesheet";
  mainCSS.href = "folderder/style.css";

  // --- Optional JS (for nav/footer components) ---
  const navComponent = document.createElement("script");
  navComponent.type = "module";
  navComponent.src = "/components/nav.js";

  const footerComponent = document.createElement("script");
  footerComponent.type = "module";
  footerComponent.src = "/components/footer.js";

  // --- Append all elements to <head> ---
  head.append(
    metaCharset,
    metaViewport,
    metaDescription,
    favicon,
    fontLink,
    mainCSS,
    headTitle,
    navComponent,
    footerComponent
  );
}
