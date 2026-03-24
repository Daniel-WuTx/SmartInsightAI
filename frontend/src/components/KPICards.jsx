import { FaDollarSign, FaChartLine, FaShoppingCart } from "react-icons/fa"

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      {/* 💰 Ventas */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-black dark:text-white 
      transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-500 dark:text-gray-400">Ventas Totales</h2>
          <FaDollarSign className="text-green-500 text-xl" />
        </div>
        <p className="text-2xl font-bold mt-2">$12,450</p>
      </div>

      {/* 🛒 Órdenes */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-black dark:text-white 
      transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-500 dark:text-gray-400">Órdenes</h2>
          <FaShoppingCart className="text-blue-500 text-xl" />
        </div>
        <p className="text-2xl font-bold mt-2">320</p>
      </div>

      {/* 📈 Crecimiento */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-black dark:text-white 
      transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-500 dark:text-gray-400">Crecimiento</h2>
          <FaChartLine className="text-purple-500 text-xl" />
        </div>
        <p className="text-2xl font-bold mt-2">+18%</p>
      </div>

    </div>
  )
}