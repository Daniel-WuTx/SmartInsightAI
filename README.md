# 📊 SmartInsight AI

Plataforma web de análisis de datos con inteligencia artificial. Permite subir datasets en Excel o CSV y obtener automáticamente insights, gráficas interactivas y métricas clave sin necesidad de conocimientos técnicos.

![SmartInsight AI](https://img.shields.io/badge/version-1.0.0-blue) ![Django](https://img.shields.io/badge/Django-6.0-green) ![React](https://img.shields.io/badge/React-19-blue) ![License](https://img.shields.io/badge/license-MIT-orange)

---

## 🚀 Funcionalidades

- 📤 **Carga de datasets** — Sube archivos Excel (.xlsx) o CSV y el análisis se genera automáticamente
- 📊 **Dashboard interactivo** — Visualiza KPIs, gráficas de barras y líneas generadas desde tus datos
- 🧠 **Insights automáticos** — Detección de ventas, tendencias, outliers, productos y categorías clave
- 🤖 **Chat con IA** — Haz preguntas sobre tu dataset en lenguaje natural
- 📄 **Exportar PDF** — Descarga el análisis completo en formato PDF
- 🔐 **Autenticación JWT** — Cada usuario solo accede a sus propios datasets
- 🌙 **Modo oscuro** — Interfaz adaptable con dark mode por defecto

---

## 🛠️ Stack Tecnológico

### Backend
| Tecnología | Uso |
|------------|-----|
| Python 3.14 | Lenguaje principal |
| Django 6.0 | Framework web |
| Django REST Framework | API REST |
| SimpleJWT | Autenticación con tokens |
| Pandas | Análisis y procesamiento de datos |
| ReportLab | Generación de PDFs |
| MySQL | Base de datos |

### Frontend
| Tecnología | Uso |
|------------|-----|
| React 19 | Framework UI |
| Vite | Bundler |
| Tailwind CSS | Estilos |
| Chart.js | Gráficas interactivas |
| React Router | Navegación |
| React Icons | Iconografía |

---

## 📁 Estructura del Proyecto

```
SmartInsightAI/
├── backend/
│   ├── analisis/          # Módulo de análisis e insights
│   ├── datasets/          # Módulo de carga de datasets
│   ├── dashboards/        # Módulo de dashboards
│   ├── usuarios/          # Módulo de usuarios
│   ├── configuracion/     # Configuración de Django
│   └── requirements.txt
│
└── frontend/
    └── src/
        ├── components/    # Componentes reutilizables
        ├── pages/         # Páginas de la aplicación
        ├── services/      # Llamadas a la API
        ├── routes/        # Rutas protegidas
        └── layout/        # Layout principal
```

---

## ⚙️ Instalación y configuración

### Requisitos previos
- Python 3.10+
- Node.js 18+
- MySQL

### Backend

```bash
# 1. Clona el repositorio
git clone https://github.com/Daniel-WuTx/SmartInsightAI.git
cd SmartInsightAI/backend

# 2. Crea y activa el entorno virtual
python -m venv env
env\Scripts\activate  # Windows
source env/bin/activate  # Mac/Linux

# 3. Instala dependencias
pip install -r requirements.txt

# 4. Configura las variables de entorno
cp .env.example .env
# Edita .env con tus credenciales

# 5. Ejecuta migraciones
python manage.py migrate

# 6. Crea un superusuario
python manage.py createsuperuser

# 7. Inicia el servidor
python manage.py runserver
```

### Frontend

```bash
cd SmartInsightAI/frontend

# 1. Instala dependencias
npm install

# 2. Configura las variables de entorno
# Crea un archivo .env con:
VITE_API_URL=http://127.0.0.1:8000/api

# 3. Inicia el servidor de desarrollo
npm run dev
```

---

## 🔐 Variables de entorno

### Backend (`.env`)
```env
SECRET_KEY=tu-clave-secreta
DEBUG=True
DB_NAME=smartinsight
DB_USER=root
DB_PASSWORD=tu-password
DB_HOST=localhost
DB_PORT=3306
OPENAI_API_KEY=sk-...
```

### Frontend (`.env`)
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

## 📸 Capturas de pantalla

> Dashboard con análisis automático, KPIs y gráficas interactivas

---

## 👨‍💻 Autor

**Daniel Gutierrez Madrid**
Ingeniero de Sistemas — Universidad Simón Bolívar, Barranquilla
Minor en Inteligencia Artificial

- 📧 madrid19991@outlook.com
- 🐙 [GitHub](https://github.com/Daniel-WuTx)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
