import { Star } from "lucide-react";
import { useState } from "react";

export default function ServicioCursoProf() {
  const [serviceData, setServiceData] = useState({
    status: "pendiente",
    serviceCode: "",
    details: {
      cost: "$00.00",
      includes: [
        "Fursuit completo",
        "Tela de alta calidad",
        "Patrones a la medida"
      ],
      serviceTime: "00:00PM"
    }
  });

  const handleCodeChange = (e) => {
    setServiceData({ ...serviceData, serviceCode: e.target.value });
  };

  const handleIniciarClick = () => {
    alert("Servicio iniciado");
    setServiceData({ ...serviceData, status: "en curso" });
  };

  const handleTerminarClick = () => {
    alert("Servicio marcado como terminado");
    setServiceData({ ...serviceData, status: "terminado" });
  };

  const isCodeValid =
    serviceData.serviceCode.trim() !== "" &&
    serviceData.serviceCode !== "Ingrese aquí su código";

  return (
    <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row gap-12 bg-gray-50 my-24 text-lg">
      {/* Columna izquierda */}
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        {/* Imagen del servicio */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-200 shadow-xl">
          <img 
            src="https://64.media.tumblr.com/582f42c9e8808689ea2b2e99b4203f67/968e19a567dd3e64-af/s1280x1920/38ca4ef88e479ab20d77d288d0b7397e61c7a394.png" 
            alt="Espacio de trabajo del servicio"
            className="w-full h-80 object-cover rounded-2xl"
          />
          
          {/* Estrellas */}
          <div className="absolute bottom-5 left-5 flex space-x-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className="w-6 h-6"
                color="#facc15"
                fill={index < 4 ? "#facc15" : "none"}
              />
            ))}
          </div>
          
          {/* Avatar */}
          <div className="absolute bottom-5 right-5 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/5b6f28fccef37283973d4a5b/e3e3abdb-5aa3-4494-9ffa-6b0f24242a9e/Episode+250+Furry+and+Fursuit+Maker+Lolo+Fennec+-+JPEG.jpg" 
              alt="Avatar del usuario"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Botón iniciar servicio */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
          <button
            onClick={handleIniciarClick}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 px-10 rounded-xl font-semibold text-lg shadow-lg transition self-center"
          >
            Iniciar Servicio
          </button>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-700 mb-8">
              Detalles del Servicio
            </h2>
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-600 text-lg">Costo</div>
              <div className="text-2xl font-bold text-green-600">{serviceData.details.cost}</div>
            </div>
            
            <div className="mb-6">
              <div className="text-gray-600 mb-2 text-lg">Incluye:</div>
              <ul className="space-y-3 text-gray-800">
                {serviceData.details.includes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-xl">•</span>
                    <span className="ml-3">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="text-gray-600 text-lg">Horario del Servicio</div>
              <div className="text-2xl font-semibold text-gray-800">{serviceData.details.serviceTime}</div>
            </div>
          </div>

          {/* Código + botón terminar */}
          <div className="bg-white p-6 rounded-xl shadow-lg mt-8 flex flex-col gap-4">
            <input
              type="text"
              value={serviceData.serviceCode}
              onChange={handleCodeChange}
              placeholder="Ingresa código"
              className="w-full border border-gray-300 rounded-lg p-3 text-center font-semibold text-gray-700 text-lg"
            />
            <div className="text-center text-gray-400 text-sm">
              Pida al cliente al finalizar el servicio
            </div>

            {/* Botón terminar servicio */}
            <button
              onClick={handleTerminarClick}
              disabled={!isCodeValid}
              className={`${
                isCodeValid
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white py-3 px-10 rounded-xl font-semibold text-lg shadow-lg transition`}
            >
              Terminar Servicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
