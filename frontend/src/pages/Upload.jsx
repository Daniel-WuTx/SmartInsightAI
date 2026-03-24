import { useState } from "react"

export default function Upload() {

  const [file, setFile] = useState(null)

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo")

    const formData = new FormData()
    formData.append("file", file)

    const token = localStorage.getItem("token")

    const res = await fetch(
      "http://127.0.0.1:8000/api/custom-datasets/upload/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )

    const data = await res.json()

    if (data.dataset_id) {
      alert("Dataset subido 🚀")
      window.location.href = "/"
    } else {
      alert("Error subiendo archivo")
    }
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Subir Excel
      </h1>

      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Subir
      </button>

    </div>
  )
}