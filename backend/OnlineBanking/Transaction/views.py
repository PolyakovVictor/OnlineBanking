from decimal import Decimal
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .services import transfer_funds
from .serializers import TransactionSerializer
from Account.models import Account


class TransactionViewSet(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from_account_number = request.data.get('from_account_number')
        to_account_number = request.data.get('to_account_number')
        amount = Decimal(request.data.get('amount'))

        try:
            from_account = Account.objects.get(account_number=from_account_number)
            to_account = Account.objects.get(account_number=to_account_number)
        except Account.DoesNotExist:
            return Response({'error': 'Invalid account'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            transfer_funds(from_account, to_account, amount)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'success': True}, status=status.HTTP_200_OK)
