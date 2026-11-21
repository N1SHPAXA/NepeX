
const input = document.getElementById("userInput");
const chatbox = document.getElementById("chatbox");
const welcome = document.getElementById("welcome");
const toast = document.getElementById("toast");
const history = document.getElementById("history");

let chats = JSON.parse(localStorage.getItem("miniAIChats")) || [];
let activeChatId = null;

// SAVE CHATS
function saveChats() {
    localStorage.setItem("miniAIChats", JSON.stringify(chats));
}

// FIND ACTIVE CHAT
function getActiveChat() {
    return chats.find(chat => chat.id === activeChatId);
}

// NOTIFICATIONS
function showFeature(feature) {
    toast.textContent = feature + " — Under Construction 🚧";
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// SIDEBAR
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("hidden");
}

// DISPLAY MESSAGE
function addMessage(text, type) {
    const message = document.createElement("div");

    message.className = "message " + type;
    message.textContent = text;

    chatbox.appendChild(message);

    document.getElementById("chatArea").scrollTop =
        document.getElementById("chatArea").scrollHeight;
}

// RENDER CHAT HISTORY
function renderHistory() {
    history.innerHTML = "";

    chats.slice().reverse().forEach(chat => {

        const item = document.createElement("button");

        item.className = "history-item";
        item.textContent = "✦ " + chat.title;

        item.style.width = "100%";
        item.style.textAlign = "left";
        item.style.background = chat.id === activeChatId
            ? "#303030"
            : "transparent";
        item.style.border = "none";
        item.style.cursor = "pointer";

        item.onclick = () => openChat(chat.id);

        history.appendChild(item);
    });
}

// OPEN OLD CHAT
function openChat(id) {

    const chat = chats.find(c => c.id === id);

    if (!chat) return;

    activeChatId = id;

    chatbox.innerHTML = "";

    welcome.style.display = "none";

    chat.messages.forEach(message => {
        addMessage(
            message.text,
            message.type
        );
    });

    renderHistory();

    input.value = "";
}

// CREATE NEW CHAT
function newChat() {

    activeChatId = null;

    chatbox.innerHTML = "";

    welcome.style.display = "block";

    input.value = "";

    renderHistory();

    showFeature("New chat ready");
}

// CHATBOT KNOWLEDGE
function getAnswer(question) {

    if (question.includes("hello") || question.includes("hi")) {
        return "Hello! How can I help you?";
    }

    else if (question.includes("html")) {
        return "HTML is used to create the structure of websites.";
    }

    else if (question.includes("css")) {
        return "CSS is used to design and style websites.";
    }

    else if (question.includes("javascript")) {
        return "JavaScript makes websites interactive.";
    }

    else if (question.includes("who are you")) {
        return "I am your personal Mini AI chatbot!";
    }

    else {
        return "I don't know that yet. Teach me something new!";
    }
}

// SEND MESSAGE
function sendMessage() {

    let question = input.value.trim();

    if (question === "") return;

    // CREATE A CHAT IF NECESSARY
    if (!activeChatId) {

        activeChatId = Date.now().toString();

        const newChatData = {
            id: activeChatId,
            title: question.slice(0, 28),
            messages: []
        };

        chats.push(newChatData);
    }

    let chat = getActiveChat();

    // SAVE USER MESSAGE
    chat.messages.push({
        text: question,
        type: "user-message"
    });

    welcome.style.display = "none";

    addMessage(question, "user-message");

    input.value = "";

    // GENERATE ANSWER
    const answer = getAnswer(question);

    setTimeout(() => {

        // SAVE AI RESPONSE
        chat.messages.push({
            text: answer,
            type: "ai-message"
        });

        addMessage(answer, "ai-message");

        saveChats();
        renderHistory();

    }, 300);

    saveChats();
    renderHistory();
}

// SUGGESTIONS
function useSuggestion(question) {
    input.value = question;
    sendMessage();
}

// ENTER TO SEND
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }

});

// AUTO EXPAND INPUT
input.addEventListener("input", function() {

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

});

// LOAD PREVIOUS CHATS WHEN WEBSITE OPENS
renderHistory();
