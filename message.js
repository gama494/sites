const messages = []; // Array to hold messages

// Function to display messages
function displayMessages() {
    const messageItems = document.getElementById('messageItems');
    messageItems.innerHTML = ''; // Clear previous messages

    messages.forEach((message) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-item';
        messageDiv.innerText = `${message.sender} to ${message.recipient}: ${message.content} (${message.timestamp})`;
        messageItems.appendChild(messageDiv);
    });
}

// Function to handle sending a message
document.getElementById('sendMessageButton').onclick = function() {
    const recipient = document.getElementById('recipientSelect').value;
    const content = document.getElementById('messageInput').value;

    if (!recipient || !content) {
        alert('Please select a recipient and type a message.');
        return;
    }

    // Create a message object with a timestamp
    const timestamp = new Date().toLocaleString(); // Format: MM/DD/YYYY, HH:MM AM/PM
    messages.push({ sender: 'YourUsername', recipient, content, timestamp }); // Replace 'YourUsername' with actual sender
    displayMessages(); // Refresh the message list
    document.getElementById('messageInput').value = ''; // Clear input
    document.getElementById('recipientSelect').value = ''; // Reset recipient selection
};

// Initial call to display any existing messages
displayMessages();
