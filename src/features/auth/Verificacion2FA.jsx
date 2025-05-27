import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Verificacion2FA() {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code: codigo }), // CAMBIO: el backend espera 'code'
      });
      if (res.ok) {
        // Si el código es correcto, redirige al landing o dashboard
        navigate('/landing');
      } else {
        const data = await res.json();
        setError(data.error || 'Código incorrecto');
      }
    } catch (err) {
      setError('Error de red o del servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#49568A] text-center">Verificación en dos pasos</h2>
        <p className="mb-4 text-gray-600 text-center">Ingresa el código de 6 dígitos generado por tu app de autenticación.</p>
        <input
          type="text"
          maxLength={6}
          pattern="[0-9]{6}"
          value={codigo}
          onChange={e => setCodigo(e.target.value.replace(/\D/g, ''))}
          className="w-full p-3 border border-[#9BA8D9] rounded-md mb-4 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-[#E5A800]"
          placeholder="Código 2FA"
          required
        />
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-[#E5A800] hover:bg-[#D48D00] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
    </div>
  );
}
