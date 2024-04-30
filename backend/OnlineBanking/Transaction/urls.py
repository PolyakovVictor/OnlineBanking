from django.urls import path
from .views import TransactionViewSet, UserTransactionsView

urlpatterns = [
    path('transfer/', TransactionViewSet.as_view(), name='transfer_funds'),
    path('', UserTransactionsView.as_view(), name='user_transactions'),
]
