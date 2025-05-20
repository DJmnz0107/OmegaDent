import { useState } from 'react';
import patientService from '../services/patientService';

/**
 * Custom hook para manejar el registro de pacientes y verificación de código
 * @returns {Object} - Funciones y estados para manejar el registro
 */
export const usePatientRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [verificationToken, setVerificationToken] = useState(null);
  const [patientId, setPatientId] = useState(null);

  /**
   * Registra un nuevo paciente en el sistema
   * @param {Object} patientData - Datos del paciente a registrar
   */
  const registerPatient = async (patientData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Llamar al servicio de registro
      const response = await patientService.registerPatient(patientData);
      
      // Guardar el token de verificación y el ID del paciente
      setVerificationToken(response.token);
      setPatientId(response.patientId);
      setSuccess('Paciente registrado correctamente. Por favor verifica tu correo con el código enviado.');
      
      return response;
    } catch (error) {
      setError(error.message || 'Error al registrar el paciente');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verifica el código enviado por correo electrónico
   * @param {string} code - Código de verificación
   */
  const verifyCode = async (code) => {
    try {
      setLoading(true);
      setError(null);
      
      // Llamar al servicio de verificación
      const response = await patientService.verifyCode(code, verificationToken);
      
      setSuccess('Verificación exitosa. Redirigiendo...');
      return response;
    } catch (error) {
      setError(error.message || 'Error al verificar el código');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpia los estados (útil al desmontar componentes)
   */
  const resetStates = () => {
    setLoading(false);
    setError(null);
    setSuccess(null);
    setVerificationToken(null);
    setPatientId(null);
  };

  return {
    loading,
    error,
    success,
    verificationToken,
    patientId,
    registerPatient,
    verifyCode,
    resetStates
  };
};
