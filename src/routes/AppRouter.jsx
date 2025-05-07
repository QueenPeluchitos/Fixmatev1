import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../features/landing/Landing';
import Login from '../features/auth/Login';
import AuthProvider from '../features/auth/context/AuthProvider';
import Layout from '../common/components/layouts/Layout';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<AuthProvider><Layout /></AuthProvider>}>
        <Route path="/landing" element={<Landing />} />
        {/* otras rutas privadas aquí */}
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
