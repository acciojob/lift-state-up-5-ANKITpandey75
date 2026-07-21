from django.db import models
from .models import Product

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# from django.db import models

# class Product(models.Model):
#     name = models.CharField(max_length=200)
#     description = models.TextField()
#     price = models.FloatField()
#     stock = models.IntegerField()
#     image = models.ImageField(upload_to='products/')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name

# Create your models here.
