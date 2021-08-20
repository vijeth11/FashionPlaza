from rest_framework.response import Response
from .serializers import ProductCategorySerializer, ProductListSerializer, ProductSerializer, ProductImageSerializer
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins
from .permissions import AdminUserCanOnlyUpdate
from .models import Product, ProductImage
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q as OR
from django.db.models import Count
from datetime import datetime, timedelta
# Create your views here.

class ProductView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AdminUserCanOnlyUpdate,)
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
                return self.queryset.filter(Type__iexact=type, Subtype__iexact=subtype)
            else:
                return self.queryset.filter(Type__iexact=type)
        else:
            return self.queryset.filter(OR(BestSeller=True) | OR(Sale=True) | OR(ItemAddedTime = datetime.now() - timedelta(days=30)))

    def list(self, request):
        if request.query_params.get('ListCount') != None and request.query_params.get('PageNumber') != None:
            pagesPerList = int(request.query_params.get('ListCount'))
            page = int(request.query_params.get('PageNumber')) - 1 
            result = []
            data = self.serializer_class(self.get_queryset(),many = True).data
            for value in data:            
                value["TotalRecords"] = len(data)           
                result.append(value)
            if len(data) - (page*pagesPerList) > pagesPerList:
                return Response(result[page*pagesPerList:(page+1)*pagesPerList])
            else:
                return Response(result[page*pagesPerList:])
        else:
            return Response(self.serializer_class(self.get_queryset(),many = True).data)

class ProductImageView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, AdminUserCanOnlyUpdate,)
    serializer_class = ProductImageSerializer
    queryset = ProductImage.objects.all()

class ProductCategoryListView(viewsets.ModelViewSet):
    serializer_class = ProductCategorySerializer
    queryset = Product.objects.distinct().all()

    def list(self,request):
        serializer = self.serializer_class(self.queryset,many = True)
        result = []
        for data in serializer.data:
            value = list(data.items())
            datadict = {value[0][0]:str(value[0][1]).lower(),value[1][0]:str(value[1][1]).lower()}
            if datadict not in result:
                result.append(datadict)
        return Response(result)