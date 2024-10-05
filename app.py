class Bank:
    def __init__(self):
        self.accounts = {}  # Dictionary to store user accounts and balances

    def create_account(self, user_id):
        if user_id not in self.accounts:
            self.accounts[user_id] = 0  # Initialize account with 0 balance
            return True
        return False

    def deposit(self, user_id, amount):
        if user_id in self.accounts and amount > 0:
            self.accounts[user_id] += amount
            return True
        return False

    def withdraw(self, user_id, amount):
        if user_id in self.accounts and 0 < amount <= self.accounts[user_id]:
            self.accounts[user_id] -= amount
            return True
        return False

    def check_balance(self, user_id):
        return self.accounts.get(user_id, 0)
