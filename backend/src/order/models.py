from django.db import models
from menus.models import *

class order(models.Model):
    id = models.AutoField(primary_key=True)
    restaurant_name = models.CharField(max_length=255)
    food_items = models.ManyToManyField(MenuItem)
    tables = models.ForeignKey(Table, on_delete=models.CASCADE)