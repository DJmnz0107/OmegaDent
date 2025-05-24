import api from './api';

const appointmentService = {
  // Obtener todas las citas
  getAllAppointments: async () => {
    try {
      const response = await api.get('/appointments');
      return response.data;
    } catch (error) {
      console.error('Error al obtener citas:', error);
      throw error;
    }
  },

  // Obtener una cita por ID
  getAppointmentById: async (id) => {
    try {
      const response = await api.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener cita #${id}:`, error);
      throw error;
    }
  },

  // Obtener citas por paciente
  getAppointmentsByPatient: async (patientId) => {
    try {
      const response = await api.get(`/appointments/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener citas del paciente #${patientId}:`, error);
      throw error;
    }
  },

  // Crear una nueva cita
  createAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error al crear cita:', error);
      throw error;
    }
  },

  // Actualizar una cita
  updateAppointment: async (id, appointmentData) => {
    try {
      const response = await api.put(`/appointments/${id}`, appointmentData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar cita #${id}:`, error);
      throw error;
    }
  },

  // Eliminar una cita
  deleteAppointment: async (id) => {
    try {
      const response = await api.delete(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar cita #${id}:`, error);
      throw error;
    }
  },

  // Cambiar estado de la cita
  changeAppointmentStatus: async (id, status) => {
    try {
      const response = await api.patch(`/appointments/${id}/status`, { appointment_status: status });
      return response.data;
    } catch (error) {
      console.error(`Error al cambiar estado de cita #${id}:`, error);
      throw error;
    }
  }
};

export default appointmentService;
