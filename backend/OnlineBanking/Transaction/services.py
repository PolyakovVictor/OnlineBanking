from django.db import transaction
from .models import Transaction


@transaction.atomic
def transfer_funds(from_account, to_account, amount):
    print('from_account.balance ', type(from_account.balance),  ' amount: ', type(amount))
    if from_account.balance < amount:
        raise ValueError("Insufficient funds")

    from_account.balance -= amount
    to_account.balance += amount

    from_account.save()
    to_account.save()

    Transaction.objects.create(
        from_account=from_account,
        to_account=to_account,
        amount=amount
    )
