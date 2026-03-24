import { useEffect, useState } from "react"
import { getDashboard, getDatasets } from "../services/api"
import SalesChart from "../components/SalesChart"
import AIChat from "../components/AIChat"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import KPICards from "../components/KPICards"

export default function Dashboard() {

  const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  const descargarPDF = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `http://127.0.0.1:8000/api/pdf/${datasetId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error("No autorizado o error generando PDF")
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "dashboard.pdf"
      a.click()
    } catch (error) {
      alert("Error exportando PDF")
      console.error(error)
    }
  }

  const [datasets, setDatasets] = useState([])
  const [datasetId, setDatasetId] = useState(null)
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    getDatasets()
      .then((data) => {
        setDatasets(data)
        if (data.length > 0) {
          setDatasetId(data[0].id)
        }
      })
      .catch(() => {
        alert("Error cargando datasets")
      })
  }, [])

  useEffect(() => {
    if (datasetId) {
      getDashboard(datasetId)
        .then(setDashboard)
        .catch(() => {
          alert("Error cargando dashboard")
        })
    }
  }, [datasetId])

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
        Cargando...
      </div>
    )
  }

  let graficos = []

  try {
    graficos =
      typeof dashboard.datos_graficos === "string"
        ? JSON.parse(dashboard.datos_graficos)
        : dashboard.datos_graficos || []
  } catch {
    graficos = []
  }

  if (!Array.isArray(graficos)) {
    graficos = [graficos]
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENIDO */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <Header logout={logout} />

        {/* KPIs (componente) */}
        <div className="p-6 pb-0">
          <KPICards />
        </div>

        {/* MAIN */}
        <div className="p-6 space-y-6">

          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row justify-between gap-4">

            <select
              value={datasetId || ""}
              onChange={(e) => setDatasetId(parseInt(e.target.value))}
              className="border p-2 rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              {datasets.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>

            <button
              onClick={descargarPDF}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
            >
              Exportar PDF
            </button>

          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
              <p className="text-gray-500 dark:text-gray-300">Total registros</p>
              <h2 className="text-2xl font-bold">
                {dashboard.total_registros}
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
              <p className="text-gray-500 dark:text-gray-300">Columnas</p>
              <h2 className="text-2xl font-bold">
                {dashboard.total_columnas}
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
              <p className="text-gray-500 dark:text-gray-300">Numéricas</p>
              <h2 className="text-2xl font-bold">
                {dashboard.columnas_numericas}
              </h2>
            </div>

          </div>

          {/* INSIGHTS */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
            <h2 className="font-bold mb-2 text-lg">
              🧠 Insights
            </h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
              {dashboard.insights}
            </pre>
          </div>

          {/* GRAFICOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {graficos.length > 0 ? (
              graficos.map((g, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow"
                >
                  <SalesChart data={g} />
                </div>
              ))
            ) : (
              <p>No hay gráficos disponibles</p>
            )}
          </div>

          {/* IA */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
            <AIChat datasetId={datasetId} />
          </div>

        </div>
      </div>
    </div>
  )
}