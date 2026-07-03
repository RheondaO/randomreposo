    // component/agent-box.js
(function () {
    if (document.getElementById("bottom-agent-box")) return;

    const PROXY_URL = "https://taskade-bridge-6zkc.vercel.app/api/chat";
    const TASKADE_AGENT_ID = "01KWGASZ1PP57ENZTYPPST43XR";
    const TASKADE_SPACE_ID = "CFs3dPyCmejxQ5FP"; 
    
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
            <div class="msg-bot-welcome">Welcome! I am a friendly site agent trained directly on my admin's experience and expertise. Use the interface below to asks me questions!</div>
        </div>
        <div id="agent-starters-box">
            <button class="starter-btn" data-msg="?">[ Quick Start ]</button>
            <button class="starter-btn" data-msg="?">[ Meet the Admin ]</button>
            <button class="starter-btn" data-msg="?">[ Just Chat ]</button>
        </div>
        <div class="agent-input-container">
            <input type="text" id="agent-input-field" placeholder="Start Typing..."/>
            <button id="agent-send-trigger">Send</button>
        </div>
    `;

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "agent-toggle-btn";
    toggleBtn.innerHTML = "+"; 
    
    const title = document.createElement("span");
    title.className = "agent-title";
    title.textContent = "Toggle a Site Agent";

    <div class="help-container">
    <div class="help-tooltip"> 
 
        <h4>Manifestation Targets <br>in Annual Income (Post-Tax): </h4>
        <br><p><b>$333,888
        <br> $266,112
        <br> $198,336</b></p>
        <br><i>Gold Star if we define what that requires transparently.</i>
        <br>Open to Remote, 25%+ Travel, & Relocation opportunities</a>

    <div class="help-button">
    const badge = document.createElement("span");
    badge.className = "agent-badge";
    badge.textContent = "𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃";</div>
        </div>
    
    header.appendChild(toggleBtn);
    header.appendChild(title);
    header.appendChild(badge);
    
    boxContainer.appendChild(header);
    boxContainer.appendChild(contentContainer);

    const spacer = document.createElement("div");
    spacer.id = "agent-box-spacer";

    let isExpanded = false;
    boxContainer.classList.add('is-collapsed');
    spacer.classList.add('is-collapsed');
    
    toggleBtn.addEventListener("click", () => {
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
        loadingMsg.textContent = "~*Elevator Jazz*~";
        log.appendChild(loadingMsg);

        try {
            const res = await fetch(PROXY_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    prompt: text,
                    agentId: TASKADE_AGENT_ID,
                    spaceId: TASKADE_SPACE_ID
                })
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
            console.log("Sending to API:", JSON.stringify({ prompt: text, agentId: TASKADE_AGENT_ID, spaceID: TASKADE_SPACE_ID}));
            const res = await fetch(PROXY_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: text, agentId: TASKADE_AGENT_ID, spaceId: TASKADE_SPACE_ID })
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

    header.appendChild(badge);
    header.appendChild(helpTooltip);
})();
