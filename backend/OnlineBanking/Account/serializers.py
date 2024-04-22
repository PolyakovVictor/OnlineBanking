from rest_framework import serializers
from .models import Customer, Account, EmailConfirmation


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='customer.email', read_only=True)
    first_name = serializers.CharField(source='customer.first_name', read_only=True)
    last_name = serializers.CharField(source='customer.last_name', read_only=True)
    phone_number = serializers.CharField(source='customer.phone_number', read_only=True)

    class Meta:
        model = Account
        fields = ['id', 'customer', 'account_number', 'account_type', 'balance', 'email', 'first_name', 'last_name', 'phone_number']


class ConfirmationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailConfirmation
        fields = '__all__'
