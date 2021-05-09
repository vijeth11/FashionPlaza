from .models import Product, ProductImage
from rest_framework import serializers

class ProductImageRelatedSerializer(serializers.RelatedField):

    def to_representation(self, value):
        serializer = ProductImageSerializer(value)
        return serializer.data

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageRelatedSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'
        depth = 1

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


