from django.db import models

class Menu(models.Model):
    id = models.AutoField(primary_key=True)
    restaurant_name = models.CharField(max_length=255)
    food_items = models.ManyToManyField(MenuItem)

class MenuItem(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=255, null=False)
	description = models.CharField(max_length=255, null=True)
	price = models.IntegerField(null=False)
	image = models.ImageField(max_length=255, null=True)