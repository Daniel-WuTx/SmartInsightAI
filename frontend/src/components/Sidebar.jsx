import { NavLink, useNavigate } from "react-router-dom"
import {
  MdDashboard,
  MdFolder,
  MdUploadFile,
  MdSettings,
  MdLogout,
  MdHelp,
  MdAssessment,
} from "react-icons/md"
import { FaChartBar, FaDatabase } from "react-icons/fa"

const mainNav = [
  { icon: MdDashboard, label: "Dashboard", to: "/" },
  { icon: MdAssessment, label: "Reportes", to: "/reportes" },
  { icon: MdFolder, label: "Datasets", to: "/datasets" },
  { icon: MdUploadFile, label: "Subir Excel", to: "/upload" },
]

const bottomNav = [
  { icon: MdHelp, label: "Ayuda", to: "/ayuda" },
  { icon: MdSettings, label: "Configuración", to: "/configuracion" },
]

export default function Sidebar({ datasetActivo }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="w-60 min-h-screen bg-slate-900 flex flex-col">

      {/* LOGO */}
      <div className="flex items-center gap-2 px-5 py-6 border-b border-slate-700">
        <FaChartBar className="text-orange-400 text-xl" />
        <span className="text-white font-bold text-lg tracking-tight">
          SmartInsight
        </span>
      </div>

      {/* PERFIL DE USUARIO */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-700">
        <div className="w-9 h-9 rounded-full bg-orange-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
          DG
        </div>
        <div className="overflow-hidden">
          <p className="text-white text-sm font-medium truncate">Daniel Gutierrez</p>
          <p className="text-slate-500 text-xs truncate">Ing. de Sistemas</p>
        </div>
      </div>

      {/* DATASET ACTIVO */}
      {datasetActivo && (
        <div className="mx-3 mt-3 px-3 py-2.5 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
            Dataset activo
          </p>
          <div className="flex items-center gap-2">
            <FaDatabase className="text-orange-400 text-xs shrink-0" />
            <p className="text-slate-300 text-xs truncate">{datasetActivo}</p>
          </div>
        </div>
      )}

      {/* NAV PRINCIPAL */}
      <nav className="flex flex-col gap-1 p-3 flex-1 mt-2">

        <p className="text-slate-600 text-xs uppercase tracking-widest px-3 mb-1">
          Principal
        </p>

        {mainNav.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
              ${isActive
                ? "bg-orange-400 text-white shadow"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon className="text-lg" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* NAV INFERIOR */}
      <div className="flex flex-col gap-1 p-3 border-t border-slate-700">

        <p className="text-slate-600 text-xs uppercase tracking-widest px-3 mb-1">
          Soporte
        </p>

        {bottomNav.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
              ${isActive
                ? "bg-orange-400 text-white shadow"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon className="text-lg" />
            <span>{label}</span>
          </NavLink>
        ))}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
        >
          <MdLogout className="text-lg" />
          <span>Cerrar sesión</span>
        </button>
      </div>

    </div>
  )
}