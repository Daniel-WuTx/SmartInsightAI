const API_URL = "http://127.0.0.1:8000/api"

// ======================
// 🔐 HEADERS CON TOKEN
// ======================
function getHeaders() {
  const token = localStorage.getItem("token")

  console.log("Token en getHeaders:", token) // Debug: Verificar si el token se obtiene correctamente

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// ======================
// 📊 DASHBOARD
// ======================
export async function getDashboard(datasetId) {
  const res = await fetch(`${API_URL}/dashboard/${datasetId}/`, {
    headers: getHeaders()
  })

  return res.json()
}

// ======================
// 🤖 IA (CHAT)
// ======================
export async function preguntarIA(pregunta, datasetId) {
  const res = await fetch(`${API_URL}/ia/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      pregunta,
      dataset_id: datasetId
    })
  })

  return res.json()
}

// ======================
// 📂 DATASETS
// ======================
export async function getDatasets() {
  const res = await fetch(`${API_URL}/datasets/`, {
    headers: getHeaders()
  })

  console.log("STATUS DATASETS:", res.status)

  if (!res.ok) {
    const text = await res.text()
    console.error("ERROR BACKEND:", text)
    throw new Error("Error cargando datasets")
  }

  return res.json()
}