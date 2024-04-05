from django.contrib import admin
from .models import Account, Customer
from Transaction.models import Transaction


class TransactionInline(admin.TabularInline):
    model = Transaction
    extra = 0


class AccountInline(admin.StackedInline):
    model = Account
    inlines = [TransactionInline]
    extra = 0


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    inlines = [AccountInline]
    list_display = ('username', 'email', 'first_name', 'last_name', 'phone_number', 'address')


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    inlines = [TransactionInline]
    list_display = ('account_number', 'account_type', 'balance', 'customer')
