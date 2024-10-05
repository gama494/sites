document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const messageElement = document.getElementById('message');

        // Simulate login (replace with actual authentication logic)
        simulateLogin(username, password)
            .then(response => {
                if (response.success) {
                    messageElement.textContent = 'Login successful!';
                    messageElement.style.color = 'green';

                    // Redirect to the home page (index.html)
                    setTimeout(() => {
                        window.location.href = 'index.html'; // Redirect to your home page
                    }, 1000); // Redirect after 1 second
                } else {
                    messageElement.textContent = 'Login failed. Please check your username and password.';
                    messageElement.style.color = 'red';
                }
            });
    });

    function simulateLogin(username, password) {
        // Replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => resolve({ success: true }), 1000); // Simulated response
        });
    }
});
