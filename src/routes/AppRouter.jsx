import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../features/landing/Landing';
import Login from '../features/auth/Login';
import Registro from '../features/auth/Registro';
import AuthProvider from '../features/auth/context/AuthProvider';
import Layout from '../common/components/layouts/Layout';
/*import ChatDirecto from '../features/chatDirecto/ChatDirecto';*/
import CitaUsuario from '../features/citaUsuario/CitaUsuario';
import CredencialProf from '../features/credencialProf/CredencialProf';
import DenunciaUsuario from '../features/denunciaUsuario/DenunciaUsuario';
import PerfilProf from '../features/perfilProf/PerfilProf';
import PerfilUsuario from '../features/perfilUsuario/PerfilUsuario';
import RegistroProf from '../features/registroProf/RegistroProf';
import ResenaUsuario from '../features/resenaUsuario/ResenaUsuario';
import ServicioCursoProf from '../features/servicioCursoProf/ServicioCursoProf';
import ServicioPendiente from '../features/servicioPendiente/ServicioPendiente';
import ServicioProf from '../features/servicioProf/ServicioProf';
import ServicioUsuario from '../features/servicioUsuario/ServicioUsuario';


const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      
      <Route element={<AuthProvider><Layout /></AuthProvider>}>
        <Route path="/landing" element={<Landing />} />
        {/* otras rutas privadas aquí */}
        {/*<Route path="/chat-directo" element={<ChatDirecto />} />*/}
        <Route path="/cita-usuario" element={<CitaUsuario />} />
        <Route path="/credencial" element={<CredencialProf />} />
        <Route path="/denucia" element={<DenunciaUsuario />} />  
        <Route path="/perfil-profesionista" element={<PerfilProf />} />
        <Route path="/perfil-usuario" element={<PerfilUsuario />} />
        <Route path="/registro-profesionista" element={<RegistroProf />} />
        <Route path="/reseña" element={<ResenaUsuario />} />
        <Route path="/servicio-en-curso-profesionista" element={<ServicioCursoProf />} />
        <Route path="/servicio-pendiente" element={<ServicioPendiente />} />
        <Route path="/servicio-profesionista" element={<ServicioProf />} />
        <Route path="/servicio-usuario" element={<ServicioUsuario />} />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
