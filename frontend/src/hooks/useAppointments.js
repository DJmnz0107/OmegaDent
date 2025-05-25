import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import appointmentService from '../services/appointmentService';
import ratingService from '../services/ratingService';
import { toast } from 'react-toastify';

const useAppointments = () => {
  const [appointments, _] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);
  const [ratedAppointments, setRatedAppointments] = useState([]);
  const [ratingsData, setRatingsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, userType, user } = useAuth();

  // Obtener el ID del usuario del almacenamiento local si está disponible
  const getUserId = useCallback(() => {
    console.log('Obteniendo ID de usuario, datos actuales:', { user });
    
    // Si tenemos el ID del usuario en el contexto, usarlo
    if (user?.id) {
      console.log('ID obtenido del contexto:', user.id);
      return user.id;
    }
    
    // Intentar obtener el ID del localStorage
    try {
      const userData = localStorage.getItem('omegadent_user_data');
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData.id) {
          console.log('ID obtenido de localStorage (user_data):', parsedData.id);
          return parsedData.id;
        }
      }

      // Si no hay datos en localStorage, verificar el token JWT
      const token = localStorage.getItem('omegadent_token');
      if (token) {
        console.log('Token encontrado, intentando decodificar...');
        // Intentar decodificar el token para obtener el ID del usuario
        // El token JWT tiene tres partes separadas por puntos
        const parts = token.split('.');
        if (parts.length === 3) {
          // La segunda parte contiene los datos del usuario en formato base64
          try {
            // Decodificar correctamente el base64url
            const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            console.log('Payload del token JWT:', payload);
            
            // Buscar el ID en diferentes formatos posibles
            const userId = payload.id || payload.userId || payload.user_id || 
                          payload.sub || (payload.user && payload.user.id);
            
            if (userId) {
              console.log('ID de usuario recuperado del token JWT:', userId);
              
              // Guardar el ID en localStorage para futuras referencias
              if (!userData) {
                const newUserData = { id: userId };
                localStorage.setItem('omegadent_user_data', JSON.stringify(newUserData));
              }
              
              return userId;
            } else {
              console.warn('No se pudo encontrar ID en el token JWT:', payload);
            }
          } catch (decodeError) {
            console.error('Error al decodificar token JWT:', decodeError);
          }
        }
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

  // Cargar las citas calificadas por el usuario
  const loadRatedAppointments = useCallback(async () => {
    if (!isAuthenticated) return [];
    
    const userId = getUserId();
    if (!userId) return [];
    
    try {
      // Obtener las calificaciones del usuario
      const ratings = await ratingService.getRatingsByUser(userId);
      
      // Crear un objeto para almacenar toda la información de calificaciones
      const ratingsInfo = {};
      
      // Guardar los IDs de las citas calificadas
      const ratedIds = ratings.map(rating => {
        // Determinar el ID de la cita
        const appointmentId = typeof rating.appointment_id === 'string' 
          ? rating.appointment_id 
          : rating.appointment_id?._id;
          
        if (appointmentId) {
          // Guardar los datos completos de la calificación
          ratingsInfo[appointmentId] = {
            score: rating.rating_score,
            comment: rating.comment || '',
            date: rating.createdAt || new Date().toISOString()
          };
        }
        
        return appointmentId;
      }).filter(id => id); // Filtrar valores nulos o undefined
      
      // Actualizar el estado con la información completa de calificaciones
      setRatingsData(ratingsInfo);
      setRatedAppointments(ratedIds);
      
      console.log('Ratings cargados:', ratingsInfo); // Para debugging
      
      return ratedIds;
    } catch (error) {
      console.error('Error al cargar citas calificadas:', error);
      return [];
    }
  }, [isAuthenticated, getUserId]);

  // Verificar si una cita ya ha sido calificada
  const isAppointmentRated = useCallback((appointmentId) => {
    return ratedAppointments.includes(appointmentId);
  }, [ratedAppointments]);

  // Calificar una cita
  const rateAppointment = async (appointmentId, rating, comment = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error('No se pudo obtener el ID del usuario');
      }
      
      // Crear el objeto de calificación
      const ratingData = {
        user_id: userId,
        appointment_id: appointmentId,
        rating_score: rating,
        comment
      };
      
      // Enviar la calificación al backend
      const response = await ratingService.createRating(ratingData);
      
      // Actualizar la lista de citas calificadas
      await loadRatedAppointments();
      
      // Mostrar mensaje de éxito
      toast.success(`¡Gracias por tu valoración de ${rating} estrellas!`);
      
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al enviar tu valoración';
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
      loadRatedAppointments();
    }
  }, [isAuthenticated, userType, loadUserAppointments, loadRatedAppointments]);

  return {
    appointments,
    userAppointments,
    ratedAppointments,
    ratingsData,      // Exponemos la información completa de calificaciones
    loading,
    error,
    createAppointment,
    cancelAppointment,
    rateAppointment,
    loadUserAppointments,
    loadRatedAppointments,
    isAppointmentRated
  };
};

export default useAppointments;
