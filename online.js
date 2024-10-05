// chat.js
$(document).ready(function() {
    const receiverId = 1; // Replace with actual receiver ID

    function fetchMessages() {
        $.get("get_messages.php", { receiver_id: receiverId }, function(data) {
            const messages = JSON.parse(data);
            let html = '';
            messages.forEach(message => {
                const messageClass = message.sender_id === receiverId ? 'received' : 'sent';
                html += `
                    <div class="message ${messageClass}">
                        <div class="text">${message.message}</div>
                    </div>
                `;
            });
            $('#chat-box').html(html);
            $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight); // Scroll to bottom
        });
    }

    function sendMessage() {
        const message = $('#message').val();
        $.post("send_message.php", { receiver_id: receiverId, message: message }, function() {
            $('#message').val('');
            fetchMessages();
        });
    }

    $('#message').on('keypress', function(e) {
        if (e.which == 13 && !e.shiftKey) { // Enter key
            e.preventDefault();
            sendMessage();
        }
    });

    setInterval(fetchMessages, 2000); // Fetch messages every 2 seconds
    fetchMessages(); // Initial fetch
});
