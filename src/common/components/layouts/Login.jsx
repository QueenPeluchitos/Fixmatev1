
const Login = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex bg-gradient-to-b from-white to-yellow-200 p-12 rounded-2xl shadow-lg w-[50rem]">
          {/* Sección izquierda */}
          <div className="w-1/2 flex flex-col justify-center text-center p-6">
            <div className="mb-6">
              <img src="/images/fixmatelogo.png" alt="Logo" className="mx-auto h-16" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700">Bienvenido de nuevo</h2>
            <p className="text-gray-500 mb-4">Inicia sesión para continuar</p>
            <form className="space-y-4">
              <div className="text-left">
                <label className="block text-gray-600 font-medium">Correo</label>
                <input
                  type="email"
                  className="w-full p-3 mt-1 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="text-left">
                <label className="block text-gray-600 font-medium">Contraseña</label>
                <input
                  type="password"
                  className="w-full p-3 mt-1 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="Contraseña"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-md font-medium hover:bg-yellow-600 transition duration-200"
              >
                Iniciar sesión
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