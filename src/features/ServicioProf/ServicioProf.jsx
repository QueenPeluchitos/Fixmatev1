import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function ServicioProf() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const idServicio = searchParams.get('id');

  const fileInputs = useRef({});
  const newTags = useRef({});

  // Estado para edición
  const [editMode, setEditMode] = useState(false);
  const [editDescription, setEditDescription] = useState('');
  const [editCost, setEditCost] = useState('');

  useEffect(() => {
    async function fetchServicio() {
      if (!idServicio) return;
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/servicios/${idServicio}`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setServices([data]);
        } else {
          setServices([]);
        }
      } catch (err) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchServicio();
  }, [idServicio]);

  useEffect(() => {
    if (services.length > 0) {
      const servicio = services[0];
      setEditDescription(servicio.descripcion || '');
      setEditCost(servicio.precio !== undefined ? servicio.precio : '');
    }
  }, [services]);

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

  const handleSaveEdits = async () => {
    if (!idServicio) return;
    try {
      const res = await fetch(`http://localhost:3000/api/servicios/${idServicio}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ descripcion: editDescription, precio: editCost }),
      });
      if (res.ok) {
        alert('Cambios guardados correctamente.');
        setEditMode(false);
        // Refrescar datos
        const data = await res.json();
        setServices([data]);
      } else {
        alert('Error al guardar los cambios.');
      }
    } catch (err) {
      alert('Error de red al guardar los cambios.');
    }
  };

  // Mapear datos backend a frontend para visualización
  const servicio = services[0] || {};
  // Compatibilidad: backend usa nombre, descripcion, precio, categoria, etc.
  const title = servicio.nombre || servicio.title || '';
  const description = servicio.descripcion || servicio.description || '';
  const cost = servicio.precio !== undefined ? `$${servicio.precio}` : (servicio.cost || '');
  const image = servicio.imagen || servicio.image || '/api/placeholder/200/180';
  const tags = servicio.tags || [];
  const includes = servicio.includes || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-[#49568A] text-xl font-semibold">Cargando servicio...</div>
    );
  }
  if (!services.length) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-red-500 text-xl font-semibold">No se encontró el servicio.</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 font-sans space-y-8 my-16">
      {/* Título del servicio arriba */}
      <h1 className="text-3xl font-extrabold text-[#E5A800] mb-8 text-center">{title}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/5 w-full">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative cursor-pointer p-5 flex-none" onClick={() => fileInputs.current[1]?.click()}>
                <img
                  src={image}
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
              <div className="md:w-1/2 p-6 space-y-4">
                {editMode ? (
                  <>
                    <textarea
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                      className="text-gray-600 text-base w-full border rounded p-2"
                    />
                    <div>
                      <label className="text-[#49568A] text-sm">Costo del servicio</label>
                      <input
                        type="number"
                        value={editCost}
                        onChange={e => setEditCost(e.target.value)}
                        className="text-[#49568A] text-lg w-full border rounded p-2"
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleSaveEdits}
                        className="bg-[#E5A800] text-white px-4 py-1 rounded hover:bg-[#e59c00] transition-all duration-200"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 transition-all duration-200"
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <textarea
                      value={description}
                      readOnly
                      className="text-gray-600 text-base w-full bg-transparent border-none resize-none"
                    />
                    <div>
                      <label className="text-[#49568A] text-sm">Costo del servicio</label>
                      <input
                        type="text"
                        value={cost}
                        readOnly
                        className="text-[#49568A] text-lg w-full bg-transparent border-none"
                      />
                    </div>
                    <button
                      onClick={() => setEditMode(true)}
                      className="mt-2 bg-[#49568A] text-white px-4 py-1 rounded hover:bg-[#3F4A75] transition-all duration-200"
                    >
                      Editar descripción o precio
                    </button>
                  </>
                )}
                <div className="flex flex-wrap gap-2 items-center">
                  {tags.map((tag, i) => (
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
        </div>
        {/* Incluye a la derecha, ahora con color morado institucional */}
        <div className="md:w-2/5 w-full rounded-2xl p-10 border-2 border-[#49568A] shadow-xl h-fit mb-8 md:mb-0 flex flex-col items-start justify-start bg-[#F3F4FA]">
          <h3 className="font-bold text-2xl mb-4 text-[#49568A] tracking-wide">Incluye</h3>
          <ul className="list-disc pl-8 text-lg text-[#49568A] space-y-2">
            {includes.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
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
