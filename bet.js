document.addEventListener('DOMContentLoaded', function() {
    const depositBtn = document.getElementById('depositBtn');
    const withdrawBtn = document.getElementById('withdrawBtn');
    const amountInput = document.getElementById('amountInput');
    const amountField = document.getElementById('amount');
    const submitAmount = document.getElementById('submitAmount');
    const balanceElement = document.getElementById('balance');

    // Function to update balance display
    function updateBalance(newBalance) {
        balanceElement.textContent = `Current Balance: $${newBalance}`;
    }

    // Show amount input and set action based on button clicked
    function showAmountInput(action) {
        amountInput.style.display = 'block';
        submitAmount.onclick = function() {
            const amount = parseFloat(amountField.value);
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount.');
                return;
            }

            if (action === 'deposit') {
                performTransaction('deposit', amount);
            } else if (action === 'withdraw') {
                performTransaction('withdraw', amount);
            }
        };
    }

    // Perform deposit or withdraw transaction
    function performTransaction(type, amount) {
        fetch(`/api/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateBalance(data.newBalance);
                amountField.value = ''; // Clear input
                amountInput.style.display = 'none'; // Hide input
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Transaction failed.');
        });
    }

    // Button click events
    depositBtn.addEventListener('click', function() {
        showAmountInput('deposit');
    });

    withdrawBtn.addEventListener('click', function() {
        showAmountInput('withdraw');
    });
});
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let userBalance = 100; // Example initial balance

app.post('/api/deposit', (req, res) => {
    const { amount } = req.body;
    if (amount > 0) {
        userBalance += amount;
        res.json({ success: true, newBalance: userBalance });
    } else {
        res.json({ success: false, message: 'Invalid amount.' });
    }
});

app.post('/api/withdraw', (req, res) => {
    const { amount } = req.body;
    if (amount > 0 && amount <= userBalance) {
        userBalance -= amount;
        res.json({ success: true, newBalance: userBalance });
    } else {
        res.json({ success: false, message: 'Insufficient funds or invalid amount.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
