from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class Customer(AbstractUser):
    username = models.CharField(max_length=150, blank=True, unique=True)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=200)
    email = models.EmailField(("email address"), blank=True, unique=True)
    email_confirmed = models.BooleanField(default=False)


class Account(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, related_name='account')
    account_number = models.CharField(max_length=20, unique=True)
    account_type = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)


class EmailConfirmation(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)
    confirmation_code = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Confirmation code for {self.customer.username}"
