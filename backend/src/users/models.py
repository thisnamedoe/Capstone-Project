
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(BaseUserManager):
    """
    Custom user mode with email as the unique identifier
    """
    def create_user(self, first_name, last_name, email, password, **extra_fields):

        if not email:
            raise ValueError("The email must be set")
        email = self.normalize_email(email)
        user = self.model(first_name=first_name, last_name=last_name, email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_restaurant_user(self, first_name, last_name, email, password, **extra_fields):
        """
        Create restaurant user with the given email and password.
        """
        extra_fields.setdefault("is_restaurant", True)

        if extra_fields.get("is_restaurant") is not True:
            raise ValueError("Restaurant user must have is_restaurant=True.")
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    username = None
    first_name = models.CharField(max_length=255, verbose_name="First name")
    last_name = models.CharField(max_length=255, verbose_name="Last name")
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]
    objects = User()

    def __str__(self):
        return self.email
