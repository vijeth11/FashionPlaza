from django.db import models
from django.core.validators import MaxLengthValidator, MinLengthValidator
# Create your models here.
class QueryMessage(models.Model):
    Name = models.CharField(max_length=30)
    Email = models.EmailField()
    Phone = models.IntegerField(validators = [MinLengthValidator(10),MaxLengthValidator(10)])
    Message = models.TextField()

class NewsLetter(models.Model):
    Email = models.EmailField()