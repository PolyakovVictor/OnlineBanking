from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Customer, Account, EmailConfirmation


class CustomerModelTestCase(TestCase):
    def test_create_customer(self):
        customer = Customer.objects.create(username='testuser', email='test@example.com')
        self.assertEqual(customer.username, 'testuser')


class AccountModelTestCase(TestCase):
    def test_create_account(self):
        customer = Customer.objects.create(username='testuser', email='test@example.com')
        account = Account.objects.create(customer=customer, account_number='1234567890123456')
        self.assertEqual(account.account_number, '1234567890123456')


class ConfirmEmailViewTestCase(TestCase):
    def test_confirm_email(self):
        customer = Customer.objects.create(username='testuser', email='test@example.com')
        email_confirmation = EmailConfirmation.objects.create(customer=customer, confirmation_code='123456')

        client = APIClient()
        url = reverse('confirm_email')
        data = {'confirmation_code': '123456'}
        client.force_authenticate(customer)
        response = client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Customer.objects.get(id=customer.id).email_confirmed)
        self.assertFalse(EmailConfirmation.objects.filter(customer=customer).exists())
