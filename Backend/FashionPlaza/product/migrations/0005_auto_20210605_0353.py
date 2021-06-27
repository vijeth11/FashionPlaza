# Generated by Django 3.0 on 2021-06-05 07:53

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_auto_20210509_1508'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='BestSeller',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='product',
            name='ItemAddedTime',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]