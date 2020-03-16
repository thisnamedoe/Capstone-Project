from django.urls import path

from . import views

urlpatterns = [
        path('create/', views.create),
        path('get/', views.getuser),
        path('resetpass/', views.resetpass),
        path('authenticate/', views.authenticate),
        path('delete/', views.delete),
        ]
