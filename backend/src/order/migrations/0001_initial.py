# Generated by Django 2.1.1 on 2020-03-16 16:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('menus', '0002_auto_20200227_1537'),
    ]

    operations = [
        migrations.CreateModel(
            name='order',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('restaurant_name', models.CharField(max_length=255)),
                ('food_items', models.ManyToManyField(to='menus.MenuItem')),
                ('tables', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menus.Table')),
            ],
        ),
    ]
