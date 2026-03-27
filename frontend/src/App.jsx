import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoute from "./routes/PrivateRoute"
import MainLayout from "./layout/MainLayout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Upload from "./pages/Upload"
import Datasets from "./pages/Datasets"
import Configuracion from "./pages/Configuracion"
import Reportes from "./pages/Reportes"
import Ayuda from "./pages/Ayuda"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas con layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/datasets"
          element={
            <PrivateRoute>
              <MainLayout>
                <Datasets />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />
        <Route
          path="/configuracion"
          element={
            <PrivateRoute>
              <MainLayout>
                <Configuracion />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/reportes"
          element={
            <PrivateRoute>
              <MainLayout>
                <Reportes />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ayuda"
          element={
            <PrivateRoute>
              <MainLayout>
                <Ayuda />
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
