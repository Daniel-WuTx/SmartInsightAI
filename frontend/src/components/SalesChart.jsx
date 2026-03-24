import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"

import { Bar, Line } from "react-chartjs-2"

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

export default function SalesChart({ data }) {

  if (!data || !data.labels) return null

  // 🎨 PALETA PRO
  const colors = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#A855F7"
  ]

  // 🔥 GRADIENTE PARA LINEA
  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
    gradient.addColorStop(0, "rgba(99, 102, 241, 0.5)")
    gradient.addColorStop(1, "rgba(99, 102, 241, 0)")
    return gradient
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.valor || "Datos",
        data: data.data,

        // 🔥 COLORES DINÁMICOS
        backgroundColor:
          data.tipo === "linea"
            ? (context) => {
                const { chart } = context
                const { ctx, chartArea } = chart
                if (!chartArea) return null
                return createGradient(ctx, chartArea)
              }
            : data.data.map((_, i) => colors[i % colors.length]),

        borderColor: "#6366F1",
        borderWidth: 2,
        borderRadius: 8,

        tension: 0.4,
        fill: data.tipo === "linea",

        pointBackgroundColor: "#fff",
        pointBorderColor: "#6366F1",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#9CA3AF",
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#9CA3AF",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#9CA3AF" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#9CA3AF" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  }

  const containerClass =
    "bg-white dark:bg-gray-800 p-4 rounded-2xl shadow mb-6 text-black dark:text-white transition-all duration-300 hover:shadow-xl"

  if (data.tipo === "linea") {
    return (
      <div className={containerClass}>
        <h3 className="font-bold mb-2">
          📈 {data.valor} por {data.categoria}
        </h3>
        <Line data={chartData} options={options} />
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <h3 className="font-bold mb-2">
        📊 {data.valor} por {data.categoria}
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  )
}