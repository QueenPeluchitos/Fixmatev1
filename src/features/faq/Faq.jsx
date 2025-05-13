import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Faq = () => {
  const faqs = [
    {
      question: "¿Cómo puedo contratar un servicio?",
      answer:
        "Puedes contratar un servicio seleccionando la categoría y luego elegir el proveedor que más te convenga. Después, puedes comunicarte con ellos directamente desde la plataforma para confirmar la cita.",
    },
    {
      question: "¿Qué garantías ofrecen los proveedores?",
      answer:
        "Los proveedores garantizan un servicio de calidad y compromiso. Si no quedas satisfecho, puedes solicitar un reembolso o una segunda visita sin costo adicional.",
    },
    {
      question: "¿Puedo cancelar una cita?",
      answer:
        "Sí, puedes cancelar o reprogramar una cita hasta 24 horas antes del horario acordado. Después de ese plazo, se aplicará una pequeña tarifa por cancelación.",
    },
    {
      question: "¿Cómo sé que un proveedor es confiable?",
      answer:
        "Cada proveedor cuenta con verificación por parte del equipo de FixMate, además tiene un perfil con valoraciones de otros usuarios, lo que te permite ver su experiencia y los comentarios de quienes ya contrataron sus servicios.",
    },
    {
      question: "¿Los pagos se realizan a través de la plataforma?",
      answer:
        "Sí, todos los pagos se realizan de forma segura a través de nuestra plataforma, y los proveedores solo reciben su pago una vez que el servicio ha sido completado y aprobado por ti.",
    },
    {
      question: "¿Hay un costo extra por urgencias?",
      answer:
        "Algunos proveedores tienen tarifas diferenciadas para servicios urgentes. Asegúrate de consultar los detalles con el proveedor antes de contratar el servicio.",
    },
  ];

  // Estado para gestionar qué pregunta está desplegada
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-[#49568A] mb-8">
        Preguntas Frecuentes
      </h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleAnswer(index)}>
              <h3 className="text-xl font-semibold text-[#49568A]">{faq.question}</h3>
              <div className="text-[#E5A800]">
                {openIndex === index ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </div>
            </div>

            {openIndex === index && (
              <div className="p-4 bg-[#F5F6FB]">
                <p className="text-sm text-[#49568A]">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/landing" className="inline-block py-2 px-6 bg-[#E5A800] text-white rounded-full hover:bg-yellow-600 transition-colors">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Faq;
