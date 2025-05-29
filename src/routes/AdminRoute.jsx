import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../features/auth/context/UserContext';

// Solo permite acceso si el usuario es admin
export default function AdminRoute({ children }) {
  const { user } = useContext(UserContext);
  if (!user) return null; // O un loader
  if (user.tipo_usuario !== 'adm') {
    return <Navigate to="/landing" replace />;
  }
  return children;
}
