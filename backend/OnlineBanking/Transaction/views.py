from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .services import transfer_funds
from .serializers import TransactionSerializer, DepositSerializer, CreditSerializer
from Account.models import Account
from .models import Transaction, Deposit, Credit
from rest_framework import generics


class TransactionViewSet(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            from_account_number = serializer.data.get('from_account_number')
            to_account_number = serializer.data.get('to_account_number')
            amount = serializer.validated_data['amount']
            category = serializer.validated_data.get('category', None)
            description = serializer.validated_data.get('description', None)

            try:
                from_account = Account.objects.get(account_number=from_account_number)
                to_account = Account.objects.get(account_number=to_account_number)
                transfer_funds(from_account, to_account, amount)

                Transaction.objects.create(
                    from_account=from_account,
                    to_account=to_account,
                    amount=amount,
                    category=category,
                    description=description
                )

                return Response({'success': True}, status=status.HTTP_200_OK)
            except (ValueError, ObjectDoesNotExist) as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserTransactionsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = Account.objects.get(customer=request.user)
        from_transactions = Transaction.objects.filter(from_account=account)
        to_transactions = Transaction.objects.filter(to_account=account)
        from_serializer = TransactionSerializer(from_transactions, many=True)
        to_serializer = TransactionSerializer(to_transactions, many=True)
        return Response({'sender': from_serializer.data, 'receiver': to_serializer.data}, status=status.HTTP_200_OK)


class DepositCreateView(generics.ListCreateAPIView):
    queryset = Deposit.objects.all()
    authentication_classes = [JWTAuthentication]
    serializer_class = DepositSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        account = self.request.user.account
        serializer.save(account=account)

    def get_queryset(self):
        return Deposit.objects.filter(account=self.request.user.account)


class CreditCreateView(generics.CreateAPIView):
    queryset = Credit.objects.all()
    authentication_classes = [JWTAuthentication]
    serializer_class = CreditSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        account = self.request.user.account
        serializer.save(account=account)
