import { useState, useContext } from "react";
// import { fakeLogin } from './utils/fake_login';
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { sanitizeEmail, sanitizePassword } from "./utils/sanitize";
import api from "../../hooks/apiConnection";
import { UserContext } from "./context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { refreshUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cleanEmail = sanitizeEmail(email);
    const cleanPassword = sanitizePassword(password);
    if (!cleanEmail || !cleanPassword) {
      setErrorMessage("Email o contraseña inválidos.");
      setLoading(false);
      return;
    }
    // Llamada real al backend
    try {
      const response = await api.post("/auth/login", {
        correo: cleanEmail,
        password: cleanPassword,
      });
      const data = response.data;
      Cookies.set("authToken", "true", { expires: 1, secure: true });
      setErrorMessage("");
      if ((data.usuario && data.usuario.tipo_usuario === 'adm') || data.role === 'admin') {
        await refreshUser();
        window.location.href = '/dashboard';
      } else {
        await refreshUser();
        window.location.href = '/landing';
      }
    } catch (error) {
      const data = error.response?.data;
      if (data?.twofa_required) {
        window.location.href = "/verificacion-2fa";
        return;
      }
      setErrorMessage(data?.error || error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#DAE0F6]">
      {/* Lado izquierdo con imagen de fondo */}
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

      {/* Lado derecho con el formulario */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-96">
          <h1 className="text-5xl font-bold text-[#E5A800] mb-2">
            Inicia sesión
          </h1>
          <p className="text-[#49568A] mb-8">Ingresa tus datos</p>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
              {errorMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                className="w-full p-3 border border-[#9BA8D9] rounded-md focus:ring-2 focus:ring-[#FFE08B] focus:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                className="w-full p-3 border border-[#9BA8D9] rounded-md focus:ring-2 focus:ring-[#FFE08B] focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#49568A] text-white py-3 rounded-md font-medium hover:bg-[#3b4672] transition duration-200"
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#49568A]">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/registro"
                className="text-[#E5A800] font-medium hover:underline"
              >
                Regístrate
              </Link>
            </p>
            <p className="mt-4">
              <Link
                to="/recuperar-password"
                className="text-[#49568A] hover:text-[#E5A800] font-medium underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
