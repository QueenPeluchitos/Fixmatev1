import { useState } from 'react';
import { fakeLogin } from './utils/fake_login';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const savedUser = {
    name: 'Hamid',
    avatar: '/images/avatar.png'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fakeLogin(email, password);
      console.log('User logged in:', response.user);
      Cookies.set('authToken', 'true', { expires: 1, secure: true });
      navigate('/landing');
      setErrorMessage('');
    } catch (error) {
      console.log('Error logging in:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSavedUserLogin = () => {
    setEmail(savedUser.name.toLowerCase() + '@fixmate.com');
    document.getElementById('password').focus();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side with background image */}
      <div 
        className="w-1/2 bg-cover bg-center relative flex items-center justify-center" 
        style={{ backgroundImage: 'url(/imagenpararegistro.jpg)' }}  // Acceso directo a imagen en public/
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center">
          <div className="flex flex-col items-center">
            <img src="/images/fixmatelogo.png" alt="FixMate" className="h-16" />
            <span className="text-4xl font-bold text-white mt-2">FixMate</span>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-96">
          <h1 className="text-3xl font-bold text-yellow-500 mb-2">Inicia sesión</h1>
          <p className="text-gray-600 mb-8">Ingresa tus datos</p>

          {errorMessage && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {errorMessage}
            </div>
          )}

          {/* Login form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-200"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/registro" className="text-blue-600 font-medium">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
