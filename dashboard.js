

// script.js
document.getElementById('copyButton').addEventListener('click', function() {
    const referralCode = document.getElementById('referralCode').innerText;
    navigator.clipboard.writeText(referralCode).then(function() {
        alert('Referral code copied to clipboard!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
});

document.getElementById('referralForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;

    // Simulate sending referral (Replace with actual API call)
    sendReferral(email)
        .then(response => {
            if (response.success) {
                alert('Referral sent successfully!');
                addReferralToList(email);
            } else {
                alert('Failed to send referral.');
            }
        });
});

function sendReferral(email) {
    // Replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1000); // Simulated response
    });
}

function addReferralToList(email) {
    const referralList = document.getElementById('referralList');
    const listItem = document.createElement('li');
    listItem.textContent = email;
    referralList.appendChild(listItem);
}

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/api/send-referral', (req, res) => {
    const { email } = req.body;

    // Simulate sending an email or saving the referral
    console.log(`Referral sent to ${email}`);

    // Respond with success
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});




