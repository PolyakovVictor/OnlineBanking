from django.db import models
from Account.models import Account


class Transaction(models.Model):
    from_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='outgoing_transactions')
    to_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='incoming_transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Transaction from {self.from_account} to {self.to_account} for {self.amount}"


class Deposit(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='deposits')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    term = models.IntegerField()
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Deposit for {self.account.account_number} (Amount: {self.amount})"
