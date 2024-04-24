from rest_framework import serializers
from .models import Customer, Account, EmailConfirmation


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_number', 'account_type', 'balance']


class CustomerSerializer(serializers.ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = Customer
        fields = ['id', 'email', 'phone_number', 'first_name', 'last_name', 'email_confirmed', 'account']


class ConfirmationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailConfirmation
        fields = '__all__'
