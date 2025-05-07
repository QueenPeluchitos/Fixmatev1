import { useState } from 'react';
import { Pencil, Star } from 'lucide-react';

export default function ServicioProf() {
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Servicio de cerrajero',
      description: 'Ofrezco mi servicio para abrir cerraduras con experiencia en...',
      cost: '$00.00',
      image: '/api/placeholder/200/180',
      tags: ['Cerrajero', 'Servicio rápido'],
      rating: 3
    },
    {
      id: 2,
      title: 'Servicio de satrería',
      description: 'Ofrezco mi servicio para hacer fursuits con experiencia en bla bla bla...',
      includes: [
        'Fursuit completo',
        'Tela de alta calida',
        'Patrones a la medida'
      ],
      highlighted: true
    }
  ]);

  const handleEdit = (id) => {
    console.log(`Editing service ${id}`);
    // Implement edit functionality here
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Locksmith Service Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex">
            <div className="w-1/3 relative">
              <img 
                src={services[0].image} 
                alt="Locksmith service" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 flex">
                {[...Array(services[0].rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
            </div>
            <div className="w-2/3 p-3 relative">
              <div className="flex justify-between items-start">
                <h2 className="text-yellow-500 font-bold text-lg">{services[0].title}</h2>
                <button 
                  onClick={() => handleEdit(services[0].id)}
                  className="text-yellow-500"
                >
                  <Pencil size={16} />
                </button>
              </div>
              <p className="text-gray-600 text-sm mt-1">{services[0].description}</p>
              
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 text-sm">Costo del servicio</span>
                  <button 
                    onClick={() => handleEdit(services[0].id)}
                    className="text-blue-400"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
                <p className="text-blue-400">{services[0].cost}</p>
              </div>
              
              <div className="mt-4 flex gap-2">
                {services[0].tags.map((tag, index) => (
                  <span key={index} className="bg-blue-200 text-blue-500 px-3 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
                <button 
                  onClick={() => handleEdit(services[0].id)}
                  className="text-blue-400"
                >
                  <Pencil size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tailoring Service Card */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-yellow-500 font-bold text-xl">{services[1].title}</h2>
            <button 
              onClick={() => handleEdit(services[1].id)}
              className="text-yellow-500"
            >
              <Pencil size={16} />
            </button>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-gray-600 text-sm">{services[1].description}</p>
                <button 
                  onClick={() => handleEdit(services[1].id)}
                  className="text-gray-500"
                >
                  <Pencil size={16} />
                </button>
              </div>
            </div>
            
            <div className="bg-blue-100 rounded-lg p-4 flex-1 relative">
              <h3 className="text-blue-700 font-medium mb-2">Incluye</h3>
              <ul className="list-disc pl-5 text-blue-800">
                {services[1].includes.map((item, index) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ul>
              <button 
                onClick={() => handleEdit(services[1].id)}
                className="absolute top-2 right-2 text-blue-500"
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}