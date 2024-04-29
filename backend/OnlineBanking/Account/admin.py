from django.contrib import admin
from .models import Account, Customer, EmailConfirmation
from Transaction.models import Transaction


class TransactionInline(admin.StackedInline):
    model = Transaction
    extra = 0
    fk_name = "from_account"


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


@admin.register(EmailConfirmation)
class EmailConfirmationAdmin(admin.ModelAdmin):
    list_display = ['customer', 'confirmation_code', 'created_at']
    search_fields = ['customer__username', 'customer__email', 'confirmation_code']
    list_filter = ['created_at']
