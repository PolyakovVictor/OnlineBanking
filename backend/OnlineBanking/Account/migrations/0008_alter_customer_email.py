# Generated by Django 5.0.3 on 2024-04-06 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0007_alter_customer_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.EmailField(blank=True, max_length=254, unique=True, verbose_name='email address'),
        ),
    ]
