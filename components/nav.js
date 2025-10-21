// components/nav.js
class SiteNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        nav {
          background: #0b0b0b;
          padding: 1rem 0;
          font-family: 'Arial', sans-serif;
        }

        .nav-container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          color: #ffffff;
          font-size: 1.3rem;
          font-weight: bold;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 1.5rem;
        }

        .nav-links a {
          color: #ddd;
          text-decoration: none;
          text-transform: capitalize;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: #8a2be2; /* violet accent */
        }

        /* Optional: Responsive (stack links on small screens) */
        @media (max-width: 600px) {
          .nav-container {
            flex-direction: column;
            gap: 0.5rem;
          }

          .nav-links {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }
        }
      </style>

      <nav>
        <div class="nav-container">
          <a href="index.html" class="logo">ai portfolio</a>
          <ul class="nav-links">
            <li><a href="index.html">home</a></li>
            <li><a href="knowledge_base_page.html">knowledgebase</a></li>
            <li><a href="agent_library.html">agent library</a></li>
            <li><a href="the_lab_page.html">the lab</a></li>
            <li><a href="contact_page.html">contact</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
}

customElements.define('site-nav', SiteNav);
