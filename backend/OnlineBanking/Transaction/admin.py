from django.contrib import admin
from .models import Transaction


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('from_account', 'to_account', 'amount', 'date')

admin.site.register(Transaction, TransactionAdmin)
