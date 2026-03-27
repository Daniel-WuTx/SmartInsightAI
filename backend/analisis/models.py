from django.db import models
from datasets.models import Dataset
from django.contrib.auth.models import User


class ResultadoAnalisis(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)

    total_registros = models.IntegerField(default=0)
    total_columnas = models.IntegerField(default=0)
    columnas_numericas = models.IntegerField(default=0)
    columnas_categoricas = models.IntegerField(default=0)
    columnas_fecha = models.IntegerField(default=0)

    # KPIs calculados
    total_ventas = models.FloatField(default=0)
    total_ordenes = models.IntegerField(default=0)
    crecimiento = models.FloatField(default=0)

    insights = models.TextField(blank=True)
    preview_datos = models.TextField(blank=True)
    datos_graficos = models.TextField(blank=True)
    resumen_ia = models.TextField(blank=True)

    fecha_analisis = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Análisis de {self.dataset.nombre}"


class DashboardGuardado(models.Model):
    # nombre ahora es opcional — se genera automáticamente si no se envía
    nombre = models.CharField(max_length=255, blank=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.nombre:
            self.nombre = f"Dashboard - {self.dataset.nombre}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre
