from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from .serializers import CustomerUserSerializer, AdminUserSerializer, UserAuthTokenSerializer
from django.contrib.auth import get_user_model
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import action, authentication_classes as auth_classes, permission_classes as permissions_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class AdminUserViewSet(viewsets.ModelViewSet):
    serializer_class = AdminUserSerializer
    queryset = get_user_model().objects.filter(is_admin=True).all()
    authentication_classes = (TokenAuthentication,)
    search_fields = ('Email','FirstName')

    @auth_classes((TokenAuthentication,))
    @permissions_classes((IsAuthenticated,))
    @action(methods=['Get'],detail=True, url_path='logout')
    def logout(self, request, pk = None):
        print(request.user)
        token = Token.objects.get(user = request.user)
        token.delete()
        return Response(status = status.HTTP_200_OK)

class CustomerUserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerUserSerializer
    queryset = get_user_model().objects.filter(is_admin=False).all()
    authentication_classes = (TokenAuthentication,)
    search_fields = ('Email','FirstName')

    @auth_classes((TokenAuthentication,))
    @permissions_classes((IsAuthenticated,))
    @action(methods=['Get'],detail=True, url_path='logout')
    def logout(self, request, pk = None):
        token = Token.objects.get(user = request.user)
        token.delete()
        return Response(status = status.HTTP_200_OK)

class UserLoginAPIView(ObtainAuthToken):
    authentication_classes = []
    permission_classes = []
    serializer_class = UserAuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context = {'request':request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        responseData = {'token':token.key}
        responseData.update(serializer.data)
        return Response(responseData)
