export default function Sidebar() {
  return (
    
    <div className="bg-white dark:bg-gray-800 h-full text-black dark:text-white">
      <h2 className="text-xl font-bold mb-6">SmartInsight</h2>

      <nav className="space-y-3">
        <div className="p-2 hover:bg-gray-500 rounded cursor-pointer">
          📊 Dashboard
        </div>

        <div className="p-2 hover:bg-gray-500 rounded cursor-pointer">
          📁 Datasets
        </div>

        <div className="p-2 hover:bg-gray-500 rounded cursor-pointer">
          ⚙️ Configuración
        </div>
        
        <div className="p-2 hover:bg-gray-500 rounded cursor-pointer">
        <a href="/upload" className="p-2 hover:bg-gray-500 rounded cursor-pointer">
          📤 Subir Excel
        </a>
        </div>
      </nav>
    </div>
  )
}