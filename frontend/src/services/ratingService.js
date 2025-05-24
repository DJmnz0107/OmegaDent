import axios from 'axios';

// URL base para el backend
const API_URL = 'http://localhost:4000/api';

// Configuración de Axios para incluir cookies en las peticiones
axios.defaults.withCredentials = true;

// Servicio para manejar las operaciones relacionadas con calificaciones
const ratingService = {
  // Obtener todas las calificaciones
  getAllRatings: async () => {
    try {
      const response = await axios.get(`${API_URL}/ratings`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener calificaciones:', error);
      throw error;
    }
  },

  // Obtener calificaciones por usuario
  getRatingsByUser: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/ratings/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener calificaciones del usuario:', error);
      throw error;
    }
  },

  // Obtener calificaciones por cita
  getRatingsByAppointment: async (appointmentId) => {
    try {
      const response = await axios.get(`${API_URL}/ratings/appointment/${appointmentId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener calificaciones de la cita:', error);
      throw error;
    }
  },

  // Crear una nueva calificación
  createRating: async (ratingData) => {
    try {
      const response = await axios.post(`${API_URL}/ratings`, ratingData);
      return response.data;
    } catch (error) {
      console.error('Error al crear calificación:', error);
      throw error;
    }
  },

  // Actualizar una calificación existente
  updateRating: async (ratingId, ratingData) => {
    try {
      const response = await axios.put(`${API_URL}/ratings/${ratingId}`, ratingData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar calificación:', error);
      throw error;
    }
  },

  // Eliminar una calificación
  deleteRating: async (ratingId) => {
    try {
      const response = await axios.delete(`${API_URL}/ratings/${ratingId}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar calificación:', error);
      throw error;
    }
  }
};

export default ratingService;
