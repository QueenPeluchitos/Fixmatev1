import { useState, useRef } from 'react';
import { X } from 'lucide-react';

export default function Servicio() {
  const [service, setService] = useState({
    title: '',
    description: '',
    cost: '',
    category: '',
    image: '/api/placeholder/200/180',
    tags: []
  });

  const fileInput = useRef(null);
  const newTag = useRef(null);

  const handleFieldChange = (field, value) => {
    setService(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (file) => {
    const imageUrl = URL.createObjectURL(file);
    handleFieldChange('image', imageUrl);
  };

  const handleAddTag = (value) => {
    if (!value.trim()) return;
    setService(prev => ({
      ...prev,
      tags: [...prev.tags, value]
    }));
    if (newTag.current) newTag.current.value = '';
  };

  const handleRemoveTag = (index) => {
    setService(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    console.log('Servicio guardado:', service);
    alert('Servicio creado exitosamente.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg p-10 space-y-8">
        <h2 className="text-[#49568A] text-3xl font-extrabold text-center mb-8">Crear un Nuevo Servicio</h2>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Imagen del servicio */}
          <div
            className="w-full relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105"
            onClick={() => fileInput.current?.click()}
          >
            <img
              src={service.image}
              alt="Servicio"
              className="w-full h-72 object-cover rounded-xl shadow-lg"
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInput}
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
          </div>

          {/* Detalles del servicio */}
          <div className="space-y-6">
            <input
              type="text"
              value={service.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="text-[#49568A] font-semibold text-2xl w-full border-b-4 border-[#E5A800] py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#E5A800] rounded-lg shadow-md"
              placeholder="Título del servicio"
            />

            <textarea
              value={service.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="text-[#49568A] text-lg w-full border-b-4 border-[#E5A800] py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#E5A800] rounded-lg shadow-md"
              placeholder="Descripción del servicio"
              rows="4"
            />

            <div>
              <label className="text-[#49568A] text-lg font-medium">Costo del servicio</label>
              <input
                type="text"
                value={service.cost}
                onChange={(e) => handleFieldChange('cost', e.target.value)}
                className="text-[#49568A] text-lg w-full border-b-4 border-[#E5A800] py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#E5A800] rounded-lg shadow-md"
                placeholder="Costo del servicio"
              />
            </div>

            {/* Categoría del servicio */}
            <div>
              <label className="text-[#49568A] text-lg font-medium">Categoría</label>
              <select
                value={service.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="w-full mt-2 text-[#49568A] border-2 border-[#E5A800] py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#E5A800]"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Hogar y mantenimiento">Hogar y mantenimiento</option>
                <option value="Cuidado personal y moda">Cuidado personal y moda</option>
                <option value="Cuidado de exteriores">Cuidado de exteriores</option>
                <option value="Tecnología y electrónica">Tecnología y electrónica</option>
                <option value="Transporte y mecánica">Transporte y mecánica</option>
              </select>
            </div>

            {/* Etiquetas */}
            <div className="flex flex-wrap gap-4">
              {service.tags.map((tag, i) => (
                <div key={i} className="flex items-center bg-[#FFFBF2] text-[#49568A] px-5 py-2 rounded-full text-sm shadow-lg transition-all duration-300 hover:bg-[#E5A800] hover:text-white">
                  <span>{tag}</span>
                  <button onClick={() => handleRemoveTag(i)} className="ml-2 text-[#E5A800] hover:text-white">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="Nueva etiqueta (Ej. Tapiceria, plomeria, etc.)"
                ref={newTag}
                className="border-2 border-[#E5A800] px-4 py-2 rounded-lg text-[#49568A] focus:outline-none focus:ring-2 focus:ring-[#E5A800] shadow-md"
              />
              <button
                onClick={() => handleAddTag(newTag.current?.value)}
                className="bg-[#E5A800] text-white px-6 py-3 rounded-lg text-sm shadow-lg hover:bg-[#49568A] hover:text-white transition-all duration-300"
              >
                Añadir Etiqueta
              </button>
            </div>
          </div>
        </div>

        {/* Botón para guardar */}
        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            className="bg-[#E5A800] text-white px-8 py-4 rounded-lg text-lg shadow-lg hover:bg-[#49568A] hover:text-white transition-all duration-300"
          >
            Guardar Servicio
          </button>
        </div>
      </div>
    </div>
  );
}
