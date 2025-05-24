import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

/**
 * Componente para proteger rutas que requieren autenticación y roles específicos
 * Si el usuario no está autenticado, redirige a la página de login
 * Si el usuario no tiene los roles necesarios, muestra un mensaje de error
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userType } = useAuth();
  const [checking, setChecking] = useState(true);
  
  // Depuración
  console.log('Estado de autenticación:', isAuthenticated, 'Rol de usuario:', userType);
  
  // Verificar si el rol del usuario está permitido
  const hasRequiredRole = allowedRoles.length === 0 || (userType && allowedRoles.includes(userType));
  
  useEffect(() => {
    // Verificamos la autenticación y permisos
    if (!isAuthenticated) {
      toast.error('Necesitas iniciar sesión para acceder a esta página');
    } else if (allowedRoles.length > 0 && !hasRequiredRole) {
      toast.error('No tienes permisos para acceder a esta sección');
    }
    
    // Marcamos que ya terminamos de verificar
    setChecking(false);
  }, [isAuthenticated, userType, allowedRoles, hasRequiredRole]);
  
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
  
  // Si el usuario está autenticado pero no tiene los permisos necesarios
  if (allowedRoles.length > 0 && !hasRequiredRole) {
    return <Navigate to="/" replace />;
  }
  
  // Si está autenticado y tiene los permisos necesarios, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
