// script.js

let balance = 500;
let betAmounts = {1: 0, 2: 0}; // To store bets for the two places
let odds = 0;
let winnings = 0;
let claimTimeout;
let countdownInterval;
let animationDuration = 10000; // 10 seconds for full animation
let isMuted = false;
const flySound = document.getElementById('flySound');

// Flight times to randomly select
const flightTimes = [
    { type: 'good', duration: 120000 }, // 3 minutes
    { type: 'good', duration: 180000 }, // 3 minutes
    { type: 'bad', duration: 30000 },   // 30 seconds
    { type: 'good', duration: 120000 }, // 2 minutes
    { type: 'bad', duration: 180000 }  // 3 minutes
    
];
let currentFlightIndex = 0;

function updateBalance() {
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function deposit() {
    const depositAmount = parseFloat(document.getElementById('depositAmount').value);
    if (!isNaN(depositAmount) && depositAmount > 0) {
        balance += depositAmount;
        updateBalance();
        document.getElementById('depositAmount').value = '';
    }
}

function withdraw() {
    const withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= balance) {
        balance -= withdrawAmount;
        updateBalance();
        document.getElementById('withdrawAmount').value = '';
    }
}

function placeBet(betNumber) {
    const betAmount = parseFloat(document.getElementById(`betAmount${betNumber}`).value);
    if (isNaN(betAmount) || betAmount <= 0) {
        document.getElementById('result').textContent = 'Please enter a valid bet amount.';
        return;
    }

    if (betAmount > balance) {
        document.getElementById('result').textContent = 'Insufficient funds!';
        return;
    }

    // Deduct the bet amount
    balance -= betAmount;
    betAmounts[betNumber] = betAmount;
    updateBalance();

    // Simulate the odds and winnings
    odds = Math.floor(Math.random() * (500 - 100 + 1)) + 100; // Random odds between 100 and 500
    winnings = betAmount * (odds / 100); // Example payout calculation

    // Show and animate the airplane
    const airplane = document.getElementById('airplane');
    const oddsDiv = document.getElementById('odds');
    const countdownDiv = document.getElementById('countdown');
    const claimButton = document.getElementById('claimButton');
    const multipliedMoneyDiv = document.getElementById('multipliedMoney');

    airplane.classList.remove('hidden');
    oddsDiv.classList.remove('hidden');
    claimButton.classList.remove('hidden'); // Show claim button
    countdownDiv.classList.remove('hidden');
    multipliedMoneyDiv.classList.remove('hidden');

    // Play the flying sound if not muted
    if (!isMuted) {
        flySound.play();
    }

    // Reset airplane animation
    airplane.style.animation = 'none';
    // Force reflow to restart animation
    airplane.offsetHeight; // Trigger a reflow
    airplane.style.animation = `flyUp ${animationDuration / 1000}s linear forwards`; // Set animation

    // Update odds display
    oddsDiv.textContent = `Odds: ${odds}`;

    // Calculate and display initial multiplied money
    let startTime = Date.now();
    let endTime = startTime + animationDuration;
    let initialBetAmount = betAmounts[betNumber];
    let currentMultiplier = initialBetAmount;
    
    function updateMoney() {
        let now = Date.now();
        let elapsed = now - startTime;
        let percentage = elapsed / animationDuration;

        if (percentage > 1) percentage = 1; // Clamp to 1
        currentMultiplier = initialBetAmount + (odds * percentage);
        
        multipliedMoneyDiv.textContent = `your Money: MK ${currentMultiplier.toFixed(2)}`;
        if (percentage < 1) {
            requestAnimationFrame(updateMoney);
        }
    }
    
    requestAnimationFrame(updateMoney);
    
    // Start countdown
    startCountdown(animationDuration / 1000); // Duration in seconds

    // Handle claiming and timeouts
    claimTimeout = setTimeout(() => {
        endGame(false); // End game if time runs out
    }, animationDuration);
}

function startCountdown(duration) {
    const countdownDiv = document.getElementById('countdown');
    let timeLeft = duration;
    
    countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownDiv.textContent = 'Time is up!';
            endGame(false); // End game if time runs out
        } else {
            countdownDiv.textContent = `Time Left: ${Math.ceil(timeLeft)}s`;
            timeLeft--;
        }
    }, 1000);
}

function claimWinnings() {
    clearTimeout(claimTimeout); // Stop the game from ending due to timeout
    clearInterval(countdownInterval); // Stop countdown
    document.getElementById('countdown').textContent = '';

    const betAmount1 = betAmounts[1] || 0;
    const betAmount2 = betAmounts[2] || 0;

    let totalBetAmount = betAmount1 + betAmount2;
    let totalWinnings = totalBetAmount * (odds / 100);

    // Update balance
    balance += totalWinnings;

    // Reset bet amounts
    betAmounts[1] = 0;
    betAmounts[2] = 0;

    updateBalance();
    document.getElementById('result').textContent = `Claimed: MK ${totalWinnings.toFixed(2)}`;
    document.getElementById('odds').classList.add('hidden');
    document.getElementById('airplane').classList.add('hidden');
    document.getElementById('multipliedMoney').classList.add('hidden');
    document.getElementById('claimButton').classList.add('hidden');
    document.getElementById('result').textContent = '';
    
    // Stop sound
    if (!isMuted) {
        flySound.pause();
        flySound.currentTime = 0;
    }
}

function endGame(isClaimed) {
    clearTimeout(claimTimeout); // Stop the claim timeout
    clearInterval(countdownInterval); // Stop countdown

    document.getElementById('countdown').textContent = '';
    document.getElementById('odds').classList.add('hidden');
    document.getElementById('airplane').classList.add('hidden');
    document.getElementById('multipliedMoney').classList.add('hidden');
    document.getElementById('claimButton').classList.add('hidden');
    
    // Update result message
    if (!isClaimed) {
        document.getElementById('result').textContent = 'You lost. Try again!';
    }

    // Stop sound
    if (!isMuted) {
        flySound.pause();
        flySound.currentTime = 0;
    }
}

// Handle mute toggle
document.getElementById('muteToggle').addEventListener('change', function() {
    isMuted = this.checked;
    if (isMuted) {
        flySound.pause();
    } else if (document.getElementById('airplane').classList.contains('hidden') === false) {
        flySound.play();
    }
});
const request = require('supertest');
const app = require('./server'); // Path to your server file
const mongoose = require('mongoose');
const User = require('./models/User');
const Admin = require('./models/Admin');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/betting-test', { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
    await User.deleteMany({});
    await Admin.deleteMany({});
    
    // Create a sample admin and user
    await Admin.create({ username: 'admin', password_hash: 'hashed_password', balance: 1000 });
    await User.create({ username: 'user1', password_hash: 'hashed_password', balance: 500 });
});

test('should deduct bet amount from user balance and add to admin balance if user loses', async () => {
    const response = await request(app)
        .post('/place-bet')
        .send({ user_id: 'USER_ID', amount: 100 });

    expect(response.status).toBe(200);
    const user = await User.findById('USER_ID');
    const admin = await Admin.findOne();

    expect(user.balance).toBe(400); // 500 - 100
    expect(admin.balance).toBe(1100); // 1000 + 100
});

afterAll(async () => {
    await mongoose.disconnect();
});
function checkAirplaneStatus() {
    fetch('http://localhost:3000/api/airplane-status')
        .then(response => response.json())
        .then(data => {
            if (data.isFlying) {
                // Update game state to show the airplane is flying
            } else {
                // Update game state to show the airplane has stopped
            }
        })
        .catch(error => console.error('Error:', error));
}

// Check status periodically or use WebSocket for real-time updates
setInterval(checkAirplaneStatus, 1000); // Check every second

