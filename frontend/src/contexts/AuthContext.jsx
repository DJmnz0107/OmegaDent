import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/authService';

// Crear el contexto de autenticación
const AuthContext = createContext();

/**
 * Proveedor de contexto de autenticación
 * Proporciona el estado de autenticación y funciones relacionadas a toda la aplicación
 */
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado para rastrear la autenticación del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState(null);
  const [user, setUser] = useState(null);
  
  // Verificar si hay un token almacenado al cargar la aplicación
  useEffect(() => {
    const checkAuth = () => {
      const token = authService.getToken();
      const userTypeStored = authService.getUserType();
      const userNameStored = authService.getUserName();
      
      if (token) {
        setIsAuthenticated(true);
        setUserType(userTypeStored);
        setUserName(userNameStored);
        // Aquí podrías cargar información adicional del usuario si es necesario
      }
    };
    
    checkAuth();
  }, []);
  
  /**
   * Función para iniciar sesión
   * @param {Object} credentials - Credenciales del usuario (email, password)
   * @param {boolean} rememberMe - Opción para recordar la sesión
   */
  const login = async (credentials, rememberMe = false) => {
    setLoading(true);
    setError(null);
    
    try {
      // Llamar al servicio de autenticación para iniciar sesión
      // Si rememberMe está activado, lo enviamos al backend (si lo soporta)
      const response = await authService.login({
        email: credentials.email,
        password: credentials.password,
        ...(rememberMe && { rememberMe }) // Solo incluimos rememberMe si es true
      });
      
      // Actualizar el estado de autenticación
      setIsAuthenticated(true);
      setUserType(response.userType);
      setUserName(authService.getUserName());
      
      // Mostrar notificación de éxito
      toast.success(`¡Bienvenido ${authService.getUserName()}! Inicio de sesión exitoso`);
      
      // Redireccionar a la página principal después del login
      navigate('/');
      
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
      setUserName(null);
      setUser(null);
      
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
      setUserName(null);
      setUser(null);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };
  
  
  // Valores a compartir en el contexto
  const value = {
    isAuthenticated,
    loading,
    error,
    userType,
    userName,
    user,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
