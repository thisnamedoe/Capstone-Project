from django.urls import path

from . import views

urlpatterns = [
        path('create/', views.create),
        path('get/', views.get),
        path('delete/', views.delete),
        path('closeorder/', views.closeorder)
        ]
