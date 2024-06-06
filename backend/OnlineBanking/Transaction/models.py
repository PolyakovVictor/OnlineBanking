from django.db import models, transaction
from Account.models import Account, Customer
from django.utils import timezone
from .services import transfer_funds


class Transaction(models.Model):
    from_account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="outgoing_transactions"
    )
    to_account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="incoming_transactions"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Transaction from {self.from_account} to {self.to_account} for {self.amount}"


class Deposit(models.Model):
    account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="deposits"
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    term = models.IntegerField()
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Deposit for {self.account.account_number} (Amount: {self.amount})"

    def save(self, *args, **kwargs):
        # Check if this is a new deposit
        if not self.pk:
            with transaction.atomic():
                from_account = self.account
                bank = Customer.objects.get(username="Bank")
                bank_account = Account.objects.get(customer=bank)

                # Transfer funds from user account to bank account
                transfer_funds(from_account, bank_account, self.amount)

                # Create the corresponding transaction
                Transaction.objects.create(
                    from_account=from_account,
                    to_account=bank_account,
                    amount=self.amount,
                    date=timezone.now(),
                    category="Deposit",
                    description=f"Deposit amount from {from_account.account_number}",
                )

                super().save(*args, **kwargs)  # Save the deposit instance

        else:
            super().save(*args, **kwargs)


class Credit(models.Model):
    account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="credits"
    )
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
                bank = Customer.objects.get(username="Bank")

                bank_account = Account.objects.get(customer=bank)

                # Create the corresponding transaction
                Transaction.objects.create(
                    from_account=bank_account,
                    to_account=self.account,
                    amount=self.amount,
                    date=timezone.now(),
                    category="Credit",
                    description=f"Credit amount for {self.account.account_number}",
                )

                transfer_funds(bank_account, self.account, self.amount)

        else:
            super().save(*args, **kwargs)
