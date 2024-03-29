from django.urls import path
from .views import TransactionViewSet

urlpatterns = [
    path('', TransactionViewSet.as_view({'get': 'list', 'post': 'create'}), name='transaction-list'),
    path('<int:pk>/', TransactionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='transaction-detail'),
]