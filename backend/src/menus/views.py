from django.shortcuts import render
from menus.models import Menu, MenuItem, Table 
from users.models import Customuser
from django.http import JsonResponse
from django.core import serializers
import json

# Create your views here.
def create(request):
    _restaurant_name = request.POST.get('restaurant_name')
    M = Menu(restaurant_name=_restaurant_name)
    M.save()
    return JsonResponse({"success":True, "id":M.id}, status=200)

def get(request):#######list(SomeModel.objects.values())
    body = json.loads(request.body)
    email = body.get('email')
    obj = Menu.objects.get(restaurant_name=email)
    return JsonResponse({"id":obj.id, "items":list(obj.food_items.values())}, status=200)

def getmenuitem(request):
    _id = request.POST.get('id')
    obj = MenuItem.objects.get(id=_id)
    return JsonResponse({"id":obj.id,"name": obj.name, "description":obj.description,"price":obj.price,"image":obj.image}, status=200)

def delete(request):
    _id = request.POST.get("id")
    obj = Menu.objects.get(id=_id)
    name = obj.delete()
    return JsonResponse({"deleted":restaurant_name}, status=200)

def addmenuitem(request):
    restaurant_id = request.POST.get('restaurant_id')
    name = request.POST.get('name')
    description = request.POST.get('description')
    price = request.POST.get('price')
    image = request.POST.get('image')
    MI = MenuItem(name=name,description=description,price=price,image=image)
    MI.save()
    menu = Menu.objects.get(id = restaurant_id)
    menu.food_items.add(MI)
    return JsonResponse({"id": MI.id,"item":MI.name, "restaurant_id": restaurant_id}, status=200)

def removemenuitem(request):
    restaurant_id = request.POST.get('restaurant_id')
    menu = Menu.objects.get(id = restaurant_id)
    _id = request.POST.get('item_id')
    obj = MenuItem.objects.get(id=_id)
    menu.food_items.remove(obj)
    name = obj.delete()
    return JsonResponse({"deleted":name}, status=200)

def addtable(request):
    _id = request.POST.get('restaurant_id')
    menu = Menu.objects.get(id=_id)
    tablenum = menu.tables.all().count()
    table = Table(name = menu.restaurant_name+'_' +str(tablenum))
    table.save()
    menu.tables.add(table)
    return JsonResponse({"table_id": table.id,"tablestring":table.name, "restaurant_id": menu.id}, status=200)
    
def deletetable(request):
    _id = request.POST.get('restaurant_id')
    tableid = request.POST.get('table_id')
    menu = Menu.objects.get(id=_id)
    table = Table.objects.get(id= _id)
    menu.tables.remove(table)
    name = table.delete()
    return JsonResponse({"deleted":name}, status=200)
