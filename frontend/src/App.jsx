import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Registro from './pages/Registro'
import RecuperarPassword from './pages/RecuperarPassword'
import Dashboard from './pages/Dashboard'
import Camaras from './pages/Camaras'
import Alertas from './pages/Alertas'
import Dispositivos from './pages/Dispositivos'
import Perfil from './pages/Perfil'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login"     element={<Login />} />
          <Route path="/registro"  element={<Registro />} />
          <Route path="/recuperar" element={<RecuperarPassword />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/camaras"      element={<PrivateRoute><Camaras /></PrivateRoute>} />
          <Route path="/alertas"      element={<PrivateRoute><Alertas /></PrivateRoute>} />
          <Route path="/dispositivos" element={<PrivateRoute><Dispositivos /></PrivateRoute>} />
          <Route path="/perfil"       element={<PrivateRoute><Perfil /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App