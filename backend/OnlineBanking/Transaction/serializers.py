from rest_framework import serializers
from .models import Transaction
from .models import Deposit


class TransactionSerializer(serializers.ModelSerializer):
    from_account_number = serializers.CharField(source='from_account.account_number')
    to_account_number = serializers.CharField(source='to_account.account_number')

    class Meta:
        model = Transaction
        fields = ['from_account_number', 'to_account_number', 'amount', 'description', 'category', 'date']


class DepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deposit
        fields = ['amount', 'term', 'interest_rate', 'start_date', 'end_date']
