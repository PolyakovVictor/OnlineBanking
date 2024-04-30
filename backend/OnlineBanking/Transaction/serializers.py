from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    from_account_number = serializers.CharField(source='from_account.account_number')
    to_account_number = serializers.CharField(source='to_account.account_number')

    class Meta:
        model = Transaction
        fields = ['from_account_number', 'to_account_number', 'amount', 'description', 'category']
