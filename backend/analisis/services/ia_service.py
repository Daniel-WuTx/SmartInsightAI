import os
from openai import OpenAI
from dotenv import load_dotenv

# 🔥 cargar variables del .env
load_dotenv(override=True)

# 🔑 obtener API KEY
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def generar_resumen_ia(insights_texto):

    prompt = f"""
    Eres un analista de datos experto.

    Analiza la siguiente información y genera un resumen profesional con:
    - conclusiones claras
    - recomendaciones de negocio
    - lenguaje natural

    Datos:
    {insights_texto}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error generando IA: {str(e)}"