from decimal import Decimal
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .services import transfer_funds
from .serializers import TransactionSerializer
from Account.models import Account
from .models import Transaction


class TransactionViewSet(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            print('here-->>>', serializer.validated_data)
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
            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
