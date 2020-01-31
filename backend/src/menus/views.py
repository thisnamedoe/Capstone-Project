from django.shortcuts import render
from menus.models import Menu, MenuItem
from django.http import JsonResponse

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