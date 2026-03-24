from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from datasets.views import DatasetViewSet
from analisis.views import ResultadoAnalisisViewSet

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# 🔥 ROUTER BIEN USADO
router = DefaultRouter()
router.register(r'datasets', DatasetViewSet)
router.register(r'resultados', ResultadoAnalisisViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),

    # 🔥 APIs AUTOMÁTICAS (CRUD)
    path('api/', include(router.urls)),

    # 🔥 APIs PERSONALIZADAS
    path('api/', include('analisis.urls')),

    # 🔥 AUTH (CORREGIDO)
    path('api/login/', TokenObtainPairView.as_view()),
    path('api/refresh/', TokenRefreshView.as_view()),
    
    path('api/custom-datasets/', include('datasets.urls')),
]