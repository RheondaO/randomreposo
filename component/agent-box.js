// component/agent-box.js
(function () {
    // Safety check: Don't inject if it somehow bypassed the head.js guard
    if (document.getElementById("bottom-agent-box")) return;

    // 1. Create the container div
    const boxContainer = document.createElement("div");
    boxContainer.id = "bottom-agent-box";
    boxContainer.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #ffffff;
        border-top: 4px solid #000000;
        box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);
        z-index: 999999;
        font-family: "Open Sans", sans-serif;
        font-optical-sizing: auto;
        font-weight: 333;
        font-style: normal;
        font-variation-settings: "wdth" 88.8;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
    `;

    // 2. Create header with toggle button
    const header = document.createElement("div");
    header.style.cssText = `
        padding: 1rem;
        background-color: #000000;
        color: #ffffff;
        border-bottom: 4px solid #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        gap: 2rem;
    `;

    // Toggle button (left side)
    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = "−";
    toggleBtn.style.cssText = `
        position: absolute;
        left: 1.5rem;
        width: 40px;
        height: 40px;
        border: 3px solid #ffffff;
        background-color: #000000;
        color: #ffffff;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        font-family: "Jersey 25", sans-serif;
    `;

    toggleBtn.addEventListener('mouseover', () => {
        toggleBtn.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.3), 0 0 40px rgba(0, 191, 255, 0.2)';
        toggleBtn.style.transform = 'scale(1.05)';
    });

    toggleBtn.addEventListener('mouseout', () => {
        toggleBtn.style.boxShadow = 'none';
        toggleBtn.style.transform = 'scale(1)';
    });

    // Title (center)
    const title = document.createElement("span");
    title.textContent = "🤖 Autonomous GTM Infrastructure Agent";
    title.style.cssText = `
        font-family: "Jersey 25", sans-serif;
        font-weight: 400;
        font-size: 1.2rem;
        color: #ffffff;
        text-align: center;
        flex: 1;
    `;

    // Status badge (right side)
    const badge = document.createElement("span");
    badge.textContent = "Active System";
    badge.style.cssText = `
        position: absolute;
        right: 1.5rem;
        font-size: 0.85rem;
        color: #ffffff;
        background: transparent;
        border: 2px solid #ffffff;
        padding: 0.25rem 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    `;

    header.appendChild(toggleBtn);
    header.appendChild(title);
    header.appendChild(badge);

    // 3. Create content container
    const contentContainer = document.createElement("div");
    contentContainer.id = "agent-content";
    contentContainer.style.cssText = `
        height: 350px;
        overflow: hidden;
        transition: all 0.3s ease;
        background-color: #ffffff;
    `;

    contentContainer.innerHTML = `
        <iframe 
            allow="clipboard-read; clipboard-write" 
            src="https://www.taskade.com/a/01KWGATDTJQG6668FVM21A6CNZ" 
            width="100%" 
            height="350" 
            frameborder="0" 
            allowfullscreen
            style="display: block; border: none;"
        ></iframe>
    `;

    // 4. Assemble box
    boxContainer.appendChild(header);
    boxContainer.appendChild(contentContainer);

    // 5. Create a spacer at the bottom of the body so content isn't permanently hidden
    const spacer = document.createElement("div");
    spacer.id = "agent-box-spacer";
    spacer.style.cssText = `
        height: 414px;
        transition: all 0.3s ease;
    `;

    // 6. Toggle functionality
    let isExpanded = true;

    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;

        if (isExpanded) {
            // Expand
            contentContainer.style.height = '350px';
            spacer.style.height = '414px';
            toggleBtn.innerHTML = '−';
            boxContainer.style.bottom = '0';
        } else {
            // Collapse
            contentContainer.style.height = '0px';
            spacer.style.height = '0px';
            toggleBtn.innerHTML = '+';
        }
    });

    // 7. Inject both elements cleanly into the live DOM
    document.body.appendChild(boxContainer);
    document.body.appendChild(spacer);
})();
