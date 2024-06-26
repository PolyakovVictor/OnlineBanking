# Generated by Django 5.0.3 on 2024-04-06 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0005_alter_customer_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='customer',
            name='username',
            field=models.CharField(blank=True, max_length=150, unique=True),
        ),
    ]
