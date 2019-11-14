from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.conf import settings
from django.core.mail import send_mail


def create(request):
    pass
def resetpass(request):
    pass
def delete(request):
    pass

def email(request):
    from_email = [settings.EMAIL_HOST_USER]
    send_mail('test', 'hehe', from_email, ['paulyhong@gmail.com'])

    return HttpResponse('sent', status=200)
    
