export default function Configuracion() {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">⚙️ Configuración</h1>

      <div className="space-y-4">

        {/* Apariencia */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">🎨 Apariencia</h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Modo oscuro</span>
            <button
              onClick={toggleDark}
              className="bg-gray-200 dark:bg-blue-500 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
              Alternar
            </button>
          </div>
        </div>

        {/* Cuenta */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">👤 Cuenta</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Info */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">ℹ️ Acerca de</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">SmartInsight AI v1.0</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Desarrollado por Daniel Gutierrez Madrid</p>
        </div>

      </div>
    </div>
  )
}
