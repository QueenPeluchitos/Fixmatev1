import { useState } from 'react';
import { fakeLogin } from './utils/fake_login';
import Cookies from 'js-cookie';
import {useNavigate } from 'react-router-dom';

const Login = () => {
 // const apiUrl = import.meta.env.URL_FIXMATE_API; // Obtener la URL de la API desde el archivo .env
 const navigate= useNavigate(); 
 // Estados para los campos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Función que se ejecuta al enviar el formulario
  // const handleSubmit = async (e) => {
  //   e.preventDefault();  // Prevenir el comportamiento por defecto del formulario

  //   try {
  //     // Enviar solicitud al backend
  //     const response = await fetch(`${apiUrl}/api/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     // Si la respuesta es exitosa
  //     if (response.ok) {
  //       const data = await response.json();
  //       // Aquí puedes guardar el token, redirigir o hacer lo que necesites
  //       console.log('Usuario logueado:', data);
  //     } else {
  //       // Si el backend responde con un error
  //       const errorData = await response.json();
  //       setErrorMessage(errorData.message || 'Error al iniciar sesión');
  //     }
  //   } catch (error) {
  //     setErrorMessage('Hubo un problema con la conexión', error);
  //   }
  // };

  // Función que se ejecuta al enviar el formulario fake
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevenir el comportamiento por defecto del formulario 
    setLoading(true); // Cambiar el estado de loading a true
    try {
      // Simular una solicitud al backend
      const response = await fakeLogin(email, password);
      console.log('Usuario logueado:', response.user);
      Cookies.set('authToken', 'true', {expires: 1, secure: true}); // Guardar el token en las cookies
      navigate('/landing'); // Redirigir a la página de inicio
      setLoading(false); 
      setErrorMessage(''); 
    } catch (error) {
      console.log('Error al iniciar sesión:', error);
      setErrorMessage('Hubo un problema con la conexión', error);
      setErrorMessage(error.message);
      setLoading(false); 
    } finally{
      setLoading(false); 
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex bg-white p-12 rounded-2xl shadow-lg w-[50rem]">
        {/* Sección izquierda */}
        <div className="w-1/2 flex flex-col justify-center text-center p-6">
          <div className="mb-6">
            <img src="/images/fixmatelogo.png" alt="Logo" className="mx-auto h-16" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700">Bienvenido de nuevo</h2>
          <p className="text-gray-500 mb-4">Inicia sesión para continuar</p>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div> // Mostrar el mensaje de error
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="text-left">
              <label className="block text-gray-600 font-medium">Correo</label>
              <input
                type="email"
                className="w-full p-3 mt-1 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualizar el estado
              />
            </div>
            <div className="text-left">
              <label className="block text-gray-600 font-medium">Contraseña</label>
              <input
                type="password"
                className="w-full p-3 mt-1 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualizar el estado
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-md font-medium hover:bg-yellow-600 transition duration-200"
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            ¿No tienes cuenta? <a href="#" className="text-yellow-600 font-medium">Regístrate</a>
          </p>
        </div>
        {/* Sección derecha con imagen */}
        <div className="w-1/2 flex items-center justify-center bg-yellow-50 rounded-r-2xl p-6">
          <img src="/images/imglog.png" alt="Ilustración" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Login;
