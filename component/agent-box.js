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
            <button class="starter-btn" data-msg="/quick-start">[ QUICK START ]</button>
            <button class="starter-btn" data-msg="/meet-the-admin">[ MEET THE ADMIN ]</button>
            <button class="starter-btn" data-msg="/meet-the-saleshub-manager">[ MEET THE SALESHUB MANAGER ]</button>
            <button class="starter-btn" data-msg="/just-chat">[ JUST CHAT ]</button>
            <button class="starter-btn" data-msg="/feeling-lucky">[ FEELING LUCKY ]</button>
            <button class="starter-btn" data-msg="/i-d-k">[ NOT SURE? ]</button>
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

    // 4. Create the Tooltip & Badge Component securely
    const helpContainer = document.createElement("div");
    helpContainer.className = "help-container";
    helpContainer.innerHTML = `
        <div class="help-tooltip"> 
            <h4>Manifestation Targets <br>in Annual Income (Post-Tax): </h4>
            <br><p><b>$333,888<br> $266,112<br> $198,336</b></p>
            <br><i>Gold Star if we define what that requires transparently.</i>
            <br>Open to Remote, 25%+ Travel, & Relocation opportunities
        </div>
        <div class="help-button">𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃</div>
    `;
    
    // Assemble the header
    header.appendChild(toggleBtn);
    header.appendChild(title);
    header.appendChild(helpContainer);
    
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
            const res = await fetch(PROXY_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    prompt: "Hello", // Replaced undefined variable reference with a standard initial greeting
                    agentId: TASKADE_AGENT_ID, 
                    spaceId: TASKADE_SPACE_ID 
                })
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
