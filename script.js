
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

else if (question.includes("what is the internet")) {
    answer = "The internet is a global network connecting computers and devices around the world.";
}
else if (question.includes("what is a computer")) {
    answer = "A computer is an electronic device that processes, stores and displays information.";
}
else if (question.includes("what is software")) {
    answer = "Software is a collection of programs and instructions that tell a computer what to do.";
}
else if (question.includes("what is hardware")) {
    answer = "Hardware refers to the physical components of a computer, such as a keyboard, CPU and monitor.";
}
else if (question.includes("what is an operating system")) {
    answer = "An operating system manages computer hardware and software. Examples include Windows, Linux and macOS.";
}
else if (question.includes("what is ram")) {
    answer = "RAM is temporary computer memory used to store data that programs are currently using.";
}
else if (question.includes("what is rom")) {
    answer = "ROM is non-volatile memory that stores data even when power is turned off.";
}
else if (question.includes("what is a cpu")) {
    answer = "CPU stands for Central Processing Unit. It executes instructions and performs calculations.";
}
else if (question.includes("what is a gpu")) {
    answer = "GPU stands for Graphics Processing Unit. It handles graphics and parallel computations.";
}
else if (question.includes("what is storage")) {
    answer = "Storage is where a computer saves files, applications and other data.";
}

else if (question.includes("what is gravity")) {
    answer = "Gravity is the force of attraction between objects that have mass.";
}
else if (question.includes("what is electricity")) {
    answer = "Electricity is a form of energy associated with electric charges.";
}
else if (question.includes("what is energy")) {
    answer = "Energy is the ability to do work or cause change.";
}
else if (question.includes("what is an atom")) {
    answer = "An atom is the basic unit of an element, made of protons, neutrons and electrons.";
}
else if (question.includes("what is dna")) {
    answer = "DNA is the molecule that carries genetic instructions in living organisms.";
}
else if (question.includes("what is photosynthesis")) {
    answer = "Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to make food.";
}
else if (question.includes("what is evolution")) {
    answer = "Evolution is the change in inherited characteristics of populations over generations.";
}
else if (question.includes("what is a black hole")) {
    answer = "A black hole is a region of space with gravity so strong that nothing, not even light, can escape from within its event horizon.";
}
else if (question.includes("what is light")) {
    answer = "Light is electromagnetic radiation that can be detected by the human eye.";
}
else if (question.includes("what is sound")) {
    answer = "Sound is a vibration that travels through a medium such as air, water or solids.";
}

else if (question.includes("capital of nepal")) {
    answer = "The capital of Nepal is Kathmandu.";
}
else if (question.includes("capital of india")) {
    answer = "The capital of India is New Delhi.";
}
else if (question.includes("capital of japan")) {
    answer = "The capital of Japan is Tokyo.";
}
else if (question.includes("capital of china")) {
    answer = "The capital of China is Beijing.";
}
else if (question.includes("capital of usa") || question.includes("capital of america")) {
    answer = "The capital of the United States is Washington, D.C.";
}
else if (question.includes("largest country")) {
    answer = "Russia is the largest country in the world by land area.";
}
else if (question.includes("smallest country")) {
    answer = "Vatican City is the smallest independent country by area.";
}
else if (question.includes("largest ocean")) {
    answer = "The Pacific Ocean is the largest ocean on Earth.";
}
else if (question.includes("highest mountain")) {
    answer = "Mount Everest is the highest mountain above sea level, at approximately 8,849 metres.";
}
else if (question.includes("how many continents")) {
    answer = "There are seven commonly recognized continents.";
}

else if (question.includes("what is python")) {
    answer = "Python is a popular programming language known for its readable syntax and versatility.";
}
else if (question.includes("what is java")) {
    answer = "Java is a general-purpose, object-oriented programming language.";
}
else if (question.includes("what is c++")) {
    answer = "C++ is a powerful programming language used in software, games and systems development.";
}
else if (question.includes("what is a variable")) {
    answer = "A variable is a named container used to store data in a program.";
}
else if (question.includes("what is a function")) {
    answer = "A function is a reusable block of code designed to perform a particular task.";
}
else if (question.includes("what is a loop")) {
    answer = "A loop repeats a block of code while a condition is satisfied or for a specified number of times.";
}
else if (question.includes("what is an array")) {
    answer = "An array is a data structure used to store multiple values in one variable.";
}
else if (question.includes("what is an object")) {
    answer = "An object stores related data and functionality using properties and methods.";
}
else if (question.includes("what is an algorithm")) {
    answer = "An algorithm is a sequence of steps used to solve a problem.";
}
else if (question.includes("what is debugging")) {
    answer = "Debugging is the process of finding and fixing errors in code.";
}

else if (question.includes("what is google")) {
    answer = "Google is a technology company best known for its search engine.";
}
else if (question.includes("what is a browser")) {
    answer = "A browser is software used to access and view websites.";
}
else if (question.includes("what is a server")) {
    answer = "A server is a computer or software that provides services or data to other computers.";
}
else if (question.includes("what is an ip address")) {
    answer = "An IP address is a numerical identifier used to identify a device on an IP network.";
}
else if (question.includes("what is a domain")) {
    answer = "A domain name is a human-readable address used to access a website.";
}
else if (question.includes("what is cybersecurity")) {
    answer = "Cybersecurity is the practice of protecting computers, networks and data from digital threats.";
}
else if (question.includes("what is cloud computing")) {
    answer = "Cloud computing provides computing resources and services over the internet.";
}
else if (question.includes("what is an app")) {
    answer = "An app is a software application designed to perform specific tasks.";
}
else if (question.includes("what is wifi")) {
    answer = "Wi-Fi is a wireless networking technology that connects devices to a local network.";
}
else if (question.includes("what is a database")) {
    answer = "A database is an organized collection of information that can be stored, searched and managed.";
}

else if (question.includes("what is artificial intelligence")) {
    answer = "Artificial Intelligence is technology that enables computers to perform tasks associated with human intelligence.";
}
else if (question.includes("what is machine learning")) {
    answer = "Machine learning is a branch of AI where computers learn patterns from data.";
}
else if (question.includes("what is deep learning")) {
    answer = "Deep learning is a type of machine learning that uses multi-layered neural networks.";
}
else if (question.includes("what is a neural network")) {
    answer = "A neural network is a computing model inspired by how biological brains process information.";
}
else if (question.includes("what is chatgpt")) {
    answer = "ChatGPT is an AI assistant developed by OpenAI that can understand and generate text.";
}
else if (question.includes("what is a chatbot")) {
    answer = "A chatbot is a software program designed to communicate with users through conversation.";
}
else if (question.includes("what is an llm")) {
    answer = "LLM stands for Large Language Model. It is an AI model trained to understand and generate language.";
}
else if (question.includes("what is a prompt")) {
    answer = "A prompt is an instruction or question given to an AI model.";
}
else if (question.includes("what is generative ai")) {
    answer = "Generative AI creates new content such as text, images, audio and code.";
}
else if (question.includes("what is robotics")) {
    answer = "Robotics is a field of engineering and technology focused on designing and building robots.";
}

else if (question.includes("what is pi")) {
    answer = "Pi is a mathematical constant approximately equal to 3.14159265.";
}
else if (question.includes("what is algebra")) {
    answer = "Algebra is a branch of mathematics that uses symbols and variables to represent numbers and relationships.";
}
else if (question.includes("what is geometry")) {
    answer = "Geometry is the branch of mathematics concerned with shapes, sizes and spatial relationships.";
}
else if (question.includes("what is a prime number")) {
    answer = "A prime number is a whole number greater than 1 that has exactly two positive divisors: 1 and itself.";
}
else if (question.includes("what is a fraction")) {
    answer = "A fraction represents a part of a whole and is written as a numerator over a denominator.";
}
else if (question.includes("what is percentage")) {
    answer = "A percentage is a number expressed as a fraction of 100.";
}
else if (question.includes("what is infinity")) {
    answer = "Infinity represents something without any limit or end.";
}
else if (question.includes("what is square root")) {
    answer = "A square root of a number is a value that, when multiplied by itself, gives the original number.";
}
else if (question.includes("what is probability")) {
    answer = "Probability measures how likely an event is to happen.";
}
else if (question.includes("what is calculus")) {
    answer = "Calculus is a branch of mathematics that studies change using derivatives and integrals.";
}

else if (question.includes("how many bones")) {
    answer = "A typical adult human skeleton has 206 bones.";
}
else if (question.includes("what is the heart")) {
    answer = "The heart is a muscular organ that pumps blood throughout the body.";
}
else if (question.includes("what is the brain")) {
    answer = "The brain is the central organ of the nervous system.";
}
else if (question.includes("what is blood")) {
    answer = "Blood is a body fluid that transports oxygen, nutrients and other substances.";
}
else if (question.includes("what are lungs")) {
    answer = "Lungs are organs that help the body exchange oxygen and carbon dioxide.";
}
else if (question.includes("what is a cell")) {
    answer = "A cell is the basic structural and functional unit of life.";
}
else if (question.includes("what is an ecosystem")) {
    answer = "An ecosystem is a community of living organisms interacting with their environment.";
}
else if (question.includes("what is biodiversity")) {
    answer = "Biodiversity refers to the variety of living organisms in an area or across Earth.";
}
else if (question.includes("what is climate change")) {
    answer = "Climate change refers to long-term changes in Earth's temperatures and weather patterns.";
}
else if (question.includes("what is an endangered species")) {
    answer = "An endangered species is a species facing a high risk of extinction.";
}

else if (question.includes("who invented the telephone")) {
    answer = "Alexander Graham Bell is widely credited with inventing and patenting the first practical telephone.";
}
else if (question.includes("who invented the light bulb")) {
    answer = "Thomas Edison developed a commercially practical incandescent light bulb, building on earlier work by other inventors.";
}
else if (question.includes("who invented the internet")) {
    answer = "The internet was developed through the work of many researchers. Vint Cerf and Bob Kahn helped create TCP/IP.";
}
else if (question.includes("who invented the computer")) {
    answer = "There is no single inventor of the modern computer. Charles Babbage is often called the father of the computer.";
}
else if (question.includes("when did world war 2 end")) {
    answer = "World War II ended in 1945.";
}
else if (question.includes("when did world war 1 start")) {
    answer = "World War I began in 1914.";
}
else if (question.includes("who was albert einstein")) {
    answer = "Albert Einstein was a theoretical physicist famous for developing the theory of relativity.";
}
else if (question.includes("who was isaac newton")) {
    answer = "Isaac Newton was a physicist and mathematician known for his laws of motion and universal gravitation.";
}
else if (question.includes("who was leonardo da vinci")) {
    answer = "Leonardo da Vinci was an Italian Renaissance artist, inventor and scientist.";
}
else if (question.includes("who was nikola tesla")) {
    answer = "Nikola Tesla was an inventor and electrical engineer known for his contributions to alternating-current technology.";
}

else if (question.includes("are you intelligent")) {
    answer = "I'm designed to provide useful information and help solve problems. I'm always ready to learn through improvements!";
}
else if (question.includes("are you human")) {
    answer = "No! I'm NepeX, an AI assistant.";
}
else if (question.includes("do you sleep")) {
    answer = "I don't need sleep. I'm software running on computers.";
}
else if (question.includes("do you have feelings")) {
    answer = "I don't experience feelings like humans, but I can understand emotional language and respond supportively.";
}
else if (question.includes("what can you do")) {
    answer = "I can answer basic questions, explain concepts, help with coding, assist with learning and much more.";
}
else if (question.includes("who is your developer")) {
    answer = "I'm developed as part of the NepeX project.";
}
else if (question.includes("what is your purpose")) {
    answer = "My purpose is to help people find information, learn new things and solve problems.";
}
else if (question.includes("are you free")) {
    answer = "I'm available whenever you can access NepeX. The service may have usage or hosting costs.";
}
else if (question.includes("do you know everything")) {
    answer = "No, I don't know everything. I can make mistakes, so important information should be verified.";
}
else if (question.includes("tell me a joke")) {
    answer = "Why did the programmer quit his job? Because he didn't get arrays!";
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
