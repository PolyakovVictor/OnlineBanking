from django.urls import path
from .views import CustomerViewSet, AccountViewSet, ConfirmEmailView, MyInfoView

urlpatterns = [
    path('customers/', CustomerViewSet.as_view({'get': 'list', 'post': 'create'}), name='customer-list'),
    path('customers/<int:pk>/', CustomerViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='customer-detail'),
    path('customers/me/', MyInfoView.as_view(), name='my-info'),
    path('confirm-email', ConfirmEmailView.as_view(), name='confirm_email'),
    path('', AccountViewSet.as_view({'get': 'list', 'post': 'create'}), name='account-list'),
    path('<int:pk>/', AccountViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='account-detail'),
]
