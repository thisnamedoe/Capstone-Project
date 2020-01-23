from django.shortcuts import render
from users.models import Menu, MenuItem

# Create your views here.
def create(request):
    _restaurant_name = request.POST.get('restaurant_name')
    _description = request.POST.get('description')

    M = Menu(restaurant_name=_restaurant_name, food_items=_description)

def get(request):
    pass

def delete(request):
    pass

def addmenuitem(request):
    pass

def removemenuitem(request):
    pass