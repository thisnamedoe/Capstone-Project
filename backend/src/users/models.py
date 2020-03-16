from django.db import models

#class CustomUserManager(BaseUserManager):
#    def create_user(self, email, password, **extra_fields):
#        if not email:
#            raise ValueError('The Email must be set')
#        _email = self.normalize_email(email)
#        user = User(email=_email, **extra_fields)
#        user.set_password(password)
#        user.save()
#        return user

#    def create_restaurant_user(self, email, password, **extra_fields):
#        pass
class User(models.Model):
    username = None
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    is_authenticated = False
    is_anonymous = False
class Customuser(models.Model):
#    username = None
#    email = models.EmailField(unique=True)
#    USERNAME_FIELD = 'email'
#    REQUIRED_FIELDS = []

#    objects = CustomUserManager()

#    def __str__(self):
#        return self.email
    REQUIRED_FIELDS = ('email','password','salt')
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=255,unique=True, null=False)
    password = models.CharField(max_length=255, null=True)
    salt = models.CharField(max_length=255, null=True)
    isRestaurant = models.BooleanField(default = False)

