import { useNavigate, useLocation } from "react-router-dom"
import { MdSettings, MdLogout, MdLightMode, MdDarkMode } from "react-icons/md"
import { useState } from "react"

const pageTitles = {
  "/": "Dashboard",
  "/datasets": "Datasets",
  "/upload": "Subir Excel",
  "/configuracion": "Configuración",
}

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDark, setIsDark] = useState(false)

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const pageTitle = pageTitles[location.pathname] || "SmartInsight"

  return (
    <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex justify-between items-center">

      {/* TÍTULO DE LA PÁGINA ACTUAL */}
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
        {pageTitle}
      </h1>

      {/* ACCIONES */}
      <div className="flex items-center gap-1">

        {/* DARK MODE */}
        <button
          onClick={toggleDark}
          className="p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          title="Cambiar tema"
        >
          {isDark ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
        </button>

        {/* CONFIGURACIÓN */}
        <button
          onClick={() => navigate("/configuracion")}
          className="p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          title="Configuración"
        >
          <MdSettings className="text-xl" />
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition"
          title="Cerrar sesión"
        >
          <MdLogout className="text-xl" />
        </button>

        {/* AVATAR */}
        <div className="ml-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
          DG
        </div>

      </div>
    </div>
  )
}