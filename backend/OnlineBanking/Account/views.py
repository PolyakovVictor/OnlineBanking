import random
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomerSerializer, AccountSerializer, ConfirmationCodeSerializer
from .models import Customer, Account, EmailConfirmation
from .services import send_confirmation_email
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.hashers import make_password


def generate_account_number():

    first_six_digits = ''.join([str(random.randint(0, 9)) for _ in range(6)])

    remaining_digits = ''.join([str(random.randint(0, 9)) for _ in range(10)])

    return first_six_digits + remaining_digits


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def create(self, request, *args, **kwargs):
        request.data['password'] = make_password(request.data['password'])
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

        access_token = AccessToken.for_user(customer)
        refresh_roken = RefreshToken.for_user(customer)
        headers = self.get_success_headers(serializer.data)
        return Response({'access': str(access_token), 'refresh': str(refresh_roken), 'user': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class ConfirmEmailView(APIView):
    serializer_class = ConfirmationCodeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        customer = Customer.objects.get(email=request.user)
        data = request.data.copy()
        data['customer'] = customer.id

        print(data)
        confirmation_code = request.data.get('confirmation_code')
        if not confirmation_code:
            return Response({'error': 'Confirmation code is required'}, status=status.HTTP_400_BAD_REQUEST)

        email_confirmation = EmailConfirmation.objects.filter(customer=customer, confirmation_code=confirmation_code).first()
        if email_confirmation:
            customer.email_confirmed = True
            customer.save()
            email_confirmation.delete()
            return Response({'message': 'Email confirmed successfully'})
        else:
            return Response({'error': 'Invalid confirmation code'}, status=400)


class MyInfoView(APIView):
    serializer_class = CustomerSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone_number': user.phone_number
        })
