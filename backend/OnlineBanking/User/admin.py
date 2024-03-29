from django.contrib import admin
from .models import CustomUser


@admin.register(CustomUser)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'phone_number', 'first_name', 'last_name')
