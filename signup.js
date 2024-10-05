document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageElement = document.getElementById('message');

    // Basic validation
    if (password !== confirmPassword) {
        messageElement.textContent = 'Passwords do not match!';
        messageElement.style.color = 'red';
        return;
    }

    // Simulate sending data to the server (replace with actual API call)
    simulateSignUp(username, email, password)
        .then(response => {
            if (response.success) {
                messageElement.textContent = 'Sign up successful!';
                messageElement.style.color = 'green';
                
                // Redirect to the home page (index.html)
                setTimeout(() => {
                    window.location.href = 'index.html'; // Ensure this path is correct
                }, 1000); // Redirect after 1 second
            } else {
                messageElement.textContent = 'Sign up failed.';
                messageElement.style.color = 'red';
            }
        });
});

function simulateSignUp(username, email, password) {
    // Replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1000); // Simulated response
    });
}
