from rest_framework import serializers
from Transaction.serializers import TransactionSerializer
from Account.utils import generate_account_number
from .models import Customer, Account, EmailConfirmation


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_number', 'account_type', 'balance']


class CustomerSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)
    transactions = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = ['id', 'username', 'email', 'phone_number', 'first_name', 'last_name', 'email_confirmed', 'password', 'account', 'transactions']
        extra_kwargs = {'password': {'write_only': True}}

    def get_transactions(self, obj):
        account = obj.account
        transactions = account.outgoing_transactions.all() | account.incoming_transactions.all()
        return TransactionSerializer(transactions, many=True).data

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
