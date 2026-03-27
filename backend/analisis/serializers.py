from rest_framework import serializers
from .models import ResultadoAnalisis


class ResultadoAnalisisSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResultadoAnalisis
        fields = '__all__'


class DashboardSerializer(serializers.ModelSerializer):

    dataset_nombre = serializers.CharField(source='dataset.nombre')

    class Meta:
        model = ResultadoAnalisis
        fields = [
            'dataset_nombre',
            'total_registros',
            'total_columnas',
            'columnas_numericas',
            'columnas_categoricas',
            'columnas_fecha',
            'total_ventas',
            'total_ordenes',
            'crecimiento',
            'insights',
            'preview_datos',
            'datos_graficos'
        ]