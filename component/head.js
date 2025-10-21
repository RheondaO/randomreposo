// /component/head.js
export function loadSharedHead({ title, description }) {
  // Set document title
  document.title = title || "AI Portfolio";

  // Define standard meta + link tags
  const headContent = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description || "AI Portfolio showcasing Rheonda’s AI and automation projects."}" />
    
    <link rel="icon" type="image/png" href="/art/favicon.png" />
    <link rel="stylesheet" href="/art/style.css" />
  `;

  // Append to <head>
  document.head.insertAdjacentHTML("beforeend", headContent);
}
