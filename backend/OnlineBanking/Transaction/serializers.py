from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'account', 'amount', 'transaction_type', 'timestamp']
        read_only_fields = ['timestamp']

    def create(self, validated_data):
        account = validated_data.get('account')
        amount = validated_data.get('amount')
        transaction_type = validated_data.get('transaction_type')

        if transaction_type == 'deposit':
            account.balance += amount
        else:
            if account.balance < amount:
                raise serializers.ValidationError("Недостаточно средств на счете.")
            account.balance -= amount

        account.save()
        transaction = Transaction.objects.create(**validated_data)
        return transaction
