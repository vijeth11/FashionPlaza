# Generated by Django 3.0 on 2021-05-09 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_auto_20210509_0402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='Cost',
            field=models.DecimalField(decimal_places=4, max_digits=9),
        ),
    ]
