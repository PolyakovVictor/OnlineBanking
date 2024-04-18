import secrets
from .models import EmailConfirmation


def create_email_confirmation(user):
    confirmation_code = secrets.token_urlsafe(8)
    email_confirmation = EmailConfirmation.objects.create(customer=user, confirmation_code=confirmation_code)
    return confirmation_code
