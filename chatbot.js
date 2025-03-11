document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.createElement("div");
    chatContainer.id = "chatbot-container";
    chatContainer.innerHTML = `
        <div id="chat-header">AI Assistant</div>
        <div id="chat-body"></div>
        <div id="chat-input">
            <input type="text" id="user-input" placeholder="Ask me anything...">
            <button id="send-btn">Send</button>
            <button id="voice-btn">🎤</button>
        </div>
    `;
    document.body.appendChild(chatContainer);
    
    const chatBody = document.getElementById("chat-body");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const voiceBtn = document.getElementById("voice-btn");

    function appendMessage(sender, message) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add(sender);
        msgDiv.textContent = message;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function getAIResponse(userMessage) {
        appendMessage("user", userMessage);
        try {
            const response = await fetch("#", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "#"
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{role: "user", content: userMessage}]
                })
            });
            const data = await response.json();
            const aiMessage = data.choices[0].message.content;
            appendMessage("ai", aiMessage);
            speakText(aiMessage);
        } catch (error) {
            appendMessage("ai", "Sorry, I couldn't process that.");
        }
    }

    sendBtn.addEventListener("click", () => {
        if (userInput.value.trim()) {
            getAIResponse(userInput.value.trim());
            userInput.value = "";
        }
    });

    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && userInput.value.trim()) {
            getAIResponse(userInput.value.trim());
            userInput.value = "";
        }
    });

    function startVoiceRecognition() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            getAIResponse(transcript);
        };
    }

    voiceBtn.addEventListener("click", startVoiceRecognition);

    function speakText(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
    }
});
