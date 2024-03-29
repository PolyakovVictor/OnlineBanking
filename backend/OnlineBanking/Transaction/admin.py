from django.contrib import admin
from .models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('account', 'transaction_type', 'amount', 'date', 'description')
    list_filter = ('transaction_type', 'date')
    search_fields = ('account__account_number', 'description')
