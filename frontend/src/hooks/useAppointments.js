import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import appointmentService from '../services/appointmentService';
import { toast } from 'react-toastify';

const useAppointments = () => {
  const [appointments, _] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, userType, user } = useAuth();

  // Obtener el ID del usuario del almacenamiento local si está disponible
  const getUserId = useCallback(() => {
    // Si tenemos el ID del usuario en el contexto, usarlo
    if (user?.id) return user.id;
    
    // Intentar obtener el ID del localStorage
    try {
      const userData = localStorage.getItem('omegadent_user_data');
      if (userData) {
        const parsedData = JSON.parse(userData);
        return parsedData.id;
      }
    } catch (error) {
      console.error('Error al obtener ID de usuario:', error);
    }
    
    return null;
  }, [user]);

  // Cargar las citas del usuario actual
  const loadUserAppointments = useCallback(async () => {
    if (!isAuthenticated || userType !== 'paciente') return;
    
    const userId = getUserId();
    if (!userId) {
      console.warn('No se pudo obtener el ID del usuario para cargar citas');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Cargando citas para el usuario:', userId);
      const data = await appointmentService.getAppointmentsByPatient(userId);
      setUserAppointments(data);
    } catch (err) {
      console.error('Error completo al cargar citas:', err);
      setError(err.message || 'Error al cargar las citas');
      toast.error('No se pudieron cargar tus citas. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, userType, getUserId]);

  // Crear una nueva cita
  const createAppointment = async (appointmentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error('No se pudo obtener el ID del usuario. Intenta iniciar sesión nuevamente.');
      }
      
      // Convertir y formatear los datos según espera el backend
      const fullAppointmentData = {
        appointment_date: appointmentData.appointment_date,
        appointment_time: appointmentData.appointment_time,
        problem_description: appointmentData.problem_description,
        patient_id: userId
      };
      
      console.log('Enviando datos de cita:', fullAppointmentData);
      
      const response = await appointmentService.createAppointment(fullAppointmentData);
      console.log('Respuesta del servidor:', response);
      
      // Actualizar la lista de citas del usuario
      if (response.appointment) {
        setUserAppointments(prev => [...prev, response.appointment]);
      } else if (response) {
        // Recargar las citas del usuario
        loadUserAppointments();
      }
      
      toast.success('¡Cita agendada con éxito! Espera la confirmación.');
      return response;
    } catch (err) {
      console.error('Error completo al crear cita:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Error al agendar la cita';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cancelar una cita
  const cancelAppointment = async (appointmentId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await appointmentService.changeAppointmentStatus(appointmentId, 'cancelada');
      
      // Actualizar el estado de la cita en la lista
      setUserAppointments(prev => 
        prev.map(app => 
          app._id === appointmentId 
            ? { ...app, appointment_status: 'cancelada' } 
            : app
        )
      );
      
      toast.info('Cita cancelada correctamente');
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al cancelar la cita';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Calificar una cita
  const rateAppointment = async (appointmentId, rating, comment = '') => {
    setLoading(true);
    setError(null);
    
    try {
      // Esta función es un placeholder - en un sistema real, enviarías la calificación al backend
      // Ejemplo: await api.post(`/appointments/${appointmentId}/rating`, { rating, comment });
      
      // Simulamos una llamada exitosa
      console.log(`Cita ${appointmentId} calificada con ${rating} estrellas. Comentario: ${comment}`);
      
      // Actualizamos la UI inmediatamente sin esperar al backend
      toast.success(`¡Gracias por tu valoración de ${rating} estrellas!`);
      
      // En un sistema real, podrías actualizar el estado local con la nueva calificación
      // setUserAppointments(prev => prev.map(app => 
      //   app._id === appointmentId ? { ...app, rating } : app
      // ));
      
      return { success: true };
    } catch (err) {
      const errorMessage = 'Error al enviar tu valoración';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar las citas al montar el componente y cuando cambie la autenticación
  useEffect(() => {
    if (isAuthenticated && (userType === 'paciente' || userType === 'administrador')) {
      loadUserAppointments();
    }
  }, [isAuthenticated, userType, loadUserAppointments]);

  return {
    appointments,
    userAppointments,
    loading,
    error,
    createAppointment,
    cancelAppointment,
    rateAppointment,
    loadUserAppointments
  };
};

export default useAppointments;
