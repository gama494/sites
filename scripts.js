function placeBet() {
    const bet = document.getElementById('bet').value;

    fetch('/toss', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bet: bet }),
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.win) {
            resultDiv.innerHTML = `You won! The coin landed on ${data.result}.`;
            resultDiv.style.color = 'green';
        } else {
            resultDiv.innerHTML = `You lost. The coin landed on ${data.result}.`;
            resultDiv.style.color = 'red';
        }
    })
    .catch(error => console.error('Error:', error));
}
