from django.urls import path
from .views import TopUpView, TransactionViewSet, UserTransactionsView, DepositCreateView, CreditCreateView

urlpatterns = [
    path('topup/', TopUpView.as_view(), name='topup-funds'),
    path('transfer/', TransactionViewSet.as_view(), name='transfer_funds'),
    path('', UserTransactionsView.as_view(), name='user_transactions'),
    path('deposits/', DepositCreateView.as_view(), name='deposit-create'),
    path('credits/', CreditCreateView.as_view(), name='credit-create'),
]
