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
from .utils import generate_account_number


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        customer = serializer.save()

        access_token = AccessToken.for_user(customer)
        refresh_token = RefreshToken.for_user(customer)

        send_confirmation_email(customer)

        headers = self.get_success_headers(serializer.data)
        return Response({
            'access': str(access_token),
            'refresh': str(refresh_token),
            'user': serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class ConfirmEmailView(APIView):
    serializer_class = ConfirmationCodeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            customer = Customer.objects.get(email=request.user.email)
        except Customer.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['customer'] = customer.id
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
            return Response({'error': 'Invalid confirmation code'}, status=status.HTTP_400_BAD_REQUEST)


class MyInfoView(APIView):
    serializer_class = CustomerSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(user)
        print(serializer.data)
        serialized_user = serializer.data

        return Response(serialized_user)
