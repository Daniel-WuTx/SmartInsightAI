import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { subirDataset } from "../services/api"

export default function Upload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleUpload = async () => {
    if (!file) return setError("Selecciona un archivo primero")

    setLoading(true)
    setError("")

    try {
      const data = await subirDataset(file)

      if (data.dataset_id || data.id) {
        navigate("/")
      } else {
        setError("El servidor no devolvió un dataset válido. Revisa el backend.")
        console.error("Respuesta inesperada:", data)
      }
    } catch (err) {
      setError("Error subiendo el archivo. Verifica que el backend esté corriendo.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          📤 Subir Dataset
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Sube un archivo Excel (.xlsx) para analizarlo con IA
        </p>

        {/* Zona de carga */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 cursor-pointer hover:border-blue-400 transition-colors mb-4">
          <span className="text-4xl mb-2">📊</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {file ? file.name : "Haz clic para seleccionar un archivo .xlsx"}
          </span>
          <input
            type="file"
            accept=".xlsx"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0])
              setError("")
            }}
          />
        </label>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            ⚠️ {error}
          </p>
        )}

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg font-medium transition"
          >
            {loading ? "Subiendo..." : "Subir"}
          </button>
        </div>

      </div>
    </div>
  )
}
