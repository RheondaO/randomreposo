// component/agent-box.js
(function () {
    if (document.getElementById("bottom-agent-box")) return;

    const PROXY_URL = "https://taskade-bridge-6zkc.vercel.app/api/chat";

    // 1. Create the container div
    const boxContainer = document.createElement("div");
    boxContainer.id = "bottom-agent-box";

    // 2. Create header with toggle button
    const header = document.createElement("div");
    header.className = "agent-header";

    // 3. Create content container
    const contentContainer = document.createElement("div");
    contentContainer.id = "agent-content";
    contentContainer.innerHTML = `
        <!-- Chat History Log View -->
        <div id="agent-chat-log">
            <div class="msg-bot-welcome">
                Welcome to my autonomous systems portfolio layer. I am an AI agent trained directly on Rheonda’s expertise. Ask me an engineering evaluation question or click an organizational risk vector below.
            </div>
        </div>
        <!-- System Quick Starters Box -->
        <div id="agent-starters-box">
            <button class="starter-btn" data-msg="What is the compounding operational tax on our core technical team if we delay hiring a developer-turned-GTM operator?">[ RISK: ENG VELOCITY ]</button>
            <button class="starter-btn" data-msg="If we do not deploy an automated, dual-track outbound framework immediately, how much capitalized market share do we risk bleeding?">[ RISK: MARKET CAPTURE ]</button>
            <button class="starter-btn" data-msg="What happens to our institutional valuation tracking if our early commercial data layer isn't structured to survive Series A due diligence?">[ RISK: DUE DILIGENCE ]</button>
        </div>
        <!-- Native Prompt Input -->
        <div class="agent-input-container">
            <input type="text" id="agent-input-field" placeholder="Query the system infrastructure..." />
            <button id="agent-send-trigger">Send</button>
        </div>
    `;

    // Toggle button (left side)
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "agent-toggle-btn";
    toggleBtn.innerHTML = "−";

    // Title (center)
    const title = document.createElement("span");
    title.className = "agent-title";
    title.textContent = "🤖 Autonomous GTM Infrastructure Agent";

    // Status badge (right side)
    const badge = document.createElement("span");
    badge.className = "agent-badge";
    badge.textContent = "Active System";

    header.appendChild(toggleBtn);
    header.appendChild(title);
    header.appendChild(badge);

    // Assemble box
    boxContainer.appendChild(header);
    boxContainer.appendChild(contentContainer);

    // 4. Create a spacer at the bottom of the body
    const spacer = document.createElement("div");
    spacer.id = "agent-box-spacer";

    // 5. Toggle functionality
    let isExpanded = true;
    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        // Toggle states simultaneously on both components via the class list
        boxContainer.classList.toggle('is-collapsed', !isExpanded);
        spacer.classList.toggle('is-collapsed', !isExpanded);
        
        toggleBtn.innerHTML = isExpanded ? '−' : '+';
    });

    // 6. API Messaging Engine Configuration
    const log = boxContainer.querySelector("#agent-chat-log");
    const input = boxContainer.querySelector("#agent-input-field");
    const sendBtn = boxContainer.querySelector("#agent-send-trigger");

    async function handleMessage(text) {
        if (!text.trim()) return;

        // Display user message bubble natively
        const userMsg = document.createElement("div");
        userMsg.className = "msg-user";
        userMsg.textContent = text;
        log.appendChild(userMsg);
        log.scrollTop = log.scrollHeight;
        input.value = "";

        // Display minimalist typing state
        const loadingMsg = document.createElement("div");
        loadingMsg.className = "msg-loading";
        loadingMsg.textContent = "Analyzing system parameters...";
        log.appendChild(loadingMsg);
        log.scrollTop = log.scrollHeight;

        try {
            const res = await fetch(PROXY_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            loadingMsg.remove();

            // Display clear black & white bot reply
            const botMsg = document.createElement("div");
            botMsg.className = "msg-bot-welcome"; // Reuses structural bubble properties
            botMsg.textContent = data.reply;
            log.appendChild(botMsg);
        } catch (error) {
            loadingMsg.remove();
            
            const errorMsg = document.createElement("div");
            errorMsg.className = "msg-error";
            errorMsg.textContent = "System Error: Unable to establish link to operational layer.";
            log.appendChild(errorMsg);
            console.error("Agent Box Fetch Error:", error);
        }
        log.scrollTop = log.scrollHeight;
    }

    // Attach DOM Action Listeners
    sendBtn.addEventListener("click", () => handleMessage(input.value));
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleMessage(input.value);
    });

    boxContainer.querySelectorAll(".starter-btn").forEach(btn => {
        btn.addEventListener("click", () => handleMessage(btn.getAttribute("data-msg")));
    });

    // Safely mount elements
    function mountAgentBox() {
        if (!document.body) {
            window.addEventListener('DOMContentLoaded', mountAgentBox);
            return;
        }
        if (document.getElementById("bottom-agent-box")) return;
        
        document.body.appendChild(boxContainer);
        if (typeof spacer !== 'undefined') {
            document.body.appendChild(spacer);
        }
    }
    mountAgentBox();
})();
