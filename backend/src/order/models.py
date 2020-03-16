from django.db import models
from menus.models import *
from users.models import *

class Order(models.Model):
    id = models.AutoField(primary_key=True,)
    restaurant_name = models.CharField(max_length=255, null=True)
    restaurant = models.ForeignKey(Menu, on_delete=models.CASCADE)
    food_items = models.ManyToManyField(MenuItem, blank = True)
    tables = models.ForeignKey(Table, on_delete=models.CASCADE)
    pending = models.BooleanField(default = True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(Customuser, on_delete=models.CASCADE)