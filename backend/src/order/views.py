from django.shortcuts import render
from order.models import Order
from menus.models import *
from users.models import Customuser
from django.http import JsonResponse
import json
# Create your views here.

def create(request):
    body = json.loads(request.body)
    restaurant_email = body.get('email')
    menu = Menu.objects.get(id = restaurant_id)
    ordered_by = body['ordered_by']
    customer = Customuser.objects.get(restaurant_name = restaurant_email)
    items = body['items']
    items = MenuItem.objects.filter(id__in=(items))
    table_id = body['table_id']
    tables = Table.objects.get(id = table_id)
    obj = Order(restaurant = menu, tables = tables, pending = True, created_by = customer)
    obj.save()
    obj.food_items.set(items)
    #return JsonResponse({"order":list(obj.values())}, status=200)
    return JsonResponse({"restaurant":obj.restaurant.restaurant_name,"success": True}, status=200)

def get(request):
    _restaurant_name = request.POST.get('restaurant_name')
    orders = Order.objects.filter(restaurant_name=_restaurant_name)
    return JsonResponse({"orders": list(orders.values())}, status=200)

def closeorder(request):
    reqbody = json.loads(request.body)
    orderid = reqbody['order_id']
    obj = Order.objects.filter(id = orderid)
    obj.pending = False
    obj.save()
    return JsonResponse({"success":True}, status=200)

def delete(request):
    getid = request.POST.get('order_id')
    obj = Order.objects.get(name=getname)
    name = obj.delete()
    return JsonResponse({"deleted":name}, status=200, safe = False)