"""FashionPlaza URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from product.views import  ProductView, ProductListView, ProductImageView, ProductCategoryListView
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from User.views import AdminUserViewSet,CustomerUserViewSet,UserLoginAPIView
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register('product',ProductView, basename='product')
router.register('products',ProductListView, basename = 'products')
router.register('product-images',ProductImageView,basename = 'product-images')
router.register('product-category',ProductCategoryListView,basename = 'product-category')
router.register('admin', AdminUserViewSet, basename='admin')
router.register('customer', CustomerUserViewSet, basename='customer')

urlpatterns = static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT) + [
    path('admin/', admin.site.urls),
    path('api/',include(router.urls)),
    path('api/login/',UserLoginAPIView.as_view(),name="login"),
    path('api/admin/logout/',AdminUserViewSet.as_view({"get":"logout"})),
    path('api/customer/logout/',CustomerUserViewSet.as_view({"get":"logout"})),
    re_path('^[/s/S]*',TemplateView.as_view(template_name = "index.html"),name = "home")
]
