import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Registro = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Aquí iría el request real al backend
      console.log('User registered:', { name, email, password });
      Cookies.set('authToken', 'true', { expires: 1, secure: true });
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
      setErrorMessage('Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side with registration form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-96">
          <h1 className="text-3xl font-bold text-yellow-500 mb-2">Crea tu cuenta</h1>
          <p className="text-gray-600 mb-8">Llena los campos para registrarte</p>

          {errorMessage && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {errorMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <input
                type="text"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                type="password"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-200"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-blue-600 font-medium">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right side with image */}
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden">
        <img 
          src='/images/imagenpararegistro.jpg'
          alt="Fondo decorativo"
          className="absolute inset-0 w-full h-full object-cover z-2" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 text-center">
          <div className="flex flex-col items-center">
            <img src="/images/fixmatelogo.png" alt="FixMate" className="h-16" />
            <span className="text-4xl font-bold text-white mt-2">FixMate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
