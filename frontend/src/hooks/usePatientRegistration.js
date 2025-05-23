import { useState, useContext } from 'react';
import patientService from '../services/patientService';
import authService from '../services/authService';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook para manejar el registro de pacientes y verificación de código
 * @returns {Object} - Funciones y estados para manejar el registro
 */
const usePatientRegistration = () => {
  // Obtener la función para actualizar el estado de autenticación
  const { updateAuthState } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [verificationToken, setVerificationToken] = useState(
    localStorage.getItem('omegadent_verification_token') || null
  );
  const [patientId, setPatientId] = useState(
    localStorage.getItem('omegadent_patient_id') || null
  );

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
      
      // Guardar también en localStorage para persistencia entre recargas
      localStorage.setItem('omegadent_verification_token', response.token);
      localStorage.setItem('omegadent_patient_id', response.patientId);
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
   * @param {string} token - Token de verificación (opcional si ya está guardado en el estado)
   */
  const verifyCode = async (code, token = null) => {
    // Si se proporciona un token, actualizamos el estado
    if (token && token !== verificationToken) {
      setVerificationToken(token);
    }
    try {
      setLoading(true);
      setError(null);
      
      // Usar el token proporcionado o el guardado en el estado
      const tokenToUse = token || verificationToken;
      console.log('Enviando verificación con token:', tokenToUse);
      
      // Llamar al servicio de verificación
      const response = await patientService.verifyCode(code, tokenToUse);
      
      // Procesar el inicio de sesión automático
      if (response.token) {
        console.log('Token de autenticación recibido, iniciando sesión automática');
        
        // Extraemos el nombre real y apellido desde la respuesta
        let userFullName = 'Usuario';
        
        // Intentamos obtener el nombre completo del usuario
        if (response.patientData) {
          // Si tenemos los datos del paciente completos
          const { name, lastname } = response.patientData;
          if (name && lastname) {
            userFullName = `${name} ${lastname}`;
          }
        } else if (response.userData && response.userData.name) {
          // Si recibimos los datos del usuario directamente
          userFullName = response.userData.name;
        } else {
          // Intentamos construir el nombre a partir de los datos disponibles en la respuesta
          const name = response.name || '';
          const lastname = response.lastname || '';
          
          if (name && lastname) {
            userFullName = `${name} ${lastname}`;
          } else if (name) {
            userFullName = name;
          } else if (response.userName) {
            userFullName = response.userName;
          } else if (response.email) {
            // Si solo tenemos el email, lo usamos como identificador
            userFullName = response.email.split('@')[0];
          }
        }
        
        // IMPORTANTE: Asegurarse de que el nombre sea válido y no sea 'Usuario'
        if (userFullName === 'Usuario' && response.name) {
          userFullName = response.name;
          if (response.lastname) {
            userFullName += ` ${response.lastname}`;
          }
        }
        
        // Intentar obtener el nombre del formulario de registro si está disponible
        const formDataName = localStorage.getItem('omegadent_registration_name');
        const formDataLastname = localStorage.getItem('omegadent_registration_lastname');
        
        if (userFullName === 'Usuario' && formDataName) {
          userFullName = formDataName;
          if (formDataLastname) {
            userFullName += ` ${formDataLastname}`;
          }
        }
        
        // Guardar la información en localStorage de múltiples formas para garantizar que esté disponible
        authService.setToken(response.token);
        authService.setUserType(response.userType || 'paciente');
        authService.setUserName(userFullName);
        
        // Guardar también en localStorage directamente para mayor seguridad
        localStorage.setItem('omegadent_user_name', userFullName);
        localStorage.setItem('omegadent_user_type', response.userType || 'paciente');
        localStorage.setItem('omegadent_auth_token', response.token);
        
        // Actualizar el estado de autenticación en el contexto global
        updateAuthState();
        
        // Forzar actualización del DOM
        window.dispatchEvent(new Event('storage'));
        
        // Registrar nombre para verificar
        console.log('Nombre de usuario establecido:', userFullName);
      } else {
        console.error('No se recibió token de autenticación en la respuesta');
      }
      
      setSuccess('Verificación exitosa. Sesión iniciada automáticamente.');
      console.log('Verificación exitosa, iniciando sesión con token:', response.token);
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
    
    // Limpiar también el localStorage
    localStorage.removeItem('omegadent_verification_token');
    localStorage.removeItem('omegadent_patient_id');
  };

  return {
    loading,
    error,
    success,
    verificationToken,
    setVerificationToken,
    patientId,
    setPatientId,
    registerPatient,
    verifyCode,
    resetStates
  };
};

export default usePatientRegistration;
