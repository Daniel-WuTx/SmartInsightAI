from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.http import HttpResponse

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

from .models import ResultadoAnalisis, DashboardGuardado
from .serializers import ResultadoAnalisisSerializer, DashboardSerializer
from .services.ia_service import generar_resumen_ia


# =========================
# 🔹 VIEWSET RESULTADOS (protegido)
# =========================
class ResultadoAnalisisViewSet(viewsets.ModelViewSet):
    serializer_class = ResultadoAnalisisSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ResultadoAnalisis.objects.filter(
            dataset__usuario=self.request.user
        ).order_by('-fecha_analisis')


# =========================
# 🔹 DASHBOARD POR DATASET
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_dataset(request, dataset_id):
    analisis = ResultadoAnalisis.objects.filter(
        dataset_id=dataset_id,
        dataset__usuario=request.user
    ).last()

    if not analisis:
        return Response({
            "error": "No hay análisis disponible para este dataset"
        }, status=404)

    serializer = DashboardSerializer(analisis)
    return Response(serializer.data)


# =========================
# 🔥 INSIGHTS SIMPLES
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_insights(request):
    data = request.data

    if not data:
        return Response({"insight": "No hay datos para analizar"})

    try:
        # Intentamos ser genéricos con cualquier campo numérico
        numeric_keys = [k for k in data[0].keys() if isinstance(data[0][k], (int, float))] if data else []

        if not numeric_keys:
            return Response({"insight": "No se encontraron columnas numéricas en los datos"})

        valor_key = numeric_keys[0]
        total = sum(item.get(valor_key, 0) for item in data)
        top_item = max(data, key=lambda x: x.get(valor_key, 0))

        # Buscamos una clave de texto para mostrar
        text_keys = [k for k in data[0].keys() if isinstance(data[0][k], str)] if data else []
        label = top_item.get(text_keys[0], 'N/A') if text_keys else 'N/A'

        insight = f"""
📊 Total de {valor_key}: {round(total, 2)}
🏆 Valor más alto: {label} con {round(top_item.get(valor_key, 0), 2)}
📈 Recomendación: Analiza los factores que llevaron al máximo valor detectado.
        """
        return Response({"insight": insight.strip()})

    except Exception as e:
        return Response({"insight": f"Error generando insights: {str(e)}"})


# =========================
# 🤖 IA (CHAT)
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def pregunta_ia(request):
    pregunta = request.data.get("pregunta")
    dataset_id = request.data.get("dataset_id")

    if not pregunta or not dataset_id:
        return Response({
            "respuesta": "Faltan datos (pregunta o dataset_id)"
        }, status=400)

    analisis = ResultadoAnalisis.objects.filter(
        dataset_id=dataset_id,
        dataset__usuario=request.user
    ).last()

    if not analisis:
        return Response({"respuesta": "No hay análisis disponible para este dataset"})

    # El prompt se construye aquí y se pasa directo al servicio
    prompt = f"""
Eres un analista de datos experto.

Contexto del dataset analizado:
{analisis.insights}

Pregunta del usuario:
{pregunta}

Responde de forma clara, profesional y concisa en español.
"""
    respuesta = generar_resumen_ia(prompt)
    return Response({"respuesta": respuesta})


# =========================
# 💾 GUARDAR DASHBOARD
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def guardar_dashboard(request):
    dataset_id = request.data.get("dataset_id")
    nombre = request.data.get("nombre", "")

    if not dataset_id:
        return Response({"error": "dataset_id requerido"}, status=400)

    DashboardGuardado.objects.create(
        usuario=request.user,
        dataset_id=dataset_id,
        nombre=nombre  # si viene vacío el modelo lo genera automáticamente
    )

    return Response({"status": "Dashboard guardado correctamente"})


# =========================
# 📄 EXPORTAR PDF
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_pdf(request, dataset_id):
    analisis = ResultadoAnalisis.objects.filter(
        dataset_id=dataset_id,
        dataset__usuario=request.user
    ).last()

    if not analisis:
        return Response({"error": "No hay análisis disponible"}, status=404)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="dashboard_{dataset_id}.pdf"'

    doc = SimpleDocTemplate(response)
    styles = getSampleStyleSheet()
    content = []

    content.append(Paragraph("SmartInsight AI - Reporte de Análisis", styles["Title"]))
    content.append(Spacer(1, 20))

    content.append(Paragraph(f"Dataset: {analisis.dataset.nombre}", styles["Normal"]))
    content.append(Spacer(1, 10))

    content.append(Paragraph(f"Total registros: {analisis.total_registros}", styles["Normal"]))
    content.append(Paragraph(f"Total columnas: {analisis.total_columnas}", styles["Normal"]))
    content.append(Paragraph(f"Columnas numéricas: {analisis.columnas_numericas}", styles["Normal"]))
    content.append(Paragraph(f"Columnas categóricas: {analisis.columnas_categoricas}", styles["Normal"]))
    content.append(Spacer(1, 20))

    content.append(Paragraph("Insights del análisis:", styles["Heading2"]))
    content.append(Spacer(1, 10))

    for linea in analisis.insights.split('\n'):
        if linea.strip():
            content.append(Paragraph(linea.strip(), styles["Normal"]))

    content.append(Spacer(1, 20))
    content.append(Paragraph("Generado por SmartInsight AI", styles["Italic"]))

    doc.build(content)
    return response
