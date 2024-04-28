from rest_framework import serializers

from Account.utils import generate_account_number
from .models import Customer, Account, EmailConfirmation


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_number', 'account_type', 'balance']


class CustomerSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)

    class Meta:
        model = Customer
        fields = ['id', 'username', 'email', 'phone_number', 'first_name', 'last_name', 'email_confirmed', 'password', 'account']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        account_data = validated_data.pop('account', None)
        password = validated_data.pop('password', None)
        customer = Customer.objects.create_user(
            password=password,
            **validated_data
        )
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
