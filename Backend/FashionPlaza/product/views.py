from .serializers import ProductSerializer, ProductImageSerializer
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins
from .permissions import AdminUserCanOnlyUpdate
from .models import Product, ProductImage
# Create your views here.

class ProductView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, AdminUserCanOnlyUpdate,)
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class ProductListView(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class ProductImageView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, AdminUserCanOnlyUpdate,)
    serializer_class = ProductImageSerializer
    queryset = ProductImage.objects.all()