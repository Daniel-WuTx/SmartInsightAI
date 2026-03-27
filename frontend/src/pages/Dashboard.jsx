import { useEffect, useState } from "react"
import { getDashboard, getDatasets, exportarPDF } from "../services/api"
import SalesChart from "../components/SalesChart"
import AIChat from "../components/AIChat"
import KPICards from "../components/KPICards"
import { MdDownload, MdInsights } from "react-icons/md"
import { FaDatabase } from "react-icons/fa"
import {MdTableChart, MdHistory} from "react-icons/md"

export default function Dashboard() {
  const [datasets, setDatasets] = useState([])
  const [datasetId, setDatasetId] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [loadingDashboard, setLoadingDashboard] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    getDatasets()
      .then((data) => {
        setDatasets(data)
        if (data.length > 0) setDatasetId(data[0].id)
      })
      .catch(() => setError("Error cargando datasets"))
  }, [])

  useEffect(() => {
    if (!datasetId) return
    setLoadingDashboard(true)
    setDashboard(null)
    setError("")
    getDashboard(datasetId)
      .then(setDashboard)
      .catch(() => setError("Error cargando dashboard"))
      .finally(() => setLoadingDashboard(false))
  }, [datasetId])

  const handleExportarPDF = async () => {
    try {
      const blob = await exportarPDF(datasetId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "dashboard.pdf"
      a.click()
      window.URL.revokeObjectURL(url)
    } catch {
      alert("Error exportando PDF")
    }
  }

  let graficos = []
  if (dashboard?.datos_graficos) {
    try {
      graficos = typeof dashboard.datos_graficos === "string"
        ? JSON.parse(dashboard.datos_graficos)
        : dashboard.datos_graficos
      if (!Array.isArray(graficos)) graficos = [graficos]
    } catch {
      graficos = []
    }
  }

  return (
    <div className="p-6 space-y-6">

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-gray-400 dark:text-slate-500 text-xs uppercase tracking-widest mb-1">
            Análisis de datos
          </p>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Panel de Control
          </h1>
        </div>

        <div className="flex gap-2 items-center">
          {/* SELECTOR DATASET */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm shadow-sm">
            <FaDatabase className="text-gray-400 text-xs" />
            <select
              value={datasetId || ""}
              onChange={(e) => setDatasetId(parseInt(e.target.value))}
              className="bg-transparent text-gray-700 dark:text-slate-200 outline-none text-sm"
            >
              {datasets.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre || `Dataset ${d.id}`}
                </option>
              ))}
            </select>
          </div>

          {/* EXPORTAR PDF */}
          <button
            onClick={handleExportarPDF}
            disabled={!dashboard}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <MdDownload className="text-base" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm">
          {error}
        </p>
      )}

      {/* KPI CARDS */}
      <KPICards dashboard={dashboard} loading={loadingDashboard} />

      {/* LOADING */}
      {loadingDashboard && (
        <div className="text-center py-16 text-gray-400 text-sm">
          Cargando análisis...
        </div>
      )}

      {dashboard && (
        // LAYOUT PRINCIPAL — izquierda: insights + chat | derecha: gráficas
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* COLUMNA IZQUIERDA */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* MÉTRICAS DEL DATASET */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-4">
                Métricas del Dataset
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Total registros", value: dashboard.total_registros?.toLocaleString() },
                  { label: "Total columnas", value: dashboard.total_columnas },
                  { label: "Columnas numéricas", value: dashboard.columnas_numericas },
                  { label: "Columnas categóricas", value: dashboard.columnas_categoricas },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-700 last:border-0">
                    <span className="text-sm text-gray-500 dark:text-slate-400">{label}</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* INSIGHTS */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <MdInsights className="text-blue-500 text-lg" />
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                  Insights
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                {dashboard.insights
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg px-3 py-2"
                    >
                      <span className="text-blue-400 mt-0.5 text-xs">●</span>
                      <span className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                        {line.trim()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            {/* PREVIEW DE DATOS */}
            {dashboard.preview_datos && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <MdTableChart className="text-violet-500 text-lg" />
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                    Preview de Datos
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-slate-700">
                        {dashboard.preview_datos
                          .split("\n")[0]
                          .trim()
                          .split(/\s{2,}/)
                          .filter(Boolean)
                          .map((col, i) => (
                            <th key={i} className="text-left py-2 px-2 text-gray-400 dark:text-slate-500 font-medium whitespace-nowrap">
                              {col.trim()}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.preview_datos
                        .split("\n")
                        .slice(1)
                        .filter((line) => line.trim() !== "")
                        .slice(0, 5)
                        .map((row, i) => (
                          <tr key={i} className="border-b border-gray-50 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition">
                            {row.trim().split(/\s{2,}/).filter(Boolean).map((cell, j) => (
                              <td key={j} className="py-2 px-2 text-gray-600 dark:text-slate-300 whitespace-nowrap">
                                {cell.trim()}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* HISTORIAL DE DATASETS */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="flex items-center gap-2 mb-4">
                <MdHistory className="text-orange-500 text-lg" />
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                  Datasets Recientes
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                {datasets.slice(0, 5).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDatasetId(d.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all
                      ${datasetId === d.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                        : "hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaDatabase className="text-xs text-gray-400" />
                      <span className="truncate max-w-[160px]">{d.nombre || `Dataset ${d.id}`}</span>
                    </div>
                    {datasetId === d.id && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full">
                        Activo
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* IA CHAT */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
              <AIChat datasetId={datasetId} />
            </div>

          </div>

          {/* COLUMNA DERECHA — GRÁFICAS */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {graficos.length > 0 ? (
              graficos.map((g, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-4">
                    {g.valor} por {g.categoria}
                  </p>
                  <div className="h-64">
                    <SalesChart data={g} />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-10 flex items-center justify-center text-gray-400 text-sm">
                No hay gráficos disponibles para este dataset
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  )
}