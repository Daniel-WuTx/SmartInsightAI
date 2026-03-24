from django.db import models
from analisis.servicios_analisis import analizar_dataset


class Dataset(models.Model):
    nombre = models.CharField(max_length=255)
    archivo = models.FileField(upload_to='datasets/')
    fecha_subida = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Ejecutar análisis automático
        analizar_dataset(self)

    def __str__(self):
        return self.nombre