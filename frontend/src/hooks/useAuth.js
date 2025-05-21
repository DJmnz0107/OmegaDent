import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/authService';

/**
 * Hook personalizado para manejar la autenticación
 * Proporciona funciones para login, logout y verificación del estado de autenticación
 */
const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Comprobar si hay un usuario autenticado al cargar el hook
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [userType, setUserType] = useState(authService.getUserType());

  /**
   * Función para iniciar sesión
   * @param {Object} credentials - Credenciales del usuario (email, password)
   * @param {boolean} rememberMe - Opción para recordar la sesión
   */
  const login = async (credentials, rememberMe = false) => {
    // Si rememberMe está activado, podríamos establecer un tiempo de expiración más largo
    // o guardar alguna preferencia adicional (esto se implementaría en el backend)
    setLoading(true);
    setError(null);
    
    try {
      // Llamar al servicio de autenticación para iniciar sesión
      const response = await authService.login(credentials);
      
      // Actualizar el estado de autenticación
      setIsAuthenticated(true);
      setUserType(response.userType);
      
      // Mostrar notificación de éxito
      toast.success(`¡Bienvenido! Inicio de sesión exitoso como ${response.userType}`);
      
      // Redireccionar basado en el tipo de usuario
      redirectUserByType(response.userType);
      
      return response;
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError(err.message || 'Error al iniciar sesión, inténtalo de nuevo');
      toast.error(err.message || 'Error al iniciar sesión, inténtalo de nuevo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función para cerrar sesión
   */
  const logout = async () => {
    setLoading(true);
    
    try {
      await authService.logout();
      
      // Actualizar el estado
      setIsAuthenticated(false);
      setUserType(null);
      
      // Notificación
      toast.info('Has cerrado sesión correctamente');
      
      // Redireccionar al inicio
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
      
      // Incluso si hay error, limpiamos el estado de autenticación
      setIsAuthenticated(false);
      setUserType(null);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función para redireccionar basado en el tipo de usuario
   * @param {string} userType - Tipo de usuario
   */
  const redirectUserByType = (userType) => {
    switch(userType) {
      case 'doctor':
        navigate('/dashboard/doctor');
        break;
      case 'paciente':
        navigate('/dashboard/paciente');
        break;
      case 'asistente':
        navigate('/dashboard/asistente');
        break;
      case 'administrador':
        navigate('/dashboard/admin');
        break;
      default:
        navigate('/');
    }
  };

  return {
    login,
    logout,
    loading,
    error,
    isAuthenticated,
    userType
  };
};

export default useAuth;
