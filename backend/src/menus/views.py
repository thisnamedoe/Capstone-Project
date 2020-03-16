from django.shortcuts import render
from menus.models import Menu, MenuItem, Table 
from django.http import JsonResponse
from django.core import serializers

# Create your views here.
def create(request):
    _restaurant_name = request.POST.get('restaurant_name')

    M = Menu(restaurant_name=_restaurant_name)
    M.save()
    return JsonResponse({"status":"restaurant created"}, status=201)

def get(request):
    _restaurant_name = request.POST.get('restaurant_name')
    obj = Menu.objects.get(restaurant_name=_restaurant_name)
    return JsonResponse({"menu":obj.restaurant_name, "items":[2,3,4]}, status=201, safe=False)

def getmenuitem(request):
    name = request.POST.get('name')
    obj = MenuItem.objects.get(name=name)
    return JsonResponse({"name": obj.name, "description":obj.description,"price":obj.price,"image":obj.image}, status=201)

def delete(request):
    getname = request.POST.get('name')
    obj = Menu.objects.get(name=getname)
    name = obj.delete()
    return JsonResponse({"deleted":name}, status=200, safe = False)

def addmenuitem(request):
    name = request.POST.get('name')
    description = request.POST.get('description')
    price = request.POST.get('price')
    image = request.POST.get('image')
    MI = MenuItem(name=name,description=description,price=price,image=image)
    MI.save()
    return JsonResponse({"item added":name}, status=201)

def removemenuitem(request):
    getname = request.POST.get('name')
    obj = MenuItem.objects.get(name=getname)
    name = obj.delete()
    return JsonResponse({"deleted":getname}, status=200, safe = False)

def addtable(request):
    restname = request.POST.get('restaurant_name')
    menu = Menu.objects.get(restaurant_name=restname)
    tablenum = menu.tables.all().count()
    table = Table(name = restname+'_' +str(tablenum))
    table.save()
    menu.tables.add(table)
    data = menu.tables.all()
    a = list(data)
    return JsonResponse(a,safe=False)
    
def gettables(request):
    restname = request.POST.get('restaurant_name')
    menu = Menu.objects.get(restaurant_name=restname)
    data = menu.tables.all()
    for item in data:
        item['product'] = model_to_dict(item['product'])
    data = serializers.serialize('json', menu.tables.all())
