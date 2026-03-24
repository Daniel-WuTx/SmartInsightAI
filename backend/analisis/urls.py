from django.urls import path
from .views import (
    generate_insights,
    dashboard_dataset,
    pregunta_ia,
    guardar_dashboard,
    exportar_pdf,
)

urlpatterns = [
    path('insights/', generate_insights),
    path('dashboard/<int:dataset_id>/', dashboard_dataset),
    path('ia/', pregunta_ia),
    path('guardar-dashboard/', guardar_dashboard),
    path('pdf/<int:dataset_id>/', exportar_pdf),
    


]