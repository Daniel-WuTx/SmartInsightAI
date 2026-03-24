from rest_framework import viewsets
from .models import Dataset
from .serializers import DatasetSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd



class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer
    
@api_view(['POST'])
def subir_dataset(request):
    archivo = request.FILES.get('file')

    if not archivo:
        return Response({"error": "No se envió archivo"}, status=400)

    try:
        if archivo.name.endswith('.csv'):
            df = pd.read_csv(archivo)
        else:
            df = pd.read_excel(archivo)

        dataset = Dataset.objects.create(
            nombre=archivo.name,
            archivo=archivo
        )

        return Response({
            "status": "ok",
            "dataset_id": dataset.id
        })

    except Exception as e:
        print("ERROR:", e)
        return Response({"error": str(e)}, status=500)