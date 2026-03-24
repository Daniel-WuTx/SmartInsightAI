from django.db import models
from datasets.models import Dataset
from django.contrib.auth.models import User


class ResultadoAnalisis(models.Model):

    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)

    total_registros = models.IntegerField()
    total_columnas = models.IntegerField()

    columnas_numericas = models.IntegerField()
    columnas_categoricas = models.IntegerField()
    columnas_fecha = models.IntegerField()

    insights = models.TextField(blank=True)

    preview_datos = models.TextField(blank=True)

    datos_graficos = models.TextField(blank=True)

    fecha_analisis = models.DateTimeField(auto_now_add=True)
    
    resumen_ia = models.TextField(blank=True)

    def __str__(self):
        return f"Analisis de {self.dataset.nombre}"

class DashboardGuardado(models.Model):
    nombre = models.CharField(max_length=255)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.nombre