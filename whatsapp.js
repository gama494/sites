document.getElementById('send').addEventListener('click', function() {
    var messageInput = document.getElementById('message');
    var messageText = messageInput.value;
    
    if (messageText.trim() !== '') {
        var chatBox = document.getElementById('chat-box');
        
        var messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = messageText;
        
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        
        messageInput.value = ''; // Clear input field
    }
});
