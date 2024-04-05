from rest_framework import viewsets
from .serializers import CustomerSerializer, AccountSerializer
from .models import Customer, Account


class CustomerViewSet(viewsets.ModelViewSet):
    send_mail(
        'Subject here',
        'Here is the message.',
        'djangosmtp32@gmail.com',
        ['lolgg1855@gmail.com'],
        fail_silently=False,
    )    
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer