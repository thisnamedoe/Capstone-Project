# Generated by Django 2.1.1 on 2020-03-16 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='isRestaurant',
            field=models.BooleanField(default=False),
        ),
    ]
