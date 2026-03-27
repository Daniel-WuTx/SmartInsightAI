from django.db import models
from django.contrib.auth.models import User


class Dataset(models.Model):
    nombre = models.CharField(max_length=255)
    archivo = models.FileField(upload_to='datasets/')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    fecha_subida = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Análisis automático al guardar
        try:
            from analisis.servicios_analisis import analizar_dataset
            analizar_dataset(self)
        except Exception as e:
            print(f"Error en análisis automático: {e}")

    def __str__(self):
        return self.nombre
