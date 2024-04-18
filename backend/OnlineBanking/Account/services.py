from django.core.mail import send_mail
from django.contrib.auth.models import User
from .utils import create_email_confirmation


def send_confirmation_email(user: User):
    confirmation_code = create_email_confirmation(user)

    subject = 'Підтвердження адреси електронної пошти'
    message = f'Привіт, {user.username}! Ваш код підтвердження: {confirmation_code}'
    from_email = 'djangosmtp32@gmail.com'
    to_email = user.email

    send_mail(subject, message, from_email, [to_email])
