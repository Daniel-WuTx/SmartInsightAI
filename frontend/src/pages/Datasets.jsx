import { useEffect, useState } from "react"
import { getDatasets } from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Datasets() {
  const [datasets, setDatasets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getDatasets()
      .then(setDatasets)
      .catch(() => setError("Error cargando datasets"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-500">
      Cargando datasets...
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">📁 Datasets</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {datasets.length} dataset{datasets.length !== 1 ? "s" : ""} disponible{datasets.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Subir nuevo
        </button>
      </div>

      {error && (
        <p className="text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mb-4">⚠️ {error}</p>
      )}

      {datasets.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">📂</p>
          <p className="text-lg">No hay datasets todavía</p>
          <button
            onClick={() => navigate("/upload")}
            className="mt-4 text-blue-500 hover:underline text-sm"
          >
            Subir tu primer dataset
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {datasets.map((d) => (
            <div
              key={d.id}
              onClick={() => navigate(`/?dataset=${d.id}`)}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">📊</span>
                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  ID: {d.id}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                {d.nombre || d.name || `Dataset ${d.id}`}
              </h3>
              <p className="text-xs text-blue-500 mt-2 hover:underline">
                Ver dashboard →
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
