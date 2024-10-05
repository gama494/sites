const users = []; // Array to hold user data

// Signup functionality
document.getElementById('signupButton').onclick = function() {
    const username = document.getElementById('signupUsername').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;

    // Simple validation
    if (!username || !phone || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Check if username already exists
    if (users.find(user => user.username === username)) {
        alert('Username already taken. Please choose another one.');
        return;
    }

    // Add new user to the users array
    users.push({ username, phone, password });
    alert('Signup successful! You can now log in.');
    clearSignupForm();
};

// Function to clear the signup form
function clearSignupForm() {
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupPhone').value = '';
    document.getElementById('signupPassword').value = '';
}

// Handle forgot password
document.getElementById('forgotPassword').onclick = function() {
    alert('Please contact support to reset your password.');
};
