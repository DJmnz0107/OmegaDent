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
      // Asegurarnos de que el código sea un string
      const cleanCode = String(code).trim();
      
      if (!cleanCode) {
        throw { message: 'Código de verificación inválido' };
      }
      
      const data = { verificationCode: cleanCode };
      
      // Solo incluir el token si existe y no es null/undefined/empty
      if (token && token.trim() !== '') {
        data.token = token;
      }
      
      console.log('Enviando datos para verificación:', data);
      
      const response = await api.post('/register/patients/verify', data);
      console.log('Respuesta de verificación:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en verificación de código:', error);
      if (error.response) {
        throw error.response.data || { message: 'Error en la verificación del código' };
      } else if (error.message) {
        throw { message: error.message };
      } else {
        throw { message: 'Error de conexión con el servidor' };
      }
    }
  }
};

export default patientService;
