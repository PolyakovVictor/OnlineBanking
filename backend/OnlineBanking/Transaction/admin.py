from django.contrib import admin
from .models import Transaction, Deposit


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('from_account', 'to_account', 'amount', 'date', 'description', 'category')


admin.site.register(Transaction, TransactionAdmin)


class DepositAdmin(admin.ModelAdmin):
    list_display = ('account', 'amount', 'term', 'interest_rate', 'start_date', 'end_date', 'created_at', 'updated_at')


admin.site.register(Deposit, DepositAdmin)
