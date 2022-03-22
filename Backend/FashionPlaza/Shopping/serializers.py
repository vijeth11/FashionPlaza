from pyexpat import model
from product.serializers import ProductSerializer
from .models import Cart, WishList, Checkout
from rest_framework import fields, serializers

   
class CartListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['ProductId','Quantity']
        depth = 1

class CartWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__' 
class WishListSerializer(serializers.ModelSerializer):

    class Meta:
        model = WishList
        fields = ['ProductId','Quantity']

class CheckoutListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Checkout
        fields =  ['ProductId','Quantity','ShippingDate','DeliverDate']