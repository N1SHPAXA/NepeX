
const input = document.getElementById("userInput");
const chatbox = document.getElementById("chatbox");
const welcome = document.getElementById("welcome");
const toast = document.getElementById("toast");
const history = document.getElementById("history");
// NEPEX THINKING INDICATOR
const thinkingIndicator = document.createElement("div");

thinkingIndicator.innerHTML = `
    <span class="nepex-loader"></span>
    <span>Just A Sec.</span>
`;

thinkingIndicator.style.cssText = `
    display: none;
    align-items: center;
    gap: 12px;
    padding: 15px;
    color: #e5d7a0;
    font-size: 14px;
`;

const loaderStyle = document.createElement("style");

loaderStyle.textContent = `
.nepex-loader {
    width: 17px;
    height: 17px;
    border: 2px solid rgba(255,255,255,0.15);
    border-top-color: white;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255,220,130,0.5);
    animation: nepexSpin 0.8s linear infinite;
    display: inline-block;
}

@keyframes nepexSpin {
    to { transform: rotate(360deg); }
}
`;

document.head.appendChild(loaderStyle);
chatbox.appendChild(thinkingIndicator);

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

        const row = document.createElement("div");

        row.style.cssText = `
            display: flex;
            align-items: center;
            gap: 5px;
            margin-bottom: 7px;
        `;

        const item = document.createElement("button");

        item.className = "history-item";
        item.textContent = "✦ " + chat.title;

        item.style.cssText = `
            flex: 1;
            min-width: 0;
            text-align: left;
            padding: 10px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            color: white;
            background: ${chat.id === activeChatId ? "#303030" : "transparent"};
        `;

        item.onclick = () => openChat(chat.id);

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "×";
        deleteButton.title = "Delete chat";

        deleteButton.style.cssText = `
            border: none;
            background: transparent;
            color: #aaa;
            font-size: 21px;
            cursor: pointer;
            padding: 5px 10px;
        `;

        deleteButton.onclick = (event) => {
            event.stopPropagation();
            deleteChat(chat.id);
        };

        row.appendChild(item);
        row.appendChild(deleteButton);

        history.appendChild(row);
    });
}

// DELETE INDIVIDUAL CHAT
function deleteChat(id) {

    chats = chats.filter(chat => chat.id !== id);

    if (activeChatId === id) {
        activeChatId = null;
        chatbox.innerHTML = "";
        chatbox.appendChild(thinkingIndicator);
        thinkingIndicator.style.display = "none";
        welcome.style.display = "block";
    }

    saveChats();
    renderHistory();
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

// KNOWLEDGE BASE
// Structured knowledge categories for the NepeX AI chatbot.
// Each entry can be a string (exact/prefix match) or an object {pattern: RegExp, answer: string}.
const knowledgeBase = [
    // Greetings
    { pattern: /hello|hi|hey/i, answer: "Hello! How can I help you?" },

    // HTML
    { pattern: /html/i, answer: "HTML is used to create the structure of websites." },

    // Internet
    { pattern: /what.?is.?the.?internet/i, answer: "The internet is a global network connecting computers and devices around the world." },

    // Computer
    { pattern: /what.?is.?a.?computer/i, answer: "A computer is an electronic device that processes, stores and displays information." },

    // Software
    { pattern: /what.?is.?software/i, answer: "Software is a collection of programs and instructions that tell a computer what to do." },

    // Hardware
    { pattern: /what.?is.?hardware/i, answer: "Hardware refers to the physical components of a computer, such as a keyboard, CPU and monitor." },

    // Operating System
    { pattern: /what.?is.?an.?operating.?system/i, answer: "An operating system manages computer hardware and software. Examples include Windows, Linux and macOS." },

    // RAM
    { pattern: /what.?is.?ram/i, answer: "RAM is temporary computer memory used to store data that programs are currently using." },

    // ROM
    { pattern: /what.?is.?rom/i, answer: "ROM is non-volatile memory that stores data even when power is turned off." },

    // CPU
    { pattern: /what.?is.?a.?cpu/i, answer: "CPU stands for Central Processing Unit. It executes instructions and performs calculations." },

    // GPU
    { pattern: /what.?is.?a.?gpu/i, answer: "GPU stands for Graphics Processing Unit. It handles graphics and parallel computations." },

    // Storage
    { pattern: /what.?is.?storage/i, answer: "Storage is where a computer saves files, applications and other data." },

    // Physics - Gravity
    { pattern: /what.?is.?gravity/i, answer: "Gravity is the force of attraction between objects that have mass." },

    // Physics - Electricity
    { pattern: /what.?is.?electricity/i, answer: "Electricity is a form of energy associated with electric charges." },

    // Physics - Energy
    { pattern: /what.?is.?energy/i, answer: "Energy is the ability to do work or cause change." },

    // Chemistry/Physics - Atom
    { pattern: /what.?is.?an.?atom/i, answer: "An atom is the basic unit of an element, made of protons, neutrons and electrons." },

    // Biology - DNA
    { pattern: /what.?is.?dna/i, answer: "DNA is the molecule that carries genetic instructions in living organisms." },

    // Biology - Photosynthesis
    { pattern: /what.?is.?photosynthesis/i, answer: "Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to make food." },

    // Biology - Evolution
    { pattern: /what.?is.?evolution/i, answer: "Evolution is the change in inherited characteristics of populations over generations." },

    // Astronomy - Black Hole
    { pattern: /what.?is.?a.?black.?hole/i, answer: "A black hole is a region of space with gravity so strong that nothing, not even light, can escape from within its event horizon." },

    // Light
    { pattern: /what.?is.?light/i, answer: "Light is electromagnetic radiation that can be detected by the human eye." },

    // Sound
    { pattern: /what.?is.?sound/i, answer: "Sound is a vibration that travels through a medium such as air, water or solids." },

    // Geography - Capitals
    { pattern: /capital.?of.?nepal/i, answer: "The capital of Nepal is Kathmandu." },
    { pattern: /capital.?of.?india/i, answer: "The capital of India is New Delhi." },
    { pattern: /capital.?of.?japan/i, answer: "The capital of Japan is Tokyo." },
    { pattern: /capital.?of.?china/i, answer: "The capital of China is Beijing." },
    { pattern: /capital.?of.?usa|capital.?of.?america/i, answer: "The capital of the United States is Washington, D.C." },

    // Geography - Size records
    { pattern: /largest.?country/i, answer: "Russia is the largest country in the world by land area." },
    { pattern: /smallest.?country/i, answer: "Vatican City is the smallest independent country by area." },
    { pattern: /largest.?ocean/i, answer: "The Pacific Ocean is the largest ocean on Earth." },
    { pattern: /highest.?mountain/i, answer: "Mount Everest is the highest mountain above sea level, at approximately 8,849 metres." },
    { pattern: /how.?many.?continents/i, answer: "There are seven commonly recognized continents." },

    // Programming - Python
    { pattern: /what.?is.?python/i, answer: "Python is a popular programming language known for its readable syntax and versatility." },

    // Programming - Java
    { pattern: /what.?is.?java/i, answer: "Java is a general-purpose, object-oriented programming language." },

    // Programming - C++
    { pattern: /what.?is.?c\+\+/i, answer: "C++ is a powerful programming language used in software, games and systems development." },

    // Programming - Variables
    { pattern: /what.?is.?a.?variable/i, answer: "A variable is a named container used to store data in a program." },

    // Programming - Functions
    { pattern: /what.?is.?a.?function/i, answer: "A function is a reusable block of code designed to perform a particular task." },

    // Programming - Loops
    { pattern: /what.?is.?a.?loop/i, answer: "A loop repeats a block of code while a condition is satisfied or for a specified number of times." },

    // Programming - Arrays
    { pattern: /what.?is.?an.?array/i, answer: "An array is a data structure used to store multiple values in one variable." },

    // Programming - Objects
    { pattern: /what.?is.?an.?object/i, answer: "An object stores related data and functionality using properties and methods." },

    // Programming - Algorithms
    { pattern: /what.?is.?an.?algorithm/i, answer: "An algorithm is a sequence of steps used to solve a problem." },

    // Programming - Debugging
    { pattern: /what.?is.?debugging/i, answer: "Debugging is the process of finding and fixing errors in code." },

    // Tech Companies
    { pattern: /what.?is.?google/i, answer: "Google is a technology company best known for its search engine." },

    // Web Technologies - Browser
    { pattern: /what.?is.?a.?browser/i, answer: "A browser is software used to access and view websites." },

    // Servers
    { pattern: /what.?is.?a.?server/i, answer: "A server is a computer or software that provides services or data to other computers." },

    // Networking - IP Address
    { pattern: /what.?is.?an.?ip.?address/i, answer: "An IP address is a numerical identifier used to identify a device on an IP network." },

    // Networking - Domain
    { pattern: /what.?is.?a.?domain/i, answer: "A domain name is a human-readable address used to access a website." },

    // Cybersecurity
    { pattern: /what.?is.?cybersecurity/i, answer: "Cybersecurity is the practice of protecting computers, networks and data from digital threats." },

    // Cloud Computing
    { pattern: /what.?is.?cloud.?computing/i, answer: "Cloud computing provides computing resources and services over the internet." },

    // Apps
    { pattern: /what.?is.?an.?app/i, answer: "An app is a software application designed to perform specific tasks." },

    // Networking - Wi-Fi
    { pattern: /what.?is.?wifi/i, answer: "Wi-Fi is a wireless networking technology that connects devices to a local network." },

    // Databases
    { pattern: /what.?is.?a.?database/i, answer: "A database is an organized collection of information that can be stored, searched and managed." },

    // AI
    { pattern: /what.?is.?artificial.?intelligence/i, answer: "Artificial Intelligence is technology that enables computers to perform tasks associated with human intelligence." },

    // ML
    { pattern: /what.?is.?machine.?learning/i, answer: "Machine learning is a branch of AI where computers learn patterns from data." },

    // Deep Learning
    { pattern: /what.?is.?deep.?learning/i, answer: "Deep learning is a type of machine learning that uses multi-layered neural networks." },

    // Neural Networks
    { pattern: /what.?is.?a.?neural.?network/i, answer: "A neural network is a computing model inspired by how biological brains process information." },

    // ChatGPT
    { pattern: /what.?is.?chatgpt/i, answer: "ChatGPT is an AI assistant developed by OpenAI that can understand and generate text." },

    // Chatbots
    { pattern: /what.?is.?a.?chatbot/i, answer: "A chatbot is a software program designed to communicate with users through conversation." },

    // LLM
    { pattern: /what.?is.?an.?llm/i, answer: "LLM stands for Large Language Model. It is an AI model trained to understand and generate language." },

    // Prompts
    { pattern: /what.?is.?a.?prompt/i, answer: "A prompt is an instruction or question given to an AI model." },

    // Generative AI
    { pattern: /what.?is.?generative.?ai/i, answer: "Generative AI creates new content such as text, images, audio and code." },

    // Robotics
    { pattern: /what.?is.?robotics/i, answer: "Robotics is a field of engineering and technology focused on designing and building robots." },

    // Mathematics - Pi
    { pattern: /what.?is.?pi/i, answer: "Pi is a mathematical constant approximately equal to 3.14159265." },

    // Mathematics - Algebra
    { pattern: /what.?is.?algebra/i, answer: "Algebra is a branch of mathematics that uses symbols and variables to represent numbers and relationships." },

    // Mathematics - Geometry
    { pattern: /what.?is.?geometry/i, answer: "Geometry is the branch of mathematics concerned with shapes, sizes and spatial relationships." },

    // Mathematics - Prime Numbers
    { pattern: /what.?is.?a.?prime.?number/i, answer: "A prime number is a whole number greater than 1 that has exactly two positive divisors: 1 and itself." },

    // Mathematics - Fractions
    { pattern: /what.?is.?a.?fraction/i, answer: "A fraction represents a part of a whole and is written as a numerator over a denominator." },

    // Mathematics - Percentage
    { pattern: /what.?is.?percentage/i, answer: "A percentage is a number expressed as a fraction of 100." },

    // Mathematics - Infinity
    { pattern: /what.?is.?infinity/i, answer: "Infinity represents something without any limit or end." },

    // Mathematics - Square Root
    { pattern: /what.?is.?a.?square.?root/i, answer: "A square root of a number is a value that, when multiplied by itself, gives the original number." },

    // Mathematics - Probability
    { pattern: /what.?is.?probability/i, answer: "Probability measures how likely an event is to happen." },

    // Mathematics - Calculus
    { pattern: /what.?is.?calculus/i, answer: "Calculus is a branch of mathematics that studies change using derivatives and integrals." },

    // Anatomy - Bones
    { pattern: /how.?many.?bones/i, answer: "A typical adult human skeleton has 206 bones." },

    // Anatomy - Heart
    { pattern: /what.?is.?the.?heart/i, answer: "The heart is a muscular organ that pumps blood throughout the body." },

    // Anatomy - Brain
    { pattern: /what.?is.?the.?brain/i, answer: "The brain is the central organ of the nervous system." },

    // Anatomy - Blood
    { pattern: /what.?is.?blood/i, answer: "Blood is a body fluid that transports oxygen, nutrients and other substances." },

    // Anatomy - Lungs
    { pattern: /what.?are.?lungs/i, answer: "Lungs are organs that help the body exchange oxygen and carbon dioxide." },

    // Cell Biology - Cell
    { pattern: /what.?is.?a.?cell/i, answer: "A cell is the basic structural and functional unit of life." },

    // Ecology - Ecosystem
    { pattern: /what.?is.?an.?ecosystem/i, answer: "An ecosystem is a community of living organisms interacting with their environment." },

    // Biodiversity
    { pattern: /what.?is.?biodiversity/i, answer: "Biodiversity refers to the variety of living organisms in an area or across Earth." },

    // Climate Change
    { pattern: /what.?is.?climate.?change/i, answer: "Climate change refers to long-term changes in Earth's temperatures and weather patterns." },

    // Endangered Species
    { pattern: /what.?is.?an.?endangered.?species/i, answer: "An endangered species is a species facing a high risk of extinction." },

    // Inventors - Telephone
    { pattern: /who.?invented.?the.?telephone/i, answer: "Alexander Graham Bell is widely credited with inventing and patenting the first practical telephone." },

    // Inventors - Light Bulb
    { pattern: /who.?invented.?the.?light.?bulb/i, answer: "Thomas Edison developed a commercially practical incandescent light bulb, building on earlier work by other inventors." },

    // Inventors - Internet
    { pattern: /who.?invented.?the.?internet/i, answer: "The internet was developed through the work of many researchers. Vint Cerf and Bob Kahn helped create TCP/IP." },

    // Inventors - Computer
    { pattern: /who.?invented.?the.?computer/i, answer: "There is no single inventor of the modern computer. Charles Babbage is often called the father of the computer." },

    // History - World War II
    { pattern: /when.?did.?world.?war.?2.?end/i, answer: "World War II ended in 1945." },

    // History - World War I
    { pattern: /when.?did.?world.?war.?1.?start/i, answer: "World War I began in 1914." },

    // Scientists - Einstein
    { pattern: /who.?was.?albert.?einstein/i, answer: "Albert Einstein was a theoretical physicist famous for developing the theory of relativity." },

    // Scientists - Isaac Newton
    { pattern: /who.?was.?isaac.?newton/i, answer: "Isaac Newton was a physicist and mathematician known for his laws of motion and universal gravitation." },

    // Artists - Leonardo da Vinci
    { pattern: /who.?was.?leonardo.?da.?vinci/i, answer: "Leonardo da Vinci was an Italian Renaissance artist, inventor and scientist." },

    // Scientists - Nikola Tesla
    { pattern: /who.?was.?nikola.?tesla/i, answer: "Nikola Tesla was an inventor and electrical engineer known for his contributions to alternating-current technology." },

    // AI Capabilities
    { pattern: /are.?you.?intelligent/i, answer: "I'm designed to provide useful information and help solve problems. I'm always ready to learn through improvements!" },

    // AI Nature
    { pattern: /are.?you.?human/i, answer: "No! I'm NepeX, an AI assistant." },

    // AI Needs
    { pattern: /do.?you.?sleep/i, answer: "I don't need sleep. I'm software running on computers." },

    // AI Feelings
    { pattern: /do.?you.?have.?feelings/i, answer: "I don't experience feelings like humans, but I can understand emotional language and respond supportively." },

    // AI Capabilities Summary
    { pattern: /what.?can.?you.?do/i, answer: "I can answer basic questions, explain concepts, help with coding, assist with learning and much more." },

    // AI Development
    { pattern: /who.?is.?your.?developer/i, answer: "I'm developed as part of the NepeX project." },

    // AI Purpose
    { pattern: /what.?is.?your.?purpose/i, answer: "My purpose is to help people find information, learn new things and solve problems." },

    // AI Availability
    { pattern: /are.?you.?free/i, answer: "I'm available whenever you can access NepeX. The service may have usage or hosting costs." },

    // AI Limitations
    { pattern: /do.?you.?know.?everything/i, answer: "No, I don't know everything. I can make mistakes, so important information should be verified." },

    // Jokes
    { pattern: /tell.?me.?a.?joke/i, answer: "Why did the programmer quit his job? Because he didn't get arrays!" },

    // Optics - Sky Blue
    { pattern: /why.?is.?the.?sky.?blue/i, answer: "The sky appears blue because air molecules scatter shorter blue wavelengths of sunlight more than longer wavelengths." },

    // Sunset
    { pattern: /sunset|red.?sky/i, answer: "During sunset, sunlight travels through more atmosphere. Much of the blue light gets scattered away, leaving more red and orange light to reach our eyes." },

    // Web Technologies - CSS
    { pattern: /css/i, answer: "CSS is used to design and style websites." },

    // Web Technologies - JavaScript
    { pattern: /javascript/i, answer: "JavaScript makes websites interactive." },

    // AI Identity
    { pattern: /who.?are.?you/i, answer: "I am your personal Mini AI chatbot!" },

    // Fallback / Unknown
    { pattern: /.*/, answer: "I don't know that yet. Teach me something new!" }
];

// SMART UTILITIES
// Get current date/time for dynamic responses
function getCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString(undefined, options);
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

// ANSWER ENGINE
// Match a question against the knowledge base using pattern matching
function matchKnowledge(question) {
    const lowerQuestion = question.toLowerCase().trim();

    for (const entry of knowledgeBase) {
        if (entry.pattern.test(lowerQuestion)) {
            return entry.answer;
        }
    }

    // No match found - return fallback
    return null;
}

// ENHANCED ANSWER ENGINE
function getAnswer(question) {
    // Try knowledge base match first
    const kbAnswer = matchKnowledge(question);
    if (kbAnswer) {
        return kbAnswer;
    }

    // Check for dynamic utilities
    const lowerQuestion = question.toLowerCase().trim();

    // Time/Date queries
    if (/what.?time|current.?time/i.test(lowerQuestion)) {
        return `The current time is ${getCurrentTime()}.`;
    }

    if (/what.?date|current.?date/i.test(lowerQuestion)) {
        return `Today is ${getCurrentDate()}.`;
    }

    // Thank you / gratitude
    if (/thank.?you|thanks/i.test(lowerQuestion)) {
        return "You're welcome! Is there anything else I can help you with?";
    }

    // How are you
    if (/how.?are.?you|how.?are.?things/i.test(lowerQuestion)) {
        return "I'm doing well, thank you for asking! How can I help you today?";
    }

    // Goodbye
    if (/goodbye|bye|see.?you/i.test(lowerQuestion)) {
        return "Goodbye! Have a great day!";
    }

    // Default fallback
    return "I don't know that yet. Teach me something new!";
}

// SEND MESSAGE
function sendMessage() {

    let question = input.value.trim();

    if (question === "") return;

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

    chat.messages.push({
        text: question,
        type: "user-message"
    });

    welcome.style.display = "none";

    addMessage(question, "user-message");

    input.value = "";

    // SHOW THINKING INDICATOR
    thinkingIndicator.style.display = "flex";
    chatbox.appendChild(thinkingIndicator);

    const answer = getAnswer(question);

    setTimeout(() => {

        // HIDE THINKING INDICATOR
        thinkingIndicator.style.display = "none";

        chat.messages.push({
            text: answer,
            type: "ai-message"
        });

        addMessage(answer, "ai-message");

        saveChats();
        renderHistory();

    }, 1000);

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

// SEND MESSAGE
function sendMessage() {

    let question = input.value.trim();

    if (question === "") return;

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

    chat.messages.push({
        text: question,
        type: "user-message"
    });

    welcome.style.display = "none";

    addMessage(question, "user-message");

    input.value = "";

    // SHOW THINKING INDICATOR
    thinkingIndicator.style.display = "flex";
    chatbox.appendChild(thinkingIndicator);

    const answer = getAnswer(question);

    setTimeout(() => {

        // HIDE THINKING INDICATOR
        thinkingIndicator.style.display = "none";

        chat.messages.push({
            text: answer,
            type: "ai-message"
        });

        addMessage(answer, "ai-message");

        saveChats();
        renderHistory();

    }, 1000);

    saveChats();
    renderHistory();
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
