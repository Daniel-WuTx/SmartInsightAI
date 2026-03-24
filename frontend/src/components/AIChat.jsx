import { useState } from "react"
import { preguntarIA } from "../services/api"

export default function AIChat({ datasetId }) {

  const [pregunta, setPregunta] = useState("")
  const [respuesta, setRespuesta] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!pregunta) return

    setLoading(true)

    const res = await preguntarIA(pregunta, datasetId)

    setRespuesta(res.respuesta)
    setLoading(false)
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">

      <h2 className="text-lg font-semibold mb-3">
        🤖 Preguntar a la IA
      </h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Ej: ¿Cuál fue el mejor mes?"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleAsk}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Preguntar
        </button>
      </div>

      {loading && (
        <p className="mt-3 text-gray-500">Pensando...</p>
      )}

      {respuesta && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          {respuesta}
        </div>
      )}

    </div>
  )
}