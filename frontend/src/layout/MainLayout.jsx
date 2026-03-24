export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-5">
        <h2 className="text-xl font-bold mb-6">SmartInsight</h2>
        <ul className="space-y-3">
          <li>Dashboard</li>
          <li>Datasets</li>
          <li>Insights IA</li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>

    </div>
  )
}