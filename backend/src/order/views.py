from django.shortcuts import render

# Create your views here.

def create(request):
    _restaurant_name = request.body('restaurant_name')
    items = request.body.""
    M = Menu(restaurant_name=_restaurant_name)
    M.save()
    return JsonResponse({"status":"restaurant created"}, status=201)

def get(request):
    _restaurant_name = request.POST.get('restaurant_name')
    obj = Menu.objects.get(restaurant_name=_restaurant_name)
    return JsonResponse({"menu":obj.restaurant_name, "items":[2,3,4]}, status=201, safe=False)

def delete(request):
    getid = request.POST.get('id')
    obj = Menu.objects.get(name=getname)
    name = obj.delete()
    return JsonResponse({"deleted":name}, status=200, safe = False)