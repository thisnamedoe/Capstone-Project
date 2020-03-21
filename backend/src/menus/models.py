from django.db import models


class MenuItem(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=255, null=False, unique=True)
	price = models.IntegerField(null=False)
	image = models.CharField(max_length=255, null=True)

class Table(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True)

class Menu(models.Model):
    id = models.AutoField(primary_key=True)
    restaurant_name = models.CharField(max_length=255)
    food_items = models.ManyToManyField(MenuItem)
    tables = models.ManyToManyField(Table)

