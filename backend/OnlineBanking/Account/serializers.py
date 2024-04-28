from rest_framework import serializers

from Account.utils import generate_account_number
from .models import Customer, Account, EmailConfirmation


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_number', 'account_type', 'balance']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'email', 'phone_number', 'first_name', 'last_name', 'email_confirmed', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        customer = Customer(**validated_data)
        if password is not None:
            customer.set_password(password)
        customer.save()
        account = Account.objects.create(
            customer=customer,
            account_number=generate_account_number(),
            account_type='default',
            balance=0
        )
        return customer


class ConfirmationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailConfirmation
        fields = '__all__'
