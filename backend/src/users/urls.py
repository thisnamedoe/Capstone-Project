from django.urls import path

from . import views

urlpatterns = [
        path('create/', views.create),
        path('resetpass/', views.resetpass),
        path('delete/', views.delete),
        ]
