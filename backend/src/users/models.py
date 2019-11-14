from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        _email = self.normalize_email(email)
        user = User(email=_email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_restaurant_user(self, email, password, **extra_fields):
        extra_fields.setdefault('is_restaurant', True)
        if extra_fields.get('is_restaurant') is not True:
            raise ValueError('must have is_restaurant=True.')
        #return self.create_user(email, password, **extra_fields)
        return extra_fields
class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
