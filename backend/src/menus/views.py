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
    body = json.loads(request.body)
    restaurant_email = body.get('email')
    name = body.get('name')
    price = body.get('price')
    image = body.get('image')
    MI = MenuItem(name=name,price=price,image=image)
    MI.save()
    menu = Menu.objects.get(restaurant_name = restaurant_email)
    menu.food_items.add(MI)
    return JsonResponse({"id": MI.id,"item":MI.name, "restaurant_email": restaurant_email}, status=200)

def removemenuitem(request):
    body = json.loads(request.body)
    restaurant_email = body.get('email')
    menu = Menu.objects.get(restaurant_name = restaurant_email)
    _id = body.get('item_id')
    obj = MenuItem.objects.get(id=_id)
    menu.food_items.remove(obj)
    name = obj.delete()
    return JsonResponse({"deleted":name}, status=200)

def editmenuitem(request):
    body = json.loads(request.body)
    _id = body.get('item_id')
    MI = MenuItem.objects.get(id=_id)
    MI.restaurant_email = body.get('email')
    MI.name = body.get('name')
    MI.price = body.get('price')
    MI.image = body.get('image')
    return JsonResponse({"id": MI.id,"item":MI.name, "restaurant_email": restaurant_email}, status=200)

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

def getrestaurantfromtable(request):
    _tablestring = request.POST.get('tablestring')
    _restaurant_name = _tablestring.split("_")[0]
    obj = Menu.objects.get(restaurant_name=_restaurant_name)
    return JsonResponse({"id":obj.id, "items":list(obj.food_items.values())}, status=200)