from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Account, Customer


@receiver(post_migrate)
def create_bank_user(sender, **kwargs):
    if sender.name == 'Account':
        if not Customer.objects.filter(username='Bank').exists():
            bank_customer = Customer.objects.create_superuser(username='Bank', password='bank', address='Bank Address')
            bank_customer.save()
            bank_account = Account.objects.create(customer=bank_customer, account_number='1234567890', account_type='Bank Account', balance=10000000)
