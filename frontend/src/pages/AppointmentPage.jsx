import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import useAppointments from '../hooks/useAppointments';
import { toast } from 'react-toastify';
import authService from '../services/authService';

const AppointmentPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { 
    userAppointments, 
    loading, 
    createAppointment, 
    cancelAppointment, 
    rateAppointment,
    ratedAppointments,
    ratingsData,
    isAppointmentRated,
    loadRatedAppointments
  } = useAppointments();
  
  // Estado para controlar la vista de valoraciones
  const [showRatings, setShowRatings] = useState(false);
  // Estado para manejar las valoraciones de las citas
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  // Estado para almacenar las valoraciones ya realizadas
  const [ratingScores, setRatingScores] = useState({});
  
  // Estados para el resumen de cita
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // React Hook Form para validación
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  
  // Observar los cambios en los campos del formulario
  const watchDate = watch('date');
  const watchTime = watch('time');

  // Verificar autenticación al cargar la página
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Necesitas iniciar sesión para acceder a esta página');
      navigate('/login');
    } else {
      // Cargar citas y sus estados de calificación
      loadRatedAppointments();
    }
  }, [isAuthenticated, navigate, loadRatedAppointments]);
  
  // Actualizar los estados locales cuando cambian los ratings en el hook
  useEffect(() => {
    if (Object.keys(ratingsData).length > 0) {
      // Extrae las puntuaciones y comentarios del objeto ratingsData
      const newRatingScores = {};
      const newComments = {};
      
      Object.entries(ratingsData).forEach(([appointmentId, data]) => {
        newRatingScores[appointmentId] = data.score;
        newComments[appointmentId] = data.comment;
      });
      
      // Actualiza los estados locales
      setRatingScores(newRatingScores);
      setComments(newComments);
      
      console.log('Puntuaciones actualizadas:', newRatingScores);
      console.log('Comentarios actualizados:', newComments);
    }
  }, [ratingsData]);
  
  // Actualizar estados cuando cambian los valores del formulario
  useEffect(() => {
    setSelectedDate(watchDate || '');
  }, [watchDate]);
  
  useEffect(() => {
    setSelectedTime(watchTime || '');
  }, [watchTime]);
  

  
  // Opciones de horas disponibles
  const timeOptions = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];
  
  // Función para establecer la valoración de una cita
  const handleRatingChange = (appointmentId, starValue) => {
    setRatings(prev => ({
      ...prev,
      [appointmentId]: starValue
    }));
  };

  // Función para manejar cambios en los comentarios
  const handleCommentChange = (appointmentId, commentText) => {
    setComments(prev => ({
      ...prev,
      [appointmentId]: commentText
    }));
  };

  // Obtener el ID del usuario del almacenamiento local o del objeto user
  const getUserId = () => {
    // Si tenemos el ID del usuario en el objeto user, usarlo
    if (user?.id) return user.id;
    
    // Intentar obtener el ID del localStorage
    try {
      const userData = authService.getUserData();
      if (userData && userData.id) {
        return userData.id;
      }
    } catch (error) {
      console.error('Error al obtener ID de usuario:', error);
    }
    
    return null;
  };

  // Función para enviar el formulario
  const onSubmit = async (data) => {
    try {
      const userId = getUserId();
      
      if (!userId) {
        toast.error('No se pudo identificar tu cuenta. Por favor, inicia sesión nuevamente.');
        return;
      }
      
      // Convertir la fecha y hora al formato correcto para el backend
      const appointmentData = {
        appointment_date: data.date, // Formato: YYYY-MM-DD
        appointment_time: data.time, // Formato: HH:MM (24h)
        problem_description: data.problem,
        patient_id: userId
      };

      await createAppointment(appointmentData);
      toast.success('Cita agendada con éxito');
      reset(); // Limpiar el formulario después del envío exitoso
    } catch (error) {
      console.error('Error al crear la cita:', error);
      toast.error('No se pudo agendar la cita. Por favor, intenta de nuevo.');
    }
  };

  // Función para cancelar una cita
  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      try {
        await cancelAppointment(appointmentId);
        toast.success('Cita cancelada con éxito');
      } catch (error) {
        console.error('Error al cancelar la cita:', error);
        toast.error('No se pudo cancelar la cita. Por favor, intenta de nuevo.');
      }
    }
  };

  // Función para enviar valoración
  const handleRateAppointment = async (appointmentId, rating) => {
    if (!rating) {
      toast.error('Debes seleccionar una valoración (1-5 estrellas)');
      return;
    }
    
    try {
      // Enviar tanto el rating como el comentario
      const comment = comments[appointmentId] || '';
      await rateAppointment(appointmentId, rating, comment);
      
      // Recargar las calificaciones del usuario
      await loadRatedAppointments();
      toast.success('Valoración enviada con éxito');
      
      // Limpiar los estados locales
      setRatings(prev => {
        const newRatings = {...prev};
        delete newRatings[appointmentId];
        return newRatings;
      });
      
      setComments(prev => {
        const newComments = {...prev};
        delete newComments[appointmentId];
        return newComments;
      });
      
    } catch (error) {
      console.error('Error al valorar la cita:', error);
      toast.error('No se pudo enviar la valoración. Por favor, intenta de nuevo.');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-[76px] bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center text-3xl lg:text-4xl font-bold mb-10">
            <span className="text-[#0E6B96]">Agenda</span>
            <span className="text-[#0EB19B]"> una cita</span>
          </h1>
          
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:space-x-6">
            {/* Columna izquierda - Formulario de cita */}
            <div className="md:w-1/2 bg-white p-6 rounded-md border border-gray-200 shadow-sm mb-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Fecha de la cita */}
                <div className="mb-6">
                  <label className="block text-[#0E6B96] font-medium mb-2">
                    Fecha de la cita
                  </label>
                  <input
                    type="date"
                    name="date"
                    className={`border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 w-full`}
                    min={new Date().toISOString().split('T')[0]}
                    {...register('date', { required: 'La fecha es obligatoria' })}
                  />
                  {errors.date && (
                    <p className="mt-1 text-red-500 text-sm">{errors.date.message}</p>
                  )}
                </div>
                
                {/* Hora de la cita */}
                <div className="mb-6">
                  <label className="block text-[#0E6B96] font-medium mb-2">
                    Hora de la cita
                  </label>
                  <div className="relative">
                    <select
                      name="time"
                      className={`border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 w-full appearance-none bg-white`}
                      {...register('time', { required: 'La hora es obligatoria' })}
                    >
                      <option value="">Selecciona una hora</option>
                      {timeOptions.map(time => (
                        <option key={time} value={time}>
                          {time.slice(0,2) > 12 ? `${time.slice(0,2)-12}:${time.slice(3,5)} PM` : `${time} AM`}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  {errors.time && (
                    <p className="mt-1 text-red-500 text-sm">{errors.time.message}</p>
                  )}
                </div>
                
                {/* Descripción del problema */}
                <div className="mb-6">
                  <label className="block text-[#0E6B96] font-medium mb-2">
                    Descripción del problema
                  </label>
                  <textarea
                    name="problem"
                    rows="4"
                    className={`border ${errors.problem ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 w-full`}
                    placeholder="Descríbanos qué molestias o necesidades presenta"
                    {...register('problem', { required: 'La descripción del problema es obligatoria' })}
                  ></textarea>
                  {errors.problem && (
                    <p className="mt-1 text-red-500 text-sm">{errors.problem.message}</p>
                  )}
                </div>
                
                {/* Resumen de cita - solo se muestra si hay fecha o hora seleccionada */}
                {(selectedDate || selectedTime) && (
                  <div className="mb-6 bg-[#EEF6FC] p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-[#0E6B96] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[#0E6B96] font-medium">Resumen de tu cita</span>
                    </div>
                    <p className="text-[#0E6B96]">
                      {selectedDate && (
                        <span>
                          {new Date(selectedDate).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      )}
                      {selectedDate && selectedTime && ' '}
                      {selectedTime && (
                        <span>
                          {selectedTime.slice(0,2) > 12 
                            ? `${selectedTime.slice(0,2)-12}:${selectedTime.slice(3,5)} PM` 
                            : `${selectedTime} AM`}
                        </span>
                      )}
                    </p>
                  </div>
                )}
                
                {/* Botón de enviar */}
                <button
                  type="submit"
                  className="w-full bg-[#0A3E59] text-white font-medium py-3 px-4 rounded-md hover:bg-[#0E6B96] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar datos'}
                </button>
              </form>
            </div>
            
            {/* Columna derecha - Confirmación y citas */}
            <div className="md:w-1/2">
              {/* Sección de confirmación de cita */}
              <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm mb-6">
                <h2 className="text-[#0E6B96] text-xl font-medium mb-4">
                  Confirmación de cita
                </h2>
                
                {loading ? (
                  <div className="border border-gray-200 rounded-md p-4">
                    <p className="text-gray-500 text-center">Cargando...</p>
                  </div>
                ) : userAppointments.filter(appointment => appointment.appointment_status === 'pendiente' || appointment.appointment_status === 'confirmada').length === 0 ? (
                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#0E6B96] mr-2 flex items-center justify-center text-white text-xs font-bold">i</div>
                      <p className="text-sm text-[#0E6B96]">
                        Tu cita está en espera de confirmación
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {userAppointments
                      .filter(appointment => appointment.appointment_status === 'pendiente' || appointment.appointment_status === 'confirmada')
                      .map((appointment) => (
                        <div key={appointment._id} className="border border-gray-200 rounded-md p-4">
                          <div className="flex items-center mb-3">
                            {appointment.appointment_status === 'confirmada' ? (
                              <div className="h-6 w-6 rounded-full bg-[#0EB19B] mr-2 flex items-center justify-center text-white text-xs font-bold">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : (
                              <div className="h-6 w-6 rounded-full bg-[#0E6B96] mr-2 flex items-center justify-center text-white text-xs font-bold">i</div>
                            )}
                            <p className={`text-sm font-medium ${appointment.appointment_status === 'confirmada' ? 'text-[#0EB19B]' : 'text-[#0E6B96]'}`}>
                              {appointment.appointment_status === 'confirmada' 
                                ? 'Tu cita ha sido confirmada' 
                                : 'Tu cita está en espera de confirmación'}
                            </p>
                          </div>
                          
                          {/* Resumen de la cita pendiente */}
                          <div className="bg-[#EEF6FC] p-3 rounded-md mb-3">
                            <div className="flex items-center mb-2">
                              <svg className="h-5 w-5 text-[#0E6B96] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-[#0E6B96] font-medium">Resumen de tu cita</span>
                            </div>
                            <p className="text-[#0E6B96] ml-7">
                              <span className="block mb-1">
                                <strong>Fecha:</strong> {new Date(appointment.appointment_date).toLocaleDateString('es-ES', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </span>
                              <span className="block mb-1">
                                <strong>Hora:</strong> {appointment.appointment_time.slice(0,2) > 12 
                                  ? `${appointment.appointment_time.slice(0,2)-12}:${appointment.appointment_time.slice(3,5)} PM` 
                                  : `${appointment.appointment_time} AM`}
                              </span>
                              {appointment.problem_description && (
                                <span className="block mb-1">
                                  <strong>Descripción:</strong> {appointment.problem_description.length > 50 
                                    ? `${appointment.problem_description.substring(0, 50)}...` 
                                    : appointment.problem_description}
                                </span>
                              )}
                              {appointment.doctor_id && (
                                <span className="block">
                                  <strong>Doctor:</strong> Dr. {appointment.doctor_id.name} {appointment.doctor_id.lastName}
                                </span>
                              )}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <button 
                              onClick={() => handleCancelAppointment(appointment._id)}
                              className="text-red-500 text-sm hover:underline"
                            >
                              Cancelar cita
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              
              {/* Sección de citas confirmadas */}
              <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[#0E6B96] text-xl font-medium">
                    {showRatings ? 'Mis valoraciones' : 'Citas confirmadas'}
                  </h2>
                  <button 
                    onClick={() => setShowRatings(!showRatings)}
                    className="px-3 py-1 bg-[#0EB19B] hover:bg-[#0c9a86] text-white text-sm rounded-md transition duration-300 flex items-center"
                  >
                    {showRatings ? (
                      <>
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                        Ver citas
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Ver valoraciones
                      </>
                    )}
                  </button>
                </div>
                
                {loading ? (
                  <div className="border border-gray-200 rounded-md p-4">
                    <p className="text-gray-500 text-center">Cargando...</p>
                  </div>
                ) : showRatings ? (
                  // Vista de valoraciones realizadas (usamos userAppointments pero filtramos los que ya están en ratedAppointments)
                  ratedAppointments.length === 0 ? (
                    <div className="border border-gray-200 rounded-md p-4">
                      <p className="text-gray-500 text-center">No has realizado valoraciones todavía</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userAppointments
                        .filter(app => isAppointmentRated(app._id))
                        .map((appointment) => (
                          <div key={appointment._id} className="border border-gray-200 rounded-md p-4">
                            <div className="flex items-center mb-2">
                              <svg className="h-5 w-5 text-[#0E6B96] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-[#0E6B96] font-medium">
                                {new Date(appointment.appointment_date).toLocaleDateString()} {appointment.appointment_time}
                                {appointment.doctor_id && ` - Dr. ${appointment.doctor_id.name} ${appointment.doctor_id.lastName}`}
                              </span>
                            </div>
                            
                            <div className="bg-[#0EB19B] text-white text-xs py-1 px-3 rounded-full inline-block mb-2">
                              Calificada
                            </div>
                            
                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium mr-2">Tu valoración:</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => {
                                  // Obtenemos la puntuación desde ratingsData si existe, o desde ratingScores como respaldo
                                  const rating = ratingsData[appointment._id]?.score || parseInt(ratingScores[appointment._id]) || 0;
                                  const isColored = star <= rating;
                                  
                                  console.log(`Cita ${appointment._id} - Estrella ${star} - Rating ${rating} - Coloreada: ${isColored}`);
                                  
                                  return (
                                    <svg 
                                      key={star}
                                      className={`h-5 w-5 ${isColored ? 'text-yellow-400' : 'text-gray-300'}`}
                                      viewBox="0 0 20 20" 
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  );
                                })}
                              </div>
                            </div>
                            
                            {(ratingsData[appointment._id]?.comment || comments[appointment._id]) && (
                              <div className="bg-gray-50 p-3 rounded-md mb-2">
                                <p className="text-sm text-gray-600">"{ ratingsData[appointment._id]?.comment || comments[appointment._id]}"</p>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )
                ) : userAppointments.filter(a => a.appointment_status === 'finalizada' && !isAppointmentRated(a._id)).length === 0 ? (
                  <div className="border border-gray-200 rounded-md p-4">
                    <p className="text-gray-500 text-center">No tienes citas pendientes de calificar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userAppointments
                      .filter(appointment => appointment.appointment_status === 'finalizada' && !isAppointmentRated(appointment._id))
                      .map((appointment) => (
                        <div key={appointment._id} className="border border-gray-200 rounded-md p-4">
                          <div className="flex items-center mb-2">
                            <svg className="h-5 w-5 text-[#0E6B96] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-[#0E6B96] font-medium">
                              {new Date(appointment.appointment_date).toLocaleDateString()} {appointment.appointment_time}
                              {appointment.doctor_id && ` - Dr. ${appointment.doctor_id.name} ${appointment.doctor_id.lastName}`}
                            </span>
                          </div>
                          
                          <div className="bg-[#0EB19B] text-white text-xs py-1 px-3 rounded-full inline-block mb-2">
                            Estado de la cita: finalizada
                          </div>
                          
                          {isAppointmentRated(appointment._id) ? (
                            <div className="mt-2">
                              <div className="flex items-center mb-2">
                                <span className="text-sm font-medium mr-2">Tu valoración:</span>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <svg 
                                      key={star}
                                      className={`h-5 w-5 ${(ratings[appointment._id] || 0) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                      viewBox="0 0 20 20" 
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              {comments[appointment._id] && (
                                <div className="bg-gray-50 p-3 rounded-md mb-2">
                                  <p className="text-sm text-gray-600">"{comments[appointment._id]}"</p>
                                </div>
                              )}
                              <div className="text-sm text-green-600">
                                <svg className="inline h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Valoración enviada
                              </div>
                            </div>
                          ) : (
                            <div>
                              {/* Estrellas de calificación */}
                              <div className="flex mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg 
                                    key={star}
                                    className={`h-5 w-5 cursor-pointer ${(ratings[appointment._id] || 0) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                    onClick={() => handleRatingChange(appointment._id, star)}
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              
                              <div>
                                <p className="text-sm text-gray-500 mb-2">¿Cómo fue tu experiencia?</p>
                                <textarea
                                  className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2 text-sm"
                                  rows="2"
                                  placeholder="Escribe tu comentario aquí..."
                                  value={comments[appointment._id] || ''}
                                  onChange={(e) => handleCommentChange(appointment._id, e.target.value)}
                                ></textarea>
                                <button 
                                  onClick={() => handleRateAppointment(appointment._id, ratings[appointment._id] || 0)}
                                  disabled={!ratings[appointment._id]}
                                  className="bg-[#0A3E59] text-white text-sm py-2 px-4 rounded-md hover:bg-[#0E6B96] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed w-full"
                                >
                                  Enviar valoración
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppointmentPage;