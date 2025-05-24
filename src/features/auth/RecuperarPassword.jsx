import { useState } from 'react';

export default function RecuperarPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      // Llama a tu endpoint real de recuperación de contraseña
      const response = await fetch('http://localhost:3000/api/auth/recuperar-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email }),
      });
      if (!response.ok) throw new Error('No se pudo enviar el correo de recuperación');
      setStatus({ type: 'success', msg: 'Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña.' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DAE0F6]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#49568A] mb-4 text-center">Recuperar contraseña</h2>
        <p className="mb-6 text-[#49568A] text-center">Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.</p>
        {status && (
          <div className={`mb-4 p-3 rounded-md text-sm font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{status.msg}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 border border-[#9BA8D9] rounded-md focus:ring-2 focus:ring-[#FFE08B] focus:outline-none"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#E5A800] text-white py-3 rounded-md font-semibold hover:bg-[#D48D00] transition duration-200"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar instrucciones'}
          </button>
        </form>
      </div>
    </div>
  );
}
