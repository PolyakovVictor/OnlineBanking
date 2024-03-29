from django.urls import path
from .views import CustomerViewSet, AccountViewSet

urlpatterns = [
    path('customers/', CustomerViewSet.as_view({'get': 'list', 'post': 'create'}), name='customer-list'),
    path('customers/<int:pk>/', CustomerViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='customer-detail'),
    path('accounts/', AccountViewSet.as_view({'get': 'list', 'post': 'create'}), name='account-list'),
    path('accounts/<int:pk>/', AccountViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='account-detail'),
]