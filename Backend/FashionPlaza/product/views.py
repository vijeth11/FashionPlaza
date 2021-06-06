from .serializers import ProductListSerializer, ProductSerializer, ProductImageSerializer
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins
from .permissions import AdminUserCanOnlyUpdate
from .models import Product, ProductImage
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.

class ProductView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, AdminUserCanOnlyUpdate,)
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class ProductListView(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = ProductListSerializer
    queryset = Product.objects.all()
    #if filters are used queryset function not required
    #filter_backends = [DjangoFilterBackend]
    #filterset_fields = ['Type', 'Subtype']
    def get_queryset(self):
        #sample url http://localhost:8000/api/products/?Type=Women&Subtype=Jumpers
        type = self.request.query_params.get('Type')
        subtype = self.request.query_params.get('Subtype')
        if  type is not None:
            if  subtype is not None:
                return self.queryset.filter(Type=type, Subtype=subtype)
            else:
                return self.queryset.filter(Type=type)
        else:
            return self.queryset

class ProductImageView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, AdminUserCanOnlyUpdate,)
    serializer_class = ProductImageSerializer
    queryset = ProductImage.objects.all()