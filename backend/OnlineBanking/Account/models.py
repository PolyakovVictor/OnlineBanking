from django.db import models
from django.contrib.auth.models import AbstractUser


class Customer(AbstractUser):
    username = models.CharField(max_length=150, blank=True, unique=True)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=200)
    email = models.EmailField(("email address"), blank=True, unique=True)


class Account(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='accounts')
    account_number = models.CharField(max_length=20, unique=True)
    account_type = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
