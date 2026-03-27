from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from datasets.views import DatasetViewSet
from analisis.views import ResultadoAnalisisViewSet

router = DefaultRouter()
router.register(r'datasets', DatasetViewSet, basename='dataset')
router.register(r'resultados', ResultadoAnalisisViewSet, basename='resultado')

urlpatterns = [
    path('admin/', admin.site.urls),

# ✅ DESPUÉS - upload va primero
    path('api/datasets/', include('datasets.urls')),  # 👈 ARRIBA del router
    path('api/', include('analisis.urls')),  # 👈 DESPUÉS del upload
    path('api/', include(router.urls)),
    # Autenticación JWT
    path('api/login/', TokenObtainPairView.as_view()),
    path('api/refresh/', TokenRefreshView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
