// Sample user data for testing
const users = [
    { username: 'testUser', phone: '1234567890', password: 'testPass' }
]; // Replace this with actual user data

let resetCodes = {}; // Object to store reset codes

// Login functionality
document.getElementById('loginButton').onclick = function() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        alert('Please fill in both fields.');
        return;
    }

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('Login successful! Welcome to K Smart!');
        window.location.href = 'k_smart.html'; // Redirect to K Smart page
    } else {
        alert('Invalid username or password. Please try again.');
    }
};

// Handle forgot password
document.getElementById('forgotPassword').onclick = function() {
    const username = prompt("Please enter your username to reset your password:");
    const user = users.find(user => user.username === username);
    
    if (user) {
        // Generate a random reset code
        const resetCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
        resetCodes[username] = resetCode; // Store the reset code
        alert(`A reset code has been sent to your registered phone number: ${user.phone}`);
        
        // Prompt user for the reset code
        const userInputCode = prompt("Please enter the reset code sent to your phone:");
        
        if (parseInt(userInputCode) === resetCode) {
            const newPassword = prompt("Enter your new password:");
            user.password = newPassword; // Update the user's password
            alert("Your password has been successfully reset!");
        } else {
            alert("Invalid reset code. Please try again.");
        }
    } else {
        alert('Username not found. Please check and try again.');
    }
};
