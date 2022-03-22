from rest_framework import mixins, viewsets, status
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart, Checkout, WishList
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import CartListSerializer, CartWriteSerializer, CheckoutListSerializer, WishListSerializer

# Create your views here.

class CartListView(mixins.ListModelMixin,
                   viewsets.GenericViewSet):

      authentication_classes = (TokenAuthentication,)
      permission_classes=(IsAuthenticated,)      
      queryset = Cart.objects.all()
      filter_backends = [DjangoFilterBackend]
      filter_fields = ['UserId']
      
      def get_serializer_class(self):
        method = self.request.method
        if method == 'PUT' or method == 'POST':
            return CartWriteSerializer
        else:
            return CartListSerializer

      def list(self, request, *args, **kwargs):
          serializer_class = self.get_serializer_class()
          data = serializer_class(self.get_queryset(),many = True).data
          result = []
          for value in data:
              result.append({
                    'productId':value['ProductId']['id'],
                    'productName':value['ProductId']['Name'],
                    'productImage':value['ProductId']['PrimaryImage'],
                    'productPrice':value['ProductId']['Cost'],
                    'quantity':value['Quantity']
                    })
          print(result)
          return Response(result)
     
      
      def post(self, request, *args, **kwargs):
          #create and updating the data in database
          data = request.data
          if "carts" in data.keys() :
              for cart in data["carts"]:
                  result  = self.saveOrUpdateCart(cart,request.user.UserId)
                  if not result:
                      return Response("Failed Data is not propper", status=status.HTTP_400_BAD_REQUEST)
          else:
              result = self.saveOrUpdateCart(data,request.user.UserId)
              if not result:
                  return Response("Failed Data is not propper", status=status.HTTP_400_BAD_REQUEST)
          return Response("Success",status=status.HTTP_200_OK)
        
      def saveOrUpdateCart(self,data,userId):
          cart = Cart.objects.filter(ProductId=data["ProductId"],UserId=userId).first()
          if cart is None:
              serializer_class = self.get_serializer_class()
              serialize = serializer_class(data)
              serialize.save()
          else:
              cart.Quantity = data["Quantity"]
              cart.save()
          return True
class WishListView(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   viewsets.GenericViewSet):

    authentication_classes = (TokenAuthentication,)
    permission_classes=(IsAuthenticated,)
    serializer_class = WishListSerializer
    queryset = WishList.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['UserId']

class CheckoutListView(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   viewsets.GenericViewSet):

    authentication_classes = (TokenAuthentication,)
    permission_classes=(IsAuthenticated,)
    serializer_class = CheckoutListSerializer
    queryset = Checkout.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['UserId']