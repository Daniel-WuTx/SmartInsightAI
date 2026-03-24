export default function Header({ logout }) {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark")
  }
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow flex justify-between items-center text-black dark:text-white">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <button onClick={toggleDark}>
        🌙
      </button>
      </div>
    </div>
  )
}