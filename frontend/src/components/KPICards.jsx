import { FaDollarSign, FaChartLine, FaShoppingCart } from "react-icons/fa"
import { MdTrendingUp, MdTrendingDown } from "react-icons/md"

const kpiConfig = [
  {
    label: "Ventas Totales",
    icon: FaDollarSign,
    color: "blue",
    key: "total_ventas",
    format: (v) => `$${Number(v).toLocaleString()}`,
  },
  {
    label: "Órdenes",
    icon: FaShoppingCart,
    color: "violet",
    key: "total_ordenes",
    format: (v) => Number(v).toLocaleString(),
  },
  {
    label: "Crecimiento",
    icon: FaChartLine,
    color: "emerald",
    key: "crecimiento",
    format: (v) => `${v}%`,
  },
  {
    label: "Registros",
    icon: MdTrendingUp,
    color: "orange",
    key: "total_registros",
    format: (v) => Number(v).toLocaleString(),
  },
]

const colorMap = {
  blue:    { bg: "bg-blue-50 dark:bg-blue-900/20",    icon: "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300",    value: "text-blue-700 dark:text-blue-300" },
  violet:  { bg: "bg-violet-50 dark:bg-violet-900/20", icon: "bg-violet-100 dark:bg-violet-800 text-violet-600 dark:text-violet-300", value: "text-violet-700 dark:text-violet-300" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: "bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300", value: "text-emerald-700 dark:text-emerald-300" },
  orange:  { bg: "bg-orange-50 dark:bg-orange-900/20", icon: "bg-orange-100 dark:bg-orange-800 text-orange-600 dark:text-orange-300", value: "text-orange-700 dark:text-orange-300" },
}

export default function KPICards({ dashboard, loading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiConfig.map(({ label, icon: Icon, color, key, format }) => {
        const raw = dashboard?.[key]
        const value = raw != null ? format(raw) : "--"
        const c = colorMap[color]

        return (
          <div
            key={label}
            className={`${c.bg} p-5 rounded-2xl border border-transparent hover:shadow-md transition-all duration-200 cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide">
                {label}
              </span>
              <div className={`${c.icon} p-2 rounded-lg`}>
                <Icon className="text-base" />
              </div>
            </div>
            <p className={`text-2xl font-bold ${c.value} ${loading ? "animate-pulse opacity-40" : ""}`}>
              {loading ? "..." : value}
            </p>
          </div>
        )
      })}
    </div>
  )
}