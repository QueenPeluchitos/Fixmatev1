import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../features/landing/Landing';
import Login from '../features/auth/Login';
import Registro from '../features/auth/Registro';
import AuthProvider from '../features/auth/context/AuthProvider';
import Layout from '../common/components/layouts/Layout';
import ChatDirecto from '../features/chatDirecto/ChatDirecto';
import CitaUsuario from '../features/CitaUsuario/CitaUsuario';
import CrearServicio from '../features/crearservicio/CrearServicio';
import CredencialProf from '../features/credencialProf/CredencialProf';
import DenunciaUsuario from '../features/denunciaUsuario/DenunciaUsuario';
import PerfilProf from '../features/PerfilProf/PerfilProf';
import PerfilUsuario from '../features/PerfilUsuario/PerfilUsuario';
import RegistroProf from '../features/RegistroProf/RegistroProf';
import ResenaUsuario from '../features/resenaUsuario/ResenaUsuario';
import ServicioCursoProf from '../features/servicioCursoProf/ServicioCursoProf';
import ServicioPendiente from '../features/servicioPendiente/ServicioPendiente';
import ServicioProf from '../features/servicioProf/ServicioProf';
import ServicioUsuario from '../features/servicioUsuario/ServicioUsuario';
import ServicioIniciado from '../features/ServicioIniciado/ServicioIniciado';
import Faq from '../features/faq/Faq';
import Soporte from '../features/soporte/Soporte';
import RecuperarPassword from '../features/auth/RecuperarPassword';
import Verificacion2FA from '../features/auth/Verificacion2FA';

import Profesionista from '../features/admin_prof/Profesionista';
import Usuario from '../features/admin_usuario/Usuario';
import Reportes from '../features/admin_reportes/Reportes';
import Dashboard from '../features/dashboard/Dashboard';
import AdminRoute from './AdminRoute';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/recuperar-password" element={<RecuperarPassword />} />
      <Route path="/verificacion-2fa" element={<Verificacion2FA />} />
      
      <Route element={<AuthProvider><Layout /></AuthProvider>}>
        {/* Rutas para usuarios y profesionistas (no admin) */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/chat-directo" element={<ChatDirecto />} />
        <Route path="/cita-usuario" element={<CitaUsuario />} />
        <Route path="/crear-servicio" element={<CrearServicio />} />
        <Route path="/credencial" element={<CredencialProf />} />
        <Route path="/denuncia" element={<DenunciaUsuario />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/perfil-profesionista" element={<PerfilProf />} />
        <Route path="/perfil-usuario" element={<PerfilUsuario />} />
        <Route path="/registro-profesionista" element={<RegistroProf />} />
        <Route path="/reseña" element={<ResenaUsuario />} />
        <Route path="/servicio-en-curso-profesionista" element={<ServicioCursoProf />} />
        <Route path="/servicio-iniciado" element={<ServicioIniciado />} />
        <Route path="/servicio-pendiente" element={<ServicioPendiente />} />
        <Route path="/servicio-profesionista" element={<ServicioProf />} />
        <Route path="/servicio-usuario/:id" element={<ServicioUsuario />} />
       
        <Route path="/soporte" element={<Soporte />} />
        {/* Rutas solo para admin, protegidas */}
        <Route path="/profesionista" element={<AdminRoute><Profesionista /></AdminRoute>} />
        <Route path="/usuario" element={<AdminRoute><Usuario /></AdminRoute>} />
        <Route path="/reportes" element={<AdminRoute><Reportes /></AdminRoute>} />
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
