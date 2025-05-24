import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/authService';

// Crear el contexto de autenticación
export const AuthContext = createContext();

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
  
  // Memoizar la función para evitar creaciones innecesarias en cada renderizado
  const updateAuthState = useCallback(() => {
    // Obtener datos actuales sin logging
    const token = authService.getToken();
    const userTypeStored = authService.getUserType();
    const userNameStored = authService.getUserName();
    
    // Solo actualizar si realmente hay cambios
    if (token) {
      if (!isAuthenticated || userType !== userTypeStored || userName !== userNameStored) {
        setIsAuthenticated(true);
        setUserType(userTypeStored);
        setUserName(userNameStored);
        
        // Obtener datos de usuario del almacenamiento local
        const userData = authService.getUserData();
        if (userData) {
          setUser(userData);
        }
      }
    } else if (isAuthenticated) {
      setIsAuthenticated(false);
      setUserType(null);
      setUserName(null);
      setUser(null);
    }
  }, [isAuthenticated, userType, userName]);
  
  // Efecto para verificar si hay un token almacenado al cargar la aplicación
  useEffect(() => {
    // Actualizar una sola vez al iniciar
    updateAuthState();
    
    // Escuchar eventos de storage para detectar cambios en el localStorage
    const handleStorageChange = () => {
      updateAuthState();
    };
    
    // Usar el evento de storage para detectar cambios
    window.addEventListener('storage', handleStorageChange);
    
    // Limpiar el listener cuando el componente se desmonte
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [updateAuthState]);
  
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
      
      // Establecer datos del usuario
      if (response.userData) {
        setUser(response.userData);
      }
      
      // Mostrar notificación de éxito prominente
      toast.success(`¡Bienvenido ${authService.getUserName()}! Inicio de sesión exitoso`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Esperar un momento para que el usuario vea el mensaje antes de redirigir
      setTimeout(() => {
        // Redireccionar a la página principal después del login
        navigate('/');
      }, 1500);
      
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
      toast.info('Has cerrado sesión correctamente', {
        position: "top-center",
        autoClose: 3000
      });
      
      // Redireccionar a la página principal
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
      
      // Incluso si hay error, limpiamos el estado de autenticación
      setIsAuthenticated(false);
      setUserType(null);
      setUserName(null);
      setUser(null);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };
  
  
  // Creamos el objeto con todas las funciones y estados a compartir
  const authContextValue = {
    isAuthenticated,
    userType,
    userName,
    user,
    loading,
    error,
    login,
    logout,
    updateAuthState
  };
  
  return (
    <AuthContext.Provider value={authContextValue}>
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
