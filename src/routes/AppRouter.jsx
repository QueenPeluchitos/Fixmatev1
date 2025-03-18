import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../app/App';
import Landing from '../features/landing/Landing';
import Login from '../features/auth/Login';
import AuthProvider from '../features/auth/context/AuthProvider';
import Layout from '../common/components/layouts/Layout';


const AppRouter = () => (
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<AuthProvider><Layout /></AuthProvider>}>
          <Route path="/landing" element={<Landing/>} />
        </Route> 
        {/* Otras rutas */}
        <Route path="*" element={<Login />} />
      </Routes>
    </App>
  </BrowserRouter>
);

export default AppRouter;