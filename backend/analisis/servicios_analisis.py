import pandas as pd
import json


def analizar_dataset(dataset):
    from .services.ia_service import generar_resumen_ia  # ✅ CORREGIDO
    from .models import ResultadoAnalisis

    ruta_archivo = dataset.archivo.path

    # ======================
    # CARGAR ARCHIVO
    # ======================
    if ruta_archivo.endswith('.csv'):
        df = pd.read_csv(ruta_archivo)
    elif ruta_archivo.endswith('.xlsx'):
        df = pd.read_excel(ruta_archivo)
    else:
        return

    # ======================
    # MÉTRICAS BÁSICAS
    # ======================
    total_registros = df.shape[0]
    total_columnas = df.shape[1]

    columnas_numericas = df.select_dtypes(include=['int64', 'float64']).shape[1]
    columnas_categoricas = df.select_dtypes(include=['object']).shape[1]
    columnas_fecha = df.select_dtypes(include=['datetime64[ns]']).shape[1]

    insights_lista = []
    graficos = []

    columnas_num = df.select_dtypes(include=['int64', 'float64']).columns

    # ======================
    # INSIGHTS NUMÉRICOS
    # ======================
    for columna in columnas_num:
        suma = df[columna].sum()
        promedio = df[columna].mean()

        insights_lista.append(
            f"Columna {columna}: suma={suma}, promedio={round(promedio, 2)}"
        )

    # ======================
    # DETECCIÓN DE COLUMNAS CLAVE
    # ======================
    columna_ventas = None
    columna_fecha = None
    columna_producto = None
    columna_categoria = None

    for col in df.columns:
        nombre = col.lower()

        if not columna_ventas and ("venta" in nombre or "sales" in nombre or "revenue" in nombre):
            columna_ventas = col

        if not columna_fecha and ("fecha" in nombre or "date" in nombre):
            columna_fecha = col

        if not columna_producto and ("producto" in nombre or "product" in nombre):
            columna_producto = col

        if not columna_categoria and ("categoria" in nombre or "category" in nombre):
            columna_categoria = col

    # ======================
    # INSIGHTS DE VENTAS
    # ======================
    if columna_ventas:

        total_ventas = df[columna_ventas].sum()
        promedio_ventas = df[columna_ventas].mean()

        insights_lista.append(
            f"Ventas totales detectadas en '{columna_ventas}': {round(total_ventas, 2)}"
        )

        insights_lista.append(
            f"Promedio de ventas: {round(promedio_ventas, 2)}"
        )

        # OUTLIERS
        q1 = df[columna_ventas].quantile(0.25)
        q3 = df[columna_ventas].quantile(0.75)
        iqr = q3 - q1

        outliers = df[
            (df[columna_ventas] < (q1 - 1.5 * iqr)) |
            (df[columna_ventas] > (q3 + 1.5 * iqr))
        ]

        if len(outliers) > 0:
            insights_lista.append(
                f"Se detectaron {len(outliers)} valores atípicos en las ventas"
            )

    # ======================
    # ANÁLISIS TEMPORAL
    # ======================
    if columna_fecha:
        try:
            df[columna_fecha] = pd.to_datetime(df[columna_fecha])
        except:
            columna_fecha = None

    if columna_fecha and columna_ventas:

        df['mes'] = df[columna_fecha].dt.to_period('M')

        ventas_por_mes = df.groupby('mes')[columna_ventas].sum()

        mejor_mes = ventas_por_mes.idxmax()
        valor_mejor_mes = ventas_por_mes.max()

        insights_lista.append(
            f"El mes con más ventas fue {mejor_mes} con {round(valor_mejor_mes, 2)}"
        )

        if ventas_por_mes.is_monotonic_increasing:
            insights_lista.append("Las ventas muestran una tendencia creciente")
        elif ventas_por_mes.is_monotonic_decreasing:
            insights_lista.append("Las ventas muestran una tendencia decreciente")
        else:
            insights_lista.append("Las ventas fluctúan a lo largo del tiempo")

        grafico_linea = {
            "tipo": "linea",
            "categoria": "mes",
            "valor": columna_ventas,
            "labels": [str(x) for x in ventas_por_mes.index],
            "data": [float(x) for x in ventas_por_mes.values]
        }

        graficos.append(grafico_linea)

    # ======================
    # INSIGHTS INTELIGENTES
    # ======================
    if columna_producto and columna_ventas:

        ventas_producto = df.groupby(columna_producto)[columna_ventas].sum()

        top_producto = ventas_producto.idxmax()
        valor_top = ventas_producto.max()

        insights_lista.append(
            f"El producto más vendido es {top_producto} con {round(valor_top, 2)} en ventas"
        )

    if columna_categoria and columna_ventas:

        ventas_categoria = df.groupby(columna_categoria)[columna_ventas].sum()

        top_categoria = ventas_categoria.idxmax()
        valor_categoria = ventas_categoria.max()

        total = ventas_categoria.sum()
        porcentaje = (valor_categoria / total) * 100

        insights_lista.append(
            f"La categoría '{top_categoria}' representa el {round(porcentaje, 2)}% de las ventas"
        )

    # ======================
    # PREVIEW
    # ======================
    preview = df.head(10).to_string()

    # ======================
    # GRAFICOS
    # ======================
    col_categoricas = df.select_dtypes(include=['object']).columns
    col_numericas = df.select_dtypes(include=['int64', 'float64']).columns

    for cat in col_categoricas[:2]:
        for num in col_numericas[:2]:

            agrupado = df.groupby(cat)[num].sum().sort_values(ascending=False).head(10)

            grafico = {
                "tipo": "barras",
                "categoria": cat,
                "valor": num,
                "labels": [str(x) for x in agrupado.index],
                "data": [float(x) for x in agrupado.values]
            }

            graficos.append(grafico)

    # ======================
    # IA
    # ======================
    insights_texto = "\n".join(insights_lista)

    print("📊 INSIGHTS:", insights_texto)

    resumen_ia = generar_resumen_ia(insights_texto)

    print("🧠 RESPUESTA IA:", resumen_ia)

    if not resumen_ia or "Error" in resumen_ia:
        resumen_ia = "No se pudo generar el análisis con IA."

    # ======================
    # FINAL
    # ======================
    datos_graficos = json.dumps(graficos)

    ResultadoAnalisis.objects.create(
        dataset=dataset,
        total_registros=total_registros,
        total_columnas=total_columnas,
        columnas_numericas=columnas_numericas,
        columnas_categoricas=columnas_categoricas,
        columnas_fecha=columnas_fecha,
        insights=insights_texto,
        preview_datos=preview,
        datos_graficos=datos_graficos,
        resumen_ia=resumen_ia
    )