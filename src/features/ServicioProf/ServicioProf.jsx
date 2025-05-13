import { useState, useRef } from 'react';
import { X } from 'lucide-react';

export default function ServicioProf() {
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Servicio de cerrajero',
      description: 'Ofrezco mi servicio para abrir cerraduras con experiencia en...',
      cost: '$00.00',
      image: '/api/placeholder/200/180',
      tags: ['Cerrajero', 'Servicio rápido']
    },
    {
      id: 2,
      title: 'Servicio de satrería',
      description: 'Ofrezco mi servicio para hacer fursuits con experiencia en bla bla bla...',
      includes: [
        'Fursuit completo',
        'Tela de alta calidad',
        'Patrones a la medida'
      ]
    }
  ]);

  const fileInputs = useRef({});
  const newTags = useRef({});

  const handleEditField = (id, field, value) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const handleImageChange = (id, file) => {
    const imageUrl = URL.createObjectURL(file);
    handleEditField(id, 'image', imageUrl);
  };

  const handleAddTag = (id, value) => {
    if (!value.trim()) return;
    setServices(prev =>
      prev.map(service =>
        service.id === id ? { ...service, tags: [...(service.tags || []), value] } : service
      )
    );
    if (newTags.current[id]) newTags.current[id].value = '';
  };

  const handleRemoveTag = (id, index) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id
          ? { ...service, tags: service.tags.filter((_, i) => i !== index) }
          : service
      )
    );
  };

  const handleSave = () => {
    console.log('Servicios guardados:', services);
    alert('Cambios guardados correctamente.');
  };

  return (
    <div className="max-w-7xl mx-auto p-8 font-sans space-y-8 my-16">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Sección izquierda: servicio 1 */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105">
          <div className="flex">
            <div className="w-1/2 relative cursor-pointer p-5 flex-none" onClick={() => fileInputs.current[1]?.click()}>
              <img
                src={services[0].image}
                alt="Servicio"
                className="w-full h-60 object-cover rounded-xl transition-all duration-300 transform hover:scale-105"
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={el => (fileInputs.current[1] = el)}
                onChange={(e) => handleImageChange(1, e.target.files[0])}
              />
            </div>
            <div className="w-1/2 p-6 space-y-4">
              <input
                type="text"
                value={services[0].title}
                onChange={(e) => handleEditField(1, 'title', e.target.value)}
                className="text-[#E5A800] font-bold text-2xl w-full"
              />
              <textarea
                value={services[0].description}
                onChange={(e) => handleEditField(1, 'description', e.target.value)}
                className="text-gray-600 text-base w-full"
              />
              <div>
                <label className="text-[#49568A] text-sm">Costo del servicio</label>
                <input
                  type="text"
                  value={services[0].cost}
                  onChange={(e) => handleEditField(1, 'cost', e.target.value)}
                  className="text-[#49568A] text-lg w-full"
                />
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {services[0].tags.map((tag, i) => (
                  <div key={i} className="flex items-center bg-[#A3B9D5] text-white px-3 py-1 rounded-full text-sm">
                    <span>{tag}</span>
                    <button onClick={() => handleRemoveTag(1, i)} className="ml-2 text-white">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Nueva etiqueta"
                  ref={el => (newTags.current[1] = el)}
                  className="border px-3 py-1 rounded-full text-sm text-[#49568A]"
                />
                <button
                  onClick={() => handleAddTag(1, newTags.current[1]?.value)}
                  className="bg-[#49568A] text-white px-3 py-1 rounded-full text-sm hover:bg-[#3F4A75] transition-all duration-200"
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección derecha: servicio 2 */}
        <div className="flex flex-col space-y-6">
          <input
            type="text"
            value={services[1].title}
            onChange={(e) => handleEditField(2, 'title', e.target.value)}
            className="text-[#E5A800] font-bold text-2xl w-full"
          />
          <textarea
            value={services[1].description}
            onChange={(e) => handleEditField(2, 'description', e.target.value)}
            className="text-gray-600 text-base w-full"
          />
          <div className="bg-white rounded-xl p-6 relative text-[#49568A] border">
            <h3 className="font-medium text-lg mb-2">Incluye</h3>
            <textarea
              value={services[1].includes.join('\n')}
              onChange={(e) => handleEditField(2, 'includes', e.target.value.split('\n'))}
              className="text-[#49568A] text-sm w-full"
              rows={6}
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSave}
          className="bg-[#E5A800] text-white px-6 py-2 rounded-full hover:bg-[#e59c00] transition-all duration-200"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
