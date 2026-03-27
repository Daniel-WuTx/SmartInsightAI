from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Dataset
from .serializers import DatasetSerializer


# =========================
# 📂 DATASET VIEWSET (protegido)
# =========================
class DatasetViewSet(viewsets.ModelViewSet):
    serializer_class = DatasetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Cada usuario solo ve sus propios datasets
        return Dataset.objects.filter(usuario=self.request.user).order_by('-fecha_subida')


# =========================
# 📤 SUBIR DATASET
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def subir_dataset(request):
    archivo = request.FILES.get('file')

    if not archivo:
        return Response({"error": "No se envió ningún archivo"}, status=400)

    nombre = archivo.name
    extension = nombre.split('.')[-1].lower()

    if extension not in ['xlsx', 'csv']:
        return Response({"error": "Solo se permiten archivos .xlsx o .csv"}, status=400)

    try:
        dataset = Dataset.objects.create(
            nombre=nombre,
            archivo=archivo,
            usuario=request.user
        )

        return Response({
            "status": "ok",
            "dataset_id": dataset.id,
            "nombre": dataset.nombre,
            "mensaje": "Dataset subido y analizado correctamente"
        }, status=201)

    except Exception as e:
        print("ERROR subiendo dataset:", e)
        return Response({"error": f"Error procesando el archivo: {str(e)}"}, status=500)
