from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.conf import settings
from django.core.mail import send_mail 
from users.models import Customuser
from django.utils.crypto import get_random_string
import hashlib
import os


def create(request):
    _password = request.POST.get('password')
    _email = request.POST.get('email')
    _isRestaurant = request.POST.get('isRestaurant')
    #_restaurant = request.POST.get('restaurant')
    # other stuff too
    # create using function or modelname.objects.create(param1=x, param2 = y.....etc)
    #if _restaurant == 'yes':
    #    newuser = CustomUserManager().create_restaurant_user(_email, _password)
    #else:
    #    newuser = CustomUserManager().create_user(_email, _password)
        #return HttpResponse(newuser.get('is_restaurant'))
    #email('user_email', 0)
    _salt = get_random_string(length=32)
    password = hashlib.sha256(_password.encode()).hexdigest()
    user = Customuser(email=_email, password=password, isRestaurant= _isRestaurant)
    user.save()
    return JsonResponse({"success":True}, status=200)

def getuser(request):
    _username = request.POST.get('email')
    obj = Customuser.objects.get(email=_username)
    return JsonResponse({"isRestaurant":obj.isRestaurant,"username": obj.email}, status=200, safe = False)

def resetpass(request):
    # reset user password
    # use a hash based on a user's username+salt to generate a link, and we can use this to verify with an email that contains a link with the hash used in the user params (hash as well as the username should be in the link). (one time use links)
    _email = request.POST.get('email')
    _password = request.POST.get('password')
    obj = Customuser.objects.get(email=_email)
    obj.password = hashlib.sha256(_password.encode()).hexdigest()
    obj.save()
    return JsonResponse({"success":True}, status=200, safe = False)


def delete(request):
    _username = request.POST.get('email')
    #get object
    obj = Customuser.objects.get(email=_username)
#    return HttpResponse(obj.is_restaurant)
    name = obj.delete()
    return JsonResponse({"deleted":_username}, status=200, safe = False)

def authenticate(request):
    try:
        print('here')
        _username = request.POST.get('email')
        _password = request.POST.get('password')
        checkpassword = hashlib.sha256(_password.encode()).hexdigest()
        obj = Customuser.objects.get(email=_username)

        if obj.password == checkpassword:
            return JsonResponse({"success":True, "isRestaurant":obj.isRestaurant, "token":hashlib.md5(os.urandom(15)).hexdigest()}, status=200, safe = False)
        else:
            return JsonResponse({"success":False, "message": "Invalid username or password"}, status=400, safe = False)
    except:
        return JsonResponse({"success":False, "message": "Invalid username or password"}, status=400, safe = False)

def email(toemail, typeof):
    try:
        # 0 for new email, 1 for reset password
        if typeof == 0:
            from_email = [settings.EMAIL_HOST_USER]
            send_mail('Welcome', 'Hello', from_email, [toemail])
        elif typeof ==1:
            #stuff
            pass
        return HttpResponse('sent', status=200)
    except:
        return HttpResponse('error, email not sent', status = 500)
    
