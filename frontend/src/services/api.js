import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true, // Importante para que las cookies se envíen con las solicitudes
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token JWT a todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('omegadent_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
