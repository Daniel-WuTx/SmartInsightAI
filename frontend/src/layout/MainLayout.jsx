import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function MainLayout({ children, datasetActivo }) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar datasetActivo={datasetActivo} />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}