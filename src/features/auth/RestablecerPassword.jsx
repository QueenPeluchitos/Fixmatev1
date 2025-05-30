import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function RestablecerPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!password || password.length < 6) {
      setStatus({ type: 'error', msg: 'La contraseña debe tener al menos 6 caracteres.' });
      return;
    }
    if (password !== confirm) {
      setStatus({ type: 'error', msg: 'Las contraseñas no coinciden.' });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!response.ok) throw new Error('No se pudo restablecer la contraseña. El enlace puede estar expirado.');
      setStatus({ type: 'success', msg: '¡Contraseña restablecida! Ahora puedes iniciar sesión.' });
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DAE0F6]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#49568A] mb-4 text-center">Restablecer contraseña</h2>
        <p className="mb-6 text-[#49568A] text-center">Ingresa tu nueva contraseña.</p>
        {status && (
          <div className={`mb-4 p-3 rounded-md text-sm font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{status.msg}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            className="w-full p-3 border border-[#9BA8D9] rounded-md focus:ring-2 focus:ring-[#FFE08B] focus:outline-none"
            placeholder="Nueva contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-3 border border-[#9BA8D9] rounded-md focus:ring-2 focus:ring-[#FFE08B] focus:outline-none"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#E5A800] text-white py-3 rounded-md font-semibold hover:bg-[#D48D00] transition duration-200"
            disabled={loading}
          >
            {loading ? 'Restableciendo...' : 'Restablecer contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
}
