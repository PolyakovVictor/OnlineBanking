from django.db import models
from Account.models import Account


class Transaction(models.Model):
    from_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='outgoing_transactions')
    to_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='incoming_transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction from {self.from_account} to {self.to_account} for {self.amount}"
