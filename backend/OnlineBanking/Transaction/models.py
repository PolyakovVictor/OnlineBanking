from django.db import models, transaction
from Account.models import Account, Customer
from django.utils import timezone


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


class Credit(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='credits')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    term = models.IntegerField()
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    monthly_payment = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Credit for {self.account.account_number} (Amount: {self.amount})"

    def save(self, *args, **kwargs):
        # Check if this is a new credit
        if not self.pk:
            with transaction.atomic():
                super().save(*args, **kwargs)  # Save the credit instance first
                bank = Customer.objects.get(username='Bank')
                print(bank)

                bank_account = Account.objects.get(customer=bank)
                print(bank_account)

                # Create the corresponding transaction
                Transaction.objects.create(
                    from_account=bank_account,
                    to_account=self.account,
                    amount=self.amount,
                    date=timezone.now(),
                    category='Credit',
                    description=f"Credit amount for {self.account.account_number}"
                )

        else:
            super().save(*args, **kwargs)
