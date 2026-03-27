import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(override=True)

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    print("⚠️  ADVERTENCIA: OPENAI_API_KEY no está configurada en el .env")

client = OpenAI(api_key=api_key) if api_key else None


def generar_resumen_ia(prompt):
    """
    Recibe un prompt completo y lo envía directamente a la IA.
    El prompt se construye en el llamador (views.py o servicios_analisis.py).
    """
    if not client:
        return "IA no disponible: configura OPENAI_API_KEY en el archivo .env"

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error generando respuesta de IA: {str(e)}"
