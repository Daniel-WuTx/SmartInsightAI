import { useState } from "react"

export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (data.access) {
      localStorage.setItem("token", data.access)
      window.location.href = "/"
    } else {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-80">

        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          placeholder="Usuario"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}