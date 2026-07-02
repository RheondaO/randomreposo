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
        background-color: #f8f9fa;
        border-top: 3px solid #007bff;
        box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
        z-index: 999999;
        font-family: sans-serif;
    `;

    // 2. Add the header and the Taskade iframe
    boxContainer.innerHTML = `
        <div style="padding: 10px 20px; background-color: #ffffff; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: bold; color: #007bff; font-size: 14px;">
                🤖 Autonomous GTM Infrastructure Evaluation Agent
            </span>
            <span style="font-size: 11px; color: #64748b; font-style: italic;">
                Active System Layer
            </span>
        </div>
        <iframe 
            allow="clipboard-read; clipboard-write" 
            src="https://www.taskade.com/a/01KWGATDTJQG6668FVM21A6CNZ" 
            width="100%" 
            height="350" 
            frameborder="0" 
            allowfullscreen
            style="display: block;"
        ></iframe>
    `;

    // 3. Create a spacer at the bottom of the body so content isn't permanently hidden
    const spacer = document.createElement("div");
    spacer.style.height = "410px";

    // 4. Inject both elements cleanly into the live DOM
    document.body.appendChild(boxContainer);
    document.body.appendChild(spacer);
})();
