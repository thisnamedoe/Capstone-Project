from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.conf import settings
from django.core.mail import send_mail 

def create(request):
    _password = request.POST.get['password'
    _email = request.POST.get['email']
    # other stuff too
    # create using function or modelname.objects.create(param1=x, param2 = y.....etc)

    #email('user_email', 0)
    return HttpResponse('user created', status=201)


def resetpass(request):
    # reset user password
    # use a hash based on a user's username+salt to generate a link, and we can use this to verify with an email that contains a link with the hash used in the user params (hash as well as the username should be in the link). (one time use links)
    _email = request.POST.get['email']
    
    return email(_email, 1)


def delete(request):
    try:
        _username = request.POST.get['username']
        #get object
        #obj = modelname.objects.get(name=_username):
        #obj.delete()
    return HttpResponse('user deleted', status=200)

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
    
