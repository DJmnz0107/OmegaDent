import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LogoutButton = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth(); // Usar el contexto de autenticación

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout(); // Usar la función logout del contexto
      // Forzar actualización del componente
      window.dispatchEvent(new Event('storage'));
      // No es necesario redireccionar, el contexto ya lo hace
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`${className || 'px-4 py-2 text-white bg-[#0A3A4A] hover:bg-[#0E6B96] rounded transition-colors'} ${
        loading ? 'opacity-75 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Cerrando sesión...' : 'Cerrar sesión'}
    </button>
  );
};

export default LogoutButton;
