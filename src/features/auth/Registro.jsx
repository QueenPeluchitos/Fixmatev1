import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: name, apellido, correo: email, telefono, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || "Error en el registro. Intenta nuevamente.");
        setLoading(false);
        return;
      }
      // Registro exitoso: hacer login automático
      const loginResponse = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ correo: email, password }),
      });
      if (!loginResponse.ok) {
        setErrorMessage("Registro exitoso, pero error al iniciar sesión automáticamente. Inicia sesión manualmente.");
        setLoading(false);
        return;
      }
      navigate("/landing");
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("Error en el registro. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#DAE0F6]">
      {/* Lado izquierdo con formulario de registro */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-96">
          <h1 className="text-5xl font-bold text-[#E5A800] mb-2">Crea tu cuenta</h1>
          <p className="text-[#49568A] mb-8">Llena los campos para registrarte</p>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
              {errorMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <input
                type="text"
                className="w-full p-3 border border-[#9BA8D9] rounded-md focus:ring-2 focus:ring-[#FFE08B] focus:outline-none"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full p-3 border border-[#9BA8D9] rounded-md focus:ring-2 focus:ring-[#FFE08B] focus:outline-none"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full p-3 border border-[#9BA8D9] rounded-md focus:ring-2 focus:ring-[#FFE08B] focus:outline-none"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                className="w-full p-3 border border-[#9BA8D9] rounded-md focus:ring-2 focus:ring-[#FFE08B] focus:outline-none"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full p-3 border border-[#9BA8D9] rounded-md focus:ring-2 focus:ring-[#FFE08B] focus:outline-none"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#49568A] text-white py-3 rounded-md font-medium hover:bg-[#3b4672] transition duration-200"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#49568A]">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-[#E5A800] font-medium hover:underline">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Lado derecho con imagen decorativa */}
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden">
        <img 
          src="/images/imagenfondo.png"
          alt="Fondo decorativo"
          className="absolute inset-0 w-full h-full object-cover z-2 blur-xs" 
        />
        <div className="absolute inset-0 bg-[#49568A] bg-opacity-50"></div>

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
