import random
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import CustomerSerializer, AccountSerializer
from .models import Customer, Account
from django.core.mail import send_mail


def generate_account_number():
    # Генерация первой части номера карты (6 цифр)
    first_six_digits = ''.join([str(random.randint(0, 9)) for _ in range(6)])

    # Генерация оставшихся 10 цифр номера карты
    remaining_digits = ''.join([str(random.randint(0, 9)) for _ in range(10)])

    # Формирование и возврат итогового номера карты
    return first_six_digits + remaining_digits


class CustomerViewSet(viewsets.ModelViewSet):
    # send_mail(
    #     'Subject here',
    #     'Here is the message.',
    #     'djangosmtp32@gmail.com',
    #     ['lolgg1855@gmail.com'],
    #     fail_silently=False,
    # )
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        customer = self.perform_create(serializer)

        # Создаем новый Account для нового Customer
        account = Account.objects.create(
            customer=customer,
            account_number=generate_account_number(),  # Здесь вам нужно реализовать генерацию уникального account_number
            account_type='default',
            balance=0
        )

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
