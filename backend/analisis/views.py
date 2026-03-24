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
# 🔹 VIEWSET RESULTADOS
# =========================
class ResultadoAnalisisViewSet(viewsets.ModelViewSet):
    queryset = ResultadoAnalisis.objects.all()
    serializer_class = ResultadoAnalisisSerializer


# =========================
# 🔹 DASHBOARD POR DATASET (PROTEGIDO)
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_dataset(request, dataset_id):

    analisis = ResultadoAnalisis.objects.filter(
        dataset_id=dataset_id
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
        return Response({
            "insight": "No hay datos para analizar"
        })

    try:
        total_sales = sum(item.get('total_price', 0) for item in data)

        top_product = max(
            data,
            key=lambda x: x.get('total_price', 0)
        ).get('product', 'N/A')

        insight = f"""
📊 Total de ventas: ${round(total_sales, 2)}
🏆 Producto más vendido: {top_product}
📈 Recomendación: Aumentar stock del producto líder.
        """

        return Response({"insight": insight})

    except Exception as e:
        return Response({
            "insight": f"Error generando insights: {str(e)}"
        })


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
        dataset_id=dataset_id
    ).last()

    if not analisis:
        return Response({
            "respuesta": "No hay análisis disponible"
        })

    contexto = analisis.insights

    prompt = f"""
Eres un analista de datos experto.

Contexto del dataset:
{contexto}

Pregunta del usuario:
{pregunta}

Responde de forma clara, profesional y corta.
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

    if not dataset_id:
        return Response({"error": "dataset_id requerido"}, status=400)

    DashboardGuardado.objects.create(
        usuario=request.user,
        dataset_id=dataset_id
    )

    return Response({"status": "guardado"})


# =========================
# 📄 EXPORTAR PDF
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_pdf(request, dataset_id):

    analisis = ResultadoAnalisis.objects.filter(
        dataset_id=dataset_id
    ).last()

    if not analisis:
        return Response({"error": "No hay análisis"}, status=404)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="dashboard.pdf"'

    doc = SimpleDocTemplate(response)
    styles = getSampleStyleSheet()

    content = []

    # 🔥 TÍTULO
    content.append(Paragraph("📊 Dashboard SmartInsight AI", styles["Title"]))
    content.append(Spacer(1, 20))

    # 🔹 INFO DATASET
    content.append(Paragraph(f"Dataset ID: {dataset_id}", styles["Normal"]))
    content.append(Spacer(1, 10))

    # 🔹 KPIs
    content.append(Paragraph(f"Total registros: {analisis.total_registros}", styles["Normal"]))
    content.append(Paragraph(f"Total columnas: {analisis.total_columnas}", styles["Normal"]))
    content.append(Paragraph(f"Columnas numéricas: {analisis.columnas_numericas}", styles["Normal"]))
    content.append(Spacer(1, 20))

    # 🧠 INSIGHTS
    content.append(Paragraph("🧠 Insights:", styles["Heading2"]))
    content.append(Spacer(1, 10))
    content.append(Paragraph(analisis.insights, styles["Normal"]))
    content.append(Spacer(1, 20))

    # 🔥 FOOTER
    content.append(Paragraph("Generado por SmartInsight AI", styles["Italic"]))

    doc.build(content)

    return response