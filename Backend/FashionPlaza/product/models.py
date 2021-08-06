from django.utils import timezone
from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator
import os
# Create your models here.

def fileRename(instance,filename):   
        if type(instance) == Product:
            path = instance.Type + "/" +instance.Subtype
        elif instance.ProductId is not None:            
            path = instance.ProductId.Type +"/"+ instance.ProductId.Subtype
        else:
            return filename
        return os.path.join(path,filename)
class Product(models.Model):
    Name = models.CharField(max_length=100)
    Description = models.TextField()
    Cost = models.DecimalField(max_digits=9, decimal_places=4)
    Company = models.CharField(max_length=20)
    Type = models.CharField(max_length=10)
    Subtype = models.CharField(max_length = 10)
    Discount = models.IntegerField()
    Sale = models.BooleanField()
    PrimaryImage = models.ImageField(upload_to = fileRename)
    BestSeller = models.BooleanField(default=True)
    ItemAddedTime = models.DateTimeField(default=timezone.now)
    Size = models.CharField(max_length=200,validators = [RegexValidator(regex='[^0-9,]',message='Size takes only numbers coma seperated',code='invalid_size',inverse_match=True)], default='')
    def __str__(self):
        return self.Name

    


class ProductImage(models.Model):
    ProductId = models.ForeignKey(Product, related_name='images',on_delete=models.CASCADE)
    image = models.ImageField(upload_to = fileRename)


