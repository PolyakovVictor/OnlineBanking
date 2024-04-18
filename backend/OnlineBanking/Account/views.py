import random
from django.views import View
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomerSerializer, AccountSerializer
from .models import Customer, Account, EmailConfirmation
from .services import send_confirmation_email


def generate_account_number():

    first_six_digits = ''.join([str(random.randint(0, 9)) for _ in range(6)])

    remaining_digits = ''.join([str(random.randint(0, 9)) for _ in range(10)])

    return first_six_digits + remaining_digits


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        customer = self.perform_create(serializer)

        account = Account.objects.create(
            customer=customer,
            account_number=generate_account_number(),
            account_type='default',
            balance=0
        )

        send_confirmation_email(customer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class ConfirmEmailView(View):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        user = request.user
        print(request.data)

        confirmation_code = request.data.get('confirmation_code')
        if not confirmation_code:
            return Response({'error': 'Confirmation code is required'}, status=status.HTTP_400_BAD_REQUEST)

        email_confirmation = EmailConfirmation.objects.filter(customer=user, confirmation_code=confirmation_code).first()
        if email_confirmation:
            user.email_confirmed = True
            user.save()
            email_confirmation.delete()
            return Response({'message': 'Email confirmed successfully'})
        else:
            return Response({'error': 'Invalid confirmation code'}, status=400)
