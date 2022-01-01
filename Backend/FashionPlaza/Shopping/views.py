from rest_framework import mixins, viewsets
from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart, Checkout, WishList
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import CartListSerializer, CheckoutListSerializer, WishListSerializer

# Create your views here.

class CartListView(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   viewsets.GenericViewSet):

      authentication_classes = (TokenAuthentication,)
      permission_classes=(IsAuthenticated,)
      serializer_class = CartListSerializer
      queryset = Cart.objects.all()
      filter_backends = [DjangoFilterBackend]
      filter_fields = ['UserId']

      def list(self, request, *args, **kwargs):
          data = self.serializer_class(self.get_queryset(),many = True).data
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