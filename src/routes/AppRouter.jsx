import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../features/landing/Landing';
import Login from '../features/auth/Login';
import AuthProvider from '../features/auth/context/AuthProvider';
import Layout from '../common/components/layouts/Layout';
import ChatDirecto from '../features/ChatDirecto/ChatDirecto';
import CitaUsuario from '../features/CitaUsuario/CitaUsuario';
import CredencialPorf from '../features/CredencialPorf/CredencialPorf';
import DenunciaUsuario from '../features/DenunciaUsuario/DenunciaUsuario';
import PerfilProf from '../features/PerfilProf/PerfilProf';
import PerfilUsuario from '../features/PerfilUsuario/PerfilUsuario';
import RegistroProf from '../features/RegistroProf/RegistroProf';
import ReseñaUsuario from '../features/ReseñaUsuario/ReseñaUsuario';
import ServicioCursoProf from '../features/ServicioCursoProf/ServicioCursoProf';
import ServicioUsuario from '../features/ServicioUsuario/ServicioUsuario';
import ServicioPendiente from '../features/ServicioPendiente/ServicioPendiente';
import SerivicioProf from '../features/ServicioProf/ServicioProf';
import ServiciosUsuario from '../features/ServiciosUsuario/ServiciosUsuario';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<AuthProvider><Layout /></AuthProvider>}>
        <Route path="/landing" element={<Landing />} />
        {/* otras rutas privadas aquí */}
        <Route path="/chat-directo" element={<ChatDirecto />} />
        <Route path="/cita-usuario" element={<CitaUsuario />} />
        <Route path="/credencial" element={<CredencialPorf />} />
        <Route path="/denucia" element={<DenunciaUsuario />} />  
        <Route path="/perfil-profesionista" element={<PerfilProf />} />
        <Route path="/perfil-usuario" element={<PerfilUsuario />} />
        <Route path="/registro-profesionista" element={<RegistroProf />} />
        <Route path="/reseña" element={<ReseñaUsuario />} />
        <Route path="/servicio-en-curso-profesionista" element={<ServicioCursoProf />} />
        <Route path="/servicio-usuario" element={<ServicioUsuario />} />
        <Route path="/servicio-pendiente" element={<ServicioPendiente />} />
        <Route path="/servicio-preofesionista" element={<SerivicioProf />} />
        <Route path="/servicio-usuario" element={<ServiciosUsuario />} />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
