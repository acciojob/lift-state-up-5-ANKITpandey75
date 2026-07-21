from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# from django.shortcuts import render
# from rest_framework import serializers
# from rest_framework import viewsets
# # from .models import Product
# from .serializers import ProductSerializer
# from rest_framework.views import APIView
# from rest_framework.response import Response

# class ProductListView(APIView):
#     def get(self, request):
#         return Response({"message": "Products list"})


# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer


# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'

# Create your views here.
