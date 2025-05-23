import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

/**
 * Componente para proteger rutas que requieren autenticación
 * Si el usuario no está autenticado, redirige a la página de login
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [checking, setChecking] = useState(true);
  
  // Depuración
  console.log('Estado de autenticación:', isAuthenticated);
  
  useEffect(() => {
    // Verificamos la autenticación y actualizamos el estado
    if (!isAuthenticated) {
      toast.error('Necesitas iniciar sesión para acceder a esta página');
    }
    
    // Marcamos que ya terminamos de verificar
    setChecking(false);
  }, [isAuthenticated]);
  
  // Mientras estamos verificando la autenticación, mostramos un texto de carga
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl text-gray-600">Verificando acceso...</p>
      </div>
    );
  }
  
  // Si el usuario no está autenticado, redirigir a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Si está autenticado, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
