from django.db import models
from django.contrib.auth.models import  PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.core.validators import MaxLengthValidator, MinLengthValidator, MinValueValidator, MaxValueValidator
from .manager import CustomerUserManager

# Create your models here.
class Customer(AbstractBaseUser,PermissionsMixin):
    UserId = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=30)
    LastName = models.CharField(max_length=30)
    Email = models.EmailField(unique=True)
    PhoneNumber = models.CharField(validators = [ MinLengthValidator(10), MaxLengthValidator(10)], max_length=10)
    is_admin = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'Email'
    REQUIRED_FIELDS = ['FirstName','PhoneNumber']

    objects = CustomerUserManager()


class Address(models.Model):
    UserId = models.ForeignKey(Customer, on_delete=models.CASCADE)
    HouseNumber = models.IntegerField()
    Address = models.TextField()
    Appartment = models.IntegerField(null=True)
    City = models.CharField(max_length=20)
    Country = models.CharField(max_length=20)
    State = models.CharField(max_length=20)
    ZipCode = models.IntegerField(validators= [MinValueValidator(100000), MaxValueValidator(999999999)])
