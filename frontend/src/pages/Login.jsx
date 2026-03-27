import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/api"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!username || !password) return setError("Completa todos los campos")
    setLoading(true)
    setError("")

    try {
      const data = await login(username, password)
      if (data.access) {
        localStorage.setItem("token", data.access)
        navigate("/")
      } else {
        setError("Credenciales incorrectas")
      }
    } catch {
      setError("Error conectando con el servidor")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin()
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm">

        <div className="text-center mb-6">
          <span className="text-4xl">📊</span>
          <h1 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">SmartInsight AI</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Inicia sesión para continuar</p>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mb-4">
            ⚠️ {error}
          </p>
        )}

        <input
          placeholder="Usuario"
          value={username}
          className="w-full mb-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          className="w-full mb-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white w-full p-3 rounded-lg font-medium transition"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

      </div>
    </div>
  )
}
