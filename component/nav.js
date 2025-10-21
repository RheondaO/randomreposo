// /component/nav.js
export function loadNav() {
  document.getElementById("nav").innerHTML = `
    <nav>
      <a href="/index.html">Home</a>
      <a href="/knowledgebase.html">Knowledgebase</a>
      <a href="/agentlibrary.html">Agent Library</a>
      <a href="/thelab.html">The Lab</a>
      <a href="/contact.html">Contact</a>
    </nav>
  `;
}
