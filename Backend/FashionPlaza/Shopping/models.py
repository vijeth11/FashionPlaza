from django.db import models
from product.models import Product
from django.contrib.auth import get_user_model
# Create your models here.
class Cart(models.Model):
    ProductId = models.ForeignKey(Product, on_delete=models.CASCADE)
    UserId = models.ForeignKey(get_user_model(), on_delete= models.CASCADE)
    Quantity = models.IntegerField()

    class Meta:
        unique_together = (("ProductId", "UserId"),)

class WishList(models.Model):
    ProductId = models.ForeignKey(Product, on_delete=models.CASCADE)
    UserId = models.ForeignKey(get_user_model(), on_delete= models.CASCADE)
    Quantity = models.IntegerField()

    class Meta:
        unique_together = (("ProductId", "UserId"),)

class Checkout(models.Model):
    ProductId = models.ForeignKey(Product, on_delete=models.CASCADE)
    UserId = models.ForeignKey(get_user_model(), on_delete= models.CASCADE)
    Quantity = models.IntegerField()
    ShippingDate = models.DateTimeField()
    DeliverDate = models.DateTimeField()

    class Meta:
        unique_together = (("ProductId", "UserId"),)
