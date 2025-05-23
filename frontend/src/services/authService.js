import api from './api';

// Servicio para manejar la autenticación
const authService = {
  // Iniciar sesión
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      
      // Guardar el token en localStorage para uso en el cliente
      if (response.data.token) {
        localStorage.setItem('omegadent_token', response.data.token);
        localStorage.setItem('omegadent_user_type', response.data.userType);
        
        // Guardar el nombre real del usuario desde la respuesta del backend
        // Ahora usamos userData.name que contiene el nombre completo del usuario
        if (response.data.userData && response.data.userData.name) {
          localStorage.setItem('omegadent_user_name', response.data.userData.name);
        } else {
          // Fallback en caso de que no venga el nombre del usuario
          localStorage.setItem('omegadent_user_name', response.data.email || 'Usuario');
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error.response ? error.response.data : { message: 'Error de conexión' };
    }
  },
  
  // Cerrar sesión
  logout: async () => {
    try {
      const response = await api.post('/logout');
      
      // Remover datos del localStorage
      localStorage.removeItem('omegadent_token');
      localStorage.removeItem('omegadent_user_type');
      localStorage.removeItem('omegadent_user_name');
      
      return response.data;
    } catch (error) {
      console.error('Error en logout:', error);
      
      // Aunque haya error en el servidor, limpiamos el token local
      localStorage.removeItem('omegadent_token');
      localStorage.removeItem('omegadent_user_type');
      localStorage.removeItem('omegadent_user_name');
      
      throw error.response ? error.response.data : { message: 'Error de conexión' };
    }
  },
  
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('omegadent_token');
  },
  
  // Obtener el tipo de usuario
  getUserType: () => {
    return localStorage.getItem('omegadent_user_type');
  },
  
  // Obtener el token JWT
  getToken: () => {
    return localStorage.getItem('omegadent_token');
  },
  
  // Obtener el nombre del usuario
  getUserName: () => {
    return localStorage.getItem('omegadent_user_name') || 'Usuario';
  },
  
  // Establecer el token JWT
  setToken: (token) => {
    if (token) {
      localStorage.setItem('omegadent_token', token);
    } else {
      localStorage.removeItem('omegadent_token');
    }
  },
  
  // Establecer el tipo de usuario
  setUserType: (userType) => {
    if (userType) {
      localStorage.setItem('omegadent_user_type', userType);
    } else {
      localStorage.removeItem('omegadent_user_type');
    }
  },
  
  // Establecer el nombre del usuario
  setUserName: (userName) => {
    if (userName) {
      localStorage.setItem('omegadent_user_name', userName);
    } else {
      localStorage.removeItem('omegadent_user_name');
    }
  },
  
  // Generar un nombre de usuario basado en el tipo (simulación)
  generateUserName: (userType) => {
    switch (userType) {
      case 'doctor':
        return 'Dr. Martínez';
      case 'paciente':
        return 'Juan Pérez';
      case 'asistente':
        return 'Ana García';
      case 'administrador':
        return 'Admin OmegaDent';
      default:
        return `Usuario ${userType}`;
    }
  }
};

export default authService;
