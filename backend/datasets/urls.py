from django.urls import path
from .views import subir_dataset

urlpatterns = [
    path('upload/', subir_dataset),
]