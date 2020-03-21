from django.urls import path

from . import views

urlpatterns = [
        path('create/', views.create),
        path('get/', views.get),
        path('getitem/', views.getmenuitem),
        path('addmenuitem/', views.addmenuitem),
        path('removemenuitem/', views.removemenuitem),
        path('delete/', views.delete),
        path('addtable/', views.addtable),
        path('removetable/',views.deletetable),
        path('menufromtablestring/', views.getrestaurantfromtable)
        ]
