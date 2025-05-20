import api from './api';

// Servicio para el manejo de pacientes
const patientService = {
  /**
   * Registra un nuevo paciente en el sistema
   * @param {Object} patientData - Datos del paciente a registrar
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  registerPatient: async (patientData) => {
    try {
      const response = await api.post('/register/patients', patientData);
      return response.data;
    } catch (error) {
      // Propagamos el error para manejarlo en el componente
      throw error.response ? error.response.data : { message: 'Error de conexión con el servidor' };
    }
  },

  /**
   * Verifica el código enviado por correo electrónico
   * @param {string} code - Código de verificación
   * @param {string} token - Token de verificación (opcional si está en cookies)
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  verifyCode: async (code, token = null) => {
    try {
      const data = { verificationCode: code };
      if (token) data.token = token;
      
      const response = await api.post('/register/patients/verify', data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Error de conexión con el servidor' };
    }
  }
};

export default patientService;
