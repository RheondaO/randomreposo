// component/agent-box.js
(function () {
    // Safety check: Don't inject if it somehow bypassed the head.js guard 
    if (document.getElementById("bottom-agent-box")) return;

    // YOUR VERCEL PROXY URL HERE
    const PROXY_URL = "https://taskade-bridge-6zkc.vercel.app/api/chat";

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
        z-index: 8888;
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

    // 3. Create content container (Replace your current Section 3)
const contentContainer = document.createElement("div");
contentContainer.id = "agent-content";
contentContainer.style.cssText = `
    height: 350px;
    overflow: hidden;
    transition: all 0.3s ease;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
`;

contentContainer.innerHTML = `
    <!-- Chat History Log View -->
    <div id="agent-chat-log" style="flex: 1; overflow-y: auto; padding: 20px; background-color: #ffffff; display: flex; flex-direction: column; gap: 12px; font-size: 13px; line-height: 1.6; border-bottom: 1px solid #e0e0e0;">
        <div style="color: #000000; background: #f5f5f5; padding: 10px 14px; border-radius: 2px; align-self: flex-start; max-width: 80%; border-left: 3px solid #000000;">
            Welcome to my autonomous systems portfolio layer. I am an AI agent trained directly on Rheonda’s expertise. Ask me an engineering evaluation question or click an organizational risk vector below.
        </div>
    </div>

    <!-- System Quick Starters Box -->
    <div id="agent-starters-box" style="display: flex; gap: 8px; padding: 8px 20px; background: #fafafa; overflow-x: auto; white-space: nowrap; border-bottom: 1px solid #eeeeee;">
        <button class="starter-btn" data-msg="What is the compounding operational tax on our core technical team if we delay hiring a developer-turned-GTM operator?" style="background: #ffffff; border: 1px solid #000000; color: #000000; padding: 6px 12px; font-size: 11px; cursor: pointer; font-weight: 600;">[ RISK: ENG VELOCITY ]</button>
        <button class="starter-btn" data-msg="If we do not deploy an automated, dual-track outbound framework immediately, how much capitalized market share do we risk bleeding?" style="background: #ffffff; border: 1px solid #000000; color: #000000; padding: 6px 12px; font-size: 11px; cursor: pointer; font-weight: 600;">[ RISK: MARKET CAPTURE ]</button>
        <button class="starter-btn" data-msg="What happens to our institutional valuation tracking if our early commercial data layer isn't structured to survive Series A due diligence?" style="background: #ffffff; border: 1px solid #000000; color: #000000; padding: 6px 12px; font-size: 11px; cursor: pointer; font-weight: 600;">[ RISK: DUE DILIGENCE ]</button>
    </div>

    <!-- Native Prompt Input -->
    <div style="display: flex; background: #ffffff; padding: 0;">
        <input type="text" id="agent-input-field" placeholder="Query the system infrastructure..." style="flex: 1; border: none; padding: 16px 24px; font-size: 13px; outline: none; color: #000000;" />
        <button id="agent-send-trigger" style="background: #000000; color: #ffffff; border: none; padding: 0 32px; font-size: 12px; font-weight: bold; cursor: pointer; text-transform: uppercase; letter-spacing: 1px;">Send</button>
    </div>
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


    // 3. Assemble box
    boxContainer.appendChild(header);
    boxContainer.appendChild(contentContainer);

    // 4. Create a spacer at the bottom of the body so content isn't permanently hidden
    const spacer = document.createElement("div");
    spacer.id = "agent-box-spacer";
    spacer.style.cssText = `
        height: 414px;
        transition: all 0.3s ease;
    `;

    // 5. Toggle functionality
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
            spacer.style.height = '72px';
            toggleBtn.innerHTML = '+';
        }
    });

    // 6 API Messaging Engine Configuration
    const PROXY_URL = "https://taskade-bridge-6zkc.vercel.app/api/chat"; // Your Vercel production domain
    const log = boxContainer.querySelector("#agent-chat-log");
    const input = boxContainer.querySelector("#agent-input-field");
    const sendBtn = boxContainer.querySelector("#agent-send-trigger");

    async function handleMessage(text) {
        if (!text.trim()) return;

        // Display user message bubble natively
        const userMsg = document.createElement("div");
        userMsg.style.cssText = "color: #ffffff; background: #000000; padding: 10px 14px; border-radius: 2px; align-self: flex-end; max-width: 80%; text-align: left;";
        userMsg.textContent = text;
        log.appendChild(userMsg);
        log.scrollTop = log.scrollHeight;
        input.value = "";

        // Display minimalist typing state
        const loadingMsg = document.createElement("div");
        loadingMsg.style.cssText = "color: #666666; font-style: italic; align-self: flex-start; font-size: 12px; padding: 4px 14px;";
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

            // Display clear black & white bot markdown reply
            const botMsg = document.createElement("div");
            botMsg.style.cssText = "color: #000000; background: #f5f5f5; padding: 10px 14px; border-radius: 2px; align-self: flex-start; max-width: 80%; border-left: 3px solid #000000;";
            botMsg.textContent = data.reply;
            log.appendChild(botMsg);
        } catch (err) {
            loadingMsg.textContent = "Connection error. Protocol failed.";
        }
        log.scrollTop = log.scrollHeight;
    }

    // Attach DOM Action Listeners
    sendBtn.addEventListener("click", () => handleMessage(input.value));
    input.addEventListener("keypress", (e) => { if (e.key === "Enter") handleMessage(input.value); });
    
    boxContainer.querySelectorAll(".starter-btn").forEach(btn => {
        btn.addEventListener("click", () => handleMessage(btn.getAttribute("data-msg")));
    });

    // 6. Inject both elements cleanly into the live DOM
    document.body.appendChild(boxContainer);
    document.body.appendChild(spacer);
})();
