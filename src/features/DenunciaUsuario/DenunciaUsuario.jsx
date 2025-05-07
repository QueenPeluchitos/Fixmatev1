import React, { useState } from 'react';

export default function DenunciaUsuario() {
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [comments, setComments] = useState('');
  
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
    console.log('Problemas reportados:', selectedIssues.map(id => issues.find(issue => issue.id === id).label));
    console.log('Comentarios:', comments);
    // Aquí se enviaría la denuncia
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Columna izquierda - Imagen y detalles */}
        <div className="w-full md:w-1/2 space-y-6">
          {/* Imagen del servicio */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="/api/placeholder/600/400" 
              alt="Servicio de costura" 
              className="w-full h-64 object-cover"
            />
            
            {/* Estrellas en la esquina inferior izquierda */}
            <div className="absolute bottom-4 left-4 flex">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-gray-300 text-2xl">★</span>
            </div>
            
            {/* Icono circular en la esquina inferior derecha */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center overflow-hidden border-2 border-white">
                <img 
                  src="/api/placeholder/100/100" 
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Ícono de fuego en la esquina superior derecha */}
            <div className="absolute top-4 right-4">
              <div className="text-orange-500 text-2xl">🔥</div>
            </div>
          </div>
          
          {/* Detalles del servicio */}
          <div className="bg-blue-100 p-6 rounded-lg">
            <h2 className="text-xl text-gray-600 font-medium mb-4">Detalles del servicio</h2>
            
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Costo</span>
              <span className="text-gray-600">$00.00</span>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600">Incluye</p>
              <p className="text-gray-600">-Fursuit completo</p>
              <p className="text-gray-600">-Tela de alta calida</p>
              <p className="text-gray-600">-Patrones a la medida</p>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Horario del servicio</span>
              <span className="text-gray-600">00:00PM</span>
            </div>
          </div>
        </div>
        
        {/* Columna derecha - Formulario de denuncia */}
        <div className="w-full md:w-1/2">
          <div className="bg-blue-100 p-6 rounded-lg h-full">
            <div>
              {/* Opciones de problemas */}
              <div className="flex flex-wrap gap-2 mb-6">
                {issues.map((issue) => (
                  <button
                    key={issue.id}
                    type="button"
                    className={`py-2 px-4 rounded-full ${
                      selectedIssues.includes(issue.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-200 text-blue-600'
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
                  className="w-full h-40 p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>
              
              {/* Botón de denuncia */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                >
                  Denunciar servicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}