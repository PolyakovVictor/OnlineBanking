from django.db import transaction


@transaction.atomic
def transfer_funds(from_account, to_account, amount):
    if from_account.balance < amount:
        raise ValueError("Insufficient funds")

    from_account.balance -= amount
    to_account.balance += amount

    from_account.save()
    to_account.save()
