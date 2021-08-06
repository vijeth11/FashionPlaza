# Generated by Django 3.0 on 2021-08-05 14:16

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0006_auto_20210606_0234'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='Size',
            field=models.CharField(default='', max_length=200, validators=[django.core.validators.RegexValidator(code='invalid_size', message='Size takes only numbers coma seperated', regex='[^0-9,]')]),
        ),
    ]