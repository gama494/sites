const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/betting', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: String,
    password_hash: String,
    balance: Number
});

const BetSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    amount: Number,
    outcome: String,
    timestamp: { type: Date, default: Date.now }
});

const AdminSchema = new mongoose.Schema({
    username: String,
    password_hash: String,
    balance: Number
});

const User = mongoose.model('User', UserSchema);
const Bet = mongoose.model('Bet', BetSchema);
const Admin = mongoose.model('Admin', AdminSchema);

// Existing bet placement logic...

// Admin dashboard to view balance
app.get('/admin-dashboard', async (req, res) => {
    const admin = await Admin.findOne(); // Assuming a single admin
    if (admin) {
        res.send({ balance: admin.balance });
    } else {
        res.status(404).send('Admin not found');
    }
});

// Withdraw money
app.post('/withdraw', async (req, res) => {
    const { amount } = req.body;
    const admin = await Admin.findOne(); // Assuming a single admin
    
    if (!admin) {
        return res.status(404).send('Admin not found');
    }

    if (amount <= 0 || amount > admin.balance) {
        return res.status(400).send('Invalid amount');
    }

    // Deduct the amount from admin's balance
    admin.balance -= amount;
    await admin.save();

    // Here you might want to handle the actual withdrawal process, such as transferring the amount to an external account

    res.send({ balance: admin.balance });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
describe('Admin Dashboard', () => {
    it('should update admin balance after a user loses a bet', () => {
        cy.visit('http://localhost:3000/admin-dashboard');

        // Mock a losing bet and verify balance
        cy.request('POST', '/place-bet', { user_id: 'USER_ID', amount: 100 });

        cy.get('#admin-balance').should('contain', 'Admin Balance: $1100');
    });
});
