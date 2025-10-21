// components/head.js

export function loadSharedHead({
  title = "AI Portfolio | Rheonda",
  description = "Rheonda's AI Portfolio – exploring AI agents, automation, and creative intelligence.",
  favicon = "folderder/favicon.png",
  css = "folderder/style.css",
  fonts = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
} = {}) {
  const head = document.head;

  // Update <title>
  document.title = title;

  // Update <meta name="description">
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    head.appendChild(metaDesc);
  }
  metaDesc.content = description;

  // Add favicon if not present
  if (!document.querySelector('link[rel="icon"]')) {
    const linkFavicon = document.createElement('link');
    linkFavicon.rel = "icon";
    linkFavicon.href = favicon;
    head.appendChild(linkFavicon);
  }

  // Add CSS if not present
  if (!document.querySelector(`link[href="${css}"]`)) {
    const linkCSS = document.createElement('link');
    linkCSS.rel = "stylesheet";
    linkCSS.href = css;
    head.appendChild(linkCSS);
  }

  // Add fonts if not present
  if (!document.querySelector(`link[href="${fonts}"]`)) {
    const linkFont = document.createElement('link');
    linkFont.rel = "stylesheet";
    linkFont.href = fonts;
    head.appendChild(linkFont);
  }
}
