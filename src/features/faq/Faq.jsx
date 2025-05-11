import React from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-sky-900 mb-8">
        Preguntas Frecuentes
      </h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-sky-800">{faq.question}</h3>
              <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/landing" className="inline-block py-2 px-4 bg-amber-500 text-white rounded-full hover:bg-amber-400 transition-colors">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Faq;
