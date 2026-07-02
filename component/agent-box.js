// component/agent-box.js
(function () {
    if (document.getElementById("bottom-agent-box")) return;

    const PROXY_URL = "https://taskade-bridge-6zkc.vercel.app/api/chat";
    const TASKADE_AGENT_ID = "01KWGATDTJQG6668FVM21A6CNZ";
    
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
        <div id="agent-chat-log">
            <div class="msg-bot-welcome">Initializing system handshake...</div>
        </div>
        <div id="agent-starters-box">
            <button class="starter-btn" data-msg="What is the compounding operational tax on our core technical team if we delay hiring a developer-turned-GTM operator?">[ RISK: ENG VELOCITY ]</button>
            <button class="starter-btn" data-msg="If we do not deploy an automated, dual-track outbound framework immediately, how much capitalized market share do we risk bleeding?">[ RISK: MARKET CAPTURE ]</button>
            <button class="starter-btn" data-msg="What happens to our institutional valuation tracking if our early commercial data layer isn't structured to survive Series A due diligence?">[ RISK: DUE DILIGENCE ]</button>
        </div>
        <div class="agent-input-container">
            <input type="text" id="agent-input-field" placeholder="Query the system infrastructure..." />
            <button id="agent-send-trigger">Send</button>
        </div>
    `;

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "agent-toggle-btn";
    toggleBtn.innerHTML = "−";
    const title = document.createElement("span");
    title.className = "agent-title";
    title.textContent = "🤖 Autonomous GTM Infrastructure Agent";
    const badge = document.createElement("span");
    badge.className = "agent-badge";
    badge.textContent = "Active System";

    header.appendChild(toggleBtn);
    header.appendChild(title);
    header.appendChild(badge);
    boxContainer.appendChild(header);
    boxContainer.appendChild(contentContainer);

    const spacer = document.createElement("div");
    spacer.id = "agent-box-spacer";

    let isExpanded = true;
    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        boxContainer.classList.toggle('is-collapsed', !isExpanded);
        spacer.classList.toggle('is-collapsed', !isExpanded);
        toggleBtn.innerHTML = isExpanded ? '−' : '+';
    });

    const log = boxContainer.querySelector("#agent-chat-log");
    const input = boxContainer.querySelector("#agent-input-field");
    const sendBtn = boxContainer.querySelector("#agent-send-trigger");

    async function handleMessage(text) {
        if (!text.trim()) return;
        const userMsg = document.createElement("div");
        userMsg.className = "msg-user";
        userMsg.textContent = text;
        log.appendChild(userMsg);
        log.scrollTop = log.scrollHeight;
        input.value = "";

        const loadingMsg = document.createElement("div");
        loadingMsg.className = "msg-loading";
        loadingMsg.textContent = "Analyzing system parameters...";
        log.appendChild(loadingMsg);

        try {
            const res = await fetch(PROXY_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: text,
                    agentId: TASKADE_AGENT_ID 
                }) // <--- Fixed Syntax Error here
            });
            const data = await res.json();
            loadingMsg.remove();
            const botMsg = document.createElement("div");
            botMsg.className = "msg-bot-welcome";
            botMsg.textContent = data.reply;
            log.appendChild(botMsg);
        } catch (error) {
            loadingMsg.remove();
            const errorMsg = document.createElement("div");
            errorMsg.className = "msg-error";
            errorMsg.textContent = "System Error: Unable to establish link.";
            log.appendChild(errorMsg);
        }
        log.scrollTop = log.scrollHeight;
    }

    async function fetchAgentGreeting() {
        try {
            const res = await fetch(PROXY_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "Hello", agentId: TASKADE_AGENT_ID })
            });
            const data = await res.json();
            const staticMsg = log.querySelector(".msg-bot-welcome");
            if (staticMsg) staticMsg.remove();
            const botMsg = document.createElement("div");
            botMsg.className = "msg-bot-welcome";
            botMsg.textContent = data.reply;
            log.appendChild(botMsg);
        } catch (error) {
            console.error("Initialization failed:", error);
        }
    }

    // Initialize
    document.body.appendChild(boxContainer);
    document.body.appendChild(spacer);
    fetchAgentGreeting();

    sendBtn.addEventListener("click", () => handleMessage(input.value));
    input.addEventListener("keypress", (e) => { if (e.key === "Enter") handleMessage(input.value); });
    boxContainer.querySelectorAll(".starter-btn").forEach(btn => {
        btn.addEventListener("click", () => handleMessage(btn.getAttribute("data-msg")));
    });
})();
