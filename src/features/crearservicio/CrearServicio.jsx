import { useState, useRef } from 'react';
import { X } from 'lucide-react';

export default function ServicioProfVacio() {
  const [services, setServices] = useState([
    {
      id: 1,
      title: '',
      description: '',
      cost: '',
      image: '/api/placeholder/200/180',
      tags: []
    },
    {
      id: 2,
      title: '',
      description: '',
      includes: []
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
    <div className="max-w-7xl mx-auto p-6 font-sans space-y-8 my-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Servicio 1 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex">
            <div className="w-1/2 relative cursor-pointer p-5" onClick={() => fileInputs.current[1]?.click()}>
              <img
                src={services[0].image}
                alt="Servicio"
                className="w-full h-60 object-cover"
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
                className="text-yellow-500 font-bold text-xl w-full"
                placeholder="Título del servicio"
              />
              <textarea
                value={services[0].description}
                onChange={(e) => handleEditField(1, 'description', e.target.value)}
                className="text-gray-600 text-base w-full"
                placeholder="Descripción del servicio"
              />
              <div>
                <label className="text-blue-500 text-sm">Costo del servicio</label>
                <input
                  type="text"
                  value={services[0].cost}
                  onChange={(e) => handleEditField(1, 'cost', e.target.value)}
                  className="text-blue-500 text-lg w-full"
                  placeholder="Costo"
                />
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {services[0].tags.map((tag, i) => (
                  <div key={i} className="flex items-center bg-blue-200 text-blue-500 px-3 py-1 rounded-full text-sm">
                    <span>{tag}</span>
                    <button onClick={() => handleRemoveTag(1, i)} className="ml-2 text-blue-700">
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
                  className="border px-3 py-1 rounded-full text-sm text-blue-500"
                />
                <button onClick={() => handleAddTag(1, newTags.current[1]?.value)} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Servicio 2 */}
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={services[1].title}
            onChange={(e) => handleEditField(2, 'title', e.target.value)}
            className="text-yellow-500 font-bold text-2xl w-full"
            placeholder="Título del servicio"
          />
          <textarea
            value={services[1].description}
            onChange={(e) => handleEditField(2, 'description', e.target.value)}
            className="text-gray-600 text-base w-full"
            placeholder="Descripción del servicio"
          />
          <div className="bg-blue-100 rounded-xl p-6 relative">
            <h3 className="text-blue-700 font-medium text-lg mb-2">Incluye</h3>
            <textarea
              value={services[1].includes?.join('\n')}
              onChange={(e) => handleEditField(2, 'includes', e.target.value.split('\n'))}
              className="text-blue-800 text-sm w-full"
              rows={6}
              placeholder="Incluye los elementos del servicio"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
