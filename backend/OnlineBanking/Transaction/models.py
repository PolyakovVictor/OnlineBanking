from django.db import models
from Account.models import Account, Customer


class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    receiver = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='received_transactions')
    transaction_type = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=200)

    class Meta:
        ordering = ['-date']
