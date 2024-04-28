# Generated by Django 5.0.3 on 2024-04-24 14:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0012_customer_email_confirmed'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='account',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owner', to='Account.account'),
        ),
    ]