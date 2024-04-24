import random
import secrets
from .models import EmailConfirmation


def create_email_confirmation(user):
    confirmation_code = secrets.token_urlsafe(8)
    email_confirmation = EmailConfirmation.objects.create(customer=user, confirmation_code=confirmation_code)
    return confirmation_code


def generate_account_number():
    first_six_digits = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    remaining_digits = ''.join([str(random.randint(0, 9)) for _ in range(10)])
    return first_six_digits + remaining_digits
