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

  const colors = [
    "#6366F1", "#22C55E", "#F59E0B",
    "#EF4444", "#3B82F6", "#A855F7"
  ]

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#9CA3AF" },
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

  if (data.tipo === "linea") {
    return <Line data={chartData} options={options} />
  }

  return <Bar data={chartData} options={options} />
}