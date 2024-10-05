// script.js
document.getElementById('updateButton').addEventListener('click', function() {
    // Simulate fetching data for referrals and earnings
    const totalReferrals = Math.floor(Math.random() * 1000); // Random number for demo
    const totalEarnings = (Math.random() * 10000).toFixed(2); // Random number for demo

    // Update the dashboard
    document.getElementById('totalReferrals').innerText = totalReferrals;
    document.getElementById('totalEarnings').innerText = `MK${totalEarnings}`;

    // Simulate fetching withdrawal history
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    historyTable.innerHTML = ''; // Clear existing rows

    const sampleData = [
        { date: '2024-09-01', amount: 'MK 15,000.00' },
        { date: '2024-08-15', amount: 'MK 100,000.00' },
        { date: '2024-07-22', amount: 'MK 35,000.00' }
    ]; // Sample data

    sampleData.forEach(transaction => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        const amountCell = document.createElement('td');
        dateCell.innerText = transaction.date;
        amountCell.innerText = transaction.amount;
        row.appendChild(dateCell);
        row.appendChild(amountCell);
        historyTable.appendChild(row);
    });
});
