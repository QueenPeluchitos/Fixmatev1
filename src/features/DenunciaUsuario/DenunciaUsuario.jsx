import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos el hook useNavigate

export default function DenunciaUsuario() {
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); // Usamos el hook useNavigate

  const issues = [
    { id: 1, label: 'Impuntualidad' },
    { id: 2, label: 'Servicio incompleto' },
    { id: 3, label: 'Nunca llegó' },
    { id: 4, label: 'Falta de limpieza' },
    { id: 5, label: 'Desconfianza' },
    { id: 6, label: 'Cobro adicional' }
  ];

  const toggleIssue = (issueId) => {
    if (selectedIssues.includes(issueId)) {
      setSelectedIssues(selectedIssues.filter(id => id !== issueId));
    } else {
      setSelectedIssues([...selectedIssues, issueId]);
    }
  };

  const handleSubmit = () => {
    if (selectedIssues.length === 0 || comments.trim() === '') {
      alert("Por favor, seleccione al menos un problema y escriba un comentario.");
      return;
    }

    setIsSubmitting(true);

    // Simulando un envío exitoso
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Aquí se enviaría la denuncia
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {submitted ? (
        <div className="text-center bg-green-100 p-6 rounded-lg shadow-lg transform transition-all duration-500 scale-105">
          <h2 className="text-2xl text-green-600 font-semibold">¡Denuncia enviada exitosamente!</h2>
          <p className="text-gray-700 mt-4">Gracias por reportar el problema. Nuestro equipo lo revisará pronto.</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Columna izquierda - Imagen y detalles */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-white transform transition-all duration-500 hover:scale-105">
              <img 
                src="/api/placeholder/600/400" 
                alt="Servicio de costura" 
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4 flex">
                {/* 5 Estrellas */}
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`text-${index < 2 ? 'yellow' : 'gray'}-400 text-2xl`}>★</span>
                ))}
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src="/api/placeholder/100/100" 
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute top-4 right-4">
                {/* SVG Flame Icon con color amarillo */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame-icon lucide-flame text-yellow-400">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                </svg>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
              <h2 className="text-2xl text-gray-700 font-semibold mb-4">Detalles del servicio</h2>
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Costo</span>
                <span className="text-gray-700">$00.00</span>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Incluye</p>
                <p className="text-gray-700">-Fursuit completo</p>
                <p className="text-gray-700">-Tela de alta calidad</p>
                <p className="text-gray-700">-Patrones a la medida</p>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Horario del servicio</span>
                <span className="text-gray-700">00:00PM</span>
              </div>
            </div>
          </div>

          {/* Columna derecha - Formulario de denuncia */}
          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-lg h-full transform transition-all duration-500 hover:scale-105">
              <h2 className="text-2xl text-gray-700 font-semibold mb-6">Reportar problema</h2>

              {/* Resumen de la denuncia */}
              <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium text-gray-700">Resumen de la denuncia</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {selectedIssues.map((issueId) => {
                    const issue = issues.find((issue) => issue.id === issueId);
                    return <li key={issueId}>{issue?.label}</li>;
                  })}
                </ul>
                <p className="mt-4 text-gray-600">{comments || "No se han agregado comentarios."}</p>
              </div>

              {/* Opciones de problemas */}
              <div className="flex flex-wrap gap-4 mb-6">
                {issues.map((issue) => (
                  <button
                    key={issue.id}
                    type="button"
                    className={`py-2 px-6 rounded-full text-lg transform transition-all duration-300 ${
                      selectedIssues.includes(issue.id)
                        ? 'bg-blue-300 text-blue-800 scale-105'  // Azul pastel seleccionado
                        : 'bg-blue-200 text-blue-600 hover:scale-105'  // Azul pastel no seleccionado
                    }`}
                    onClick={() => toggleIssue(issue.id)}
                  >
                    {issue.label}
                  </button>
                ))}
              </div>

              {/* Comentarios adicionales */}
              <div className="mb-6">
                <textarea
                  placeholder="Comentarios adicionales"
                  className="w-full h-40 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-105"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/servicio-iniciado')} // Redirige a /servicio-iniciado
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-105"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? 'Enviando...' : 'Denunciar servicio'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
