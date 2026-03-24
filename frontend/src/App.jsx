import MainLayout from "./layout/MainLayout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoute from "./routes/PrivateRoute"
import Upload from "./pages/Upload"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App