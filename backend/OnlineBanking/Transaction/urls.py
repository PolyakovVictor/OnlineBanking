from django.urls import path
from .views import TransactionViewSet, UserTransactionsView, DepositCreateView, CreditCreateView

urlpatterns = [
    path('transfer/', TransactionViewSet.as_view(), name='transfer_funds'),
    path('', UserTransactionsView.as_view(), name='user_transactions'),
    path('deposits/', DepositCreateView.as_view(), name='deposit-create'),
    path('credits/', CreditCreateView.as_view(), name='credit-create'),
]
