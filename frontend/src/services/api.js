const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"

// ======================
// 🔐 HEADERS CON TOKEN
// ======================
function getHeaders() {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// ======================
// 🔐 LOGIN
// ======================
export async function login(username, password) {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  return res.json()
}

// ======================
// 📊 DASHBOARD
// ======================
export async function getDashboard(datasetId) {
  const res = await fetch(`${API_URL}/dashboard/${datasetId}/`, {
    headers: getHeaders()
  })
  if (!res.ok) throw new Error("Error cargando dashboard")
  return res.json()
}

// ======================
// 🤖 IA (CHAT)
// ======================
export async function preguntarIA(pregunta, datasetId) {
  const res = await fetch(`${API_URL}/ia/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ pregunta, dataset_id: datasetId })
  })
  if (!res.ok) throw new Error("Error consultando IA")
  return res.json()
}

// ======================
// 📂 DATASETS
// ======================
export async function getDatasets() {
  const res = await fetch(`${API_URL}/datasets/`, {
    headers: getHeaders()
  })
  if (!res.ok) throw new Error("Error cargando datasets")
  return res.json()
}

// ======================
// 📤 SUBIR DATASET
// ======================
export async function subirDataset(file) {
  const token = localStorage.getItem("token")
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${API_URL}/datasets/upload/`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: formData
  })
  if (!res.ok) throw new Error("Error subiendo dataset")
  return res.json()
}

// ======================
// 📄 EXPORTAR PDF
// ======================
export async function exportarPDF(datasetId) {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/pdf/${datasetId}/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!res.ok) throw new Error("Error generando PDF")
  return res.blob()
}
