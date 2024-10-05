// script.js
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const transactionType = document.getElementById('transaction-type').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const accountNumber = document.getElementById('account-number').value;
    const amount = document.getElementById('amount').value;

    // Simple validation (could be more complex depending on requirements)
    if (!accountNumber || !amount) {
        document.getElementById('message').innerText = 'Please fill in all fields.';
        return;
    }

    // Simulate processing the transaction
    // In a real application, you would send this data to your server
    document.getElementById('message').innerText = `Processing ${transactionType} of ${amount} via ${paymentMethod} for account ${accountNumber}.`;

    // Optionally, clear the form fields
    document.getElementById('transaction-form').reset();
});
