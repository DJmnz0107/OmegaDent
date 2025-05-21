import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const LogoutButton = ({ className }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      // Redirigir al usuario a la página de inicio o login
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Incluso si hay un error, redirigir igualmente
      navigate('/login');
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
