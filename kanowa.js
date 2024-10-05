document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');
    
    if (userInput.trim() === '') {
        return;
    }

    // Add user's message
    addMessage(userInput, 'user-message');

    // Process the bot's response
    const botResponse = getBotResponse(userInput);
    addMessage(botResponse, 'bot-message');

    // Clear the input field
    document.getElementById('user-input').value = '';
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
});

function addMessage(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
}

function getBotResponse(input) {
    const responses = {
        'hello,': 'hello',
        'how are you?': 'I am kris bot AI, but I am doing well. How can I help you?',
        ' who is the owner?': 'the owner of this site is kris from malawi and this site is for watching or download music or audios and earn money with several ways',
        'how?': 'by playing betting game',
        'ok': 'sure there is something else?!',
        'no': 'fuck you hahaha iwe ndine kris ase hahahahahaha ukaone kosewera ife timapanga zimenezi !',
        'yes': 'whats that feel free ypu can ask!',
        'bye': 'Goodbye! Have a nice day!',
        'default': 'Sorry, kambani zoveka zokhudzana ndi site yathu please.'
    };

    const normalizedInput = input.trim().toLowerCase();
    return responses[normalizedInput] || responses['default'];
}
