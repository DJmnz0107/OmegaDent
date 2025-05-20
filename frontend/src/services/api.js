import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true, // Importante para que las cookies se envíen con las solicitudes
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
