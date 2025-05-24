import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import useAppointments from '../hooks/useAppointments';
import { toast } from 'react-toastify';
// import dayjs from 'dayjs'; // Temporalmente comentado
import authService from '../services/authService';

const AppointmentPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { userAppointments, loading, createAppointment, cancelAppointment, rateAppointment } = useAppointments();
  // Estado para manejar las valoraciones de las citas
  const [ratings, setRatings] = useState({});
  
  // React Hook Form para validación
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Verificar autenticación al cargar la página
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Necesitas iniciar sesión para acceder a esta página');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
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

      console.log('Enviando datos de cita:', appointmentData);
      await createAppointment(appointmentData);
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
      } catch (error) {
        console.error('Error al cancelar la cita:', error);
      }
    }
  };

  // Función para enviar valoración
  const handleRateAppointment = async (appointmentId, rating) => {
    try {
      await rateAppointment(appointmentId, rating);
    } catch (error) {
      console.error('Error al valorar la cita:', error);
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
          
          <div className="max-w-6xl mx-auto">
            {/* Formulario de cita - Diseño idéntico a la imagen 1 */}
            <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm mb-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row md:space-x-6">
                  {/* Columna izquierda - Fecha y hora */}
                  <div className="md:w-1/2">
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
                    </div>
                  </div>
                  
                  {/* Columna derecha - Resumen de cita */}
                  <div className="md:w-1/2">
                    <div className="bg-[#EEF6FC] p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 text-[#0E6B96] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[#0E6B96] font-medium">Resumen de tu cita</span>
                      </div>
                      <p className="text-[#0E6B96]">
                        8 de Octubre 10:00 AM
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Descripción del problema */}
                <div className="mt-6 mb-6">
                  <label className="block text-[#0E6B96] font-medium mb-2">
                    Descripción del problema
                  </label>
                  <textarea
                    name="problem"
                    rows="6"
                    className={`border ${errors.problem ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 w-full`}
                    placeholder="Descríbanos qué molestias o necesidades presenta"
                    {...register('problem', { required: 'La descripción del problema es obligatoria' })}
                  ></textarea>
                  {errors.problem && (
                    <p className="mt-1 text-red-500 text-sm">{errors.problem.message}</p>
                  )}
                </div>
                
                {/* Botón de enviar */}
                <button
                  type="submit"
                  className="w-full bg-[#0A3E59] text-white font-medium py-3 px-4 rounded-md hover:bg-[#0E6B96] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Agendar cita'}
                </button>
              </form>
            </div>
            
            {/* Columna derecha - Confirmación y citas */}
            <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
              {/* Confirmación de cita */}
              <div className="mb-6">
                <h2 className="text-[#0E6B96] text-xl font-medium mb-4">
                  Estado de tus citas
                </h2>
                
                {loading ? (
                  <div className="border border-gray-200 rounded-md p-4">
                    <p className="text-gray-500 text-center">Cargando tus citas...</p>
                  </div>
                ) : userAppointments.length === 0 ? (
                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#0E6B96] mr-2 flex items-center justify-center text-white text-xs font-bold">i</div>
                      <p className="text-sm text-[#0E6B96]">
                        No tienes citas agendadas. ¡Agenda tu primera cita ahora!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {userAppointments
                      .filter(appointment => appointment.appointment_status === 'pendiente')
                      .map((appointment) => (
                        <div key={appointment._id} className="border border-gray-200 rounded-md p-4 mb-3">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-[#0E6B96] mr-2 flex items-center justify-center text-white text-xs font-bold">i</div>
                            <p className="text-sm text-[#0E6B96]">
                              Tu cita del {new Date(appointment.appointment_date).toLocaleDateString()} a las {appointment.appointment_time} está en espera de confirmación
                            </p>
                          </div>
                          <div className="mt-2 text-right">
                            <button 
                              onClick={() => handleCancelAppointment(appointment._id)}
                              className="text-red-500 text-sm hover:underline"
                            >
                              Cancelar cita
                            </button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
              
              {/* Citas confirmadas */}
              <div>
                <h2 className="text-[#0E6B96] text-xl font-medium mb-4">
                  Historial de citas
                </h2>
                
                {loading ? (
                  <div className="border border-gray-200 rounded-md p-4">
                    <p className="text-gray-500 text-center">Cargando historial...</p>
                  </div>
                ) : userAppointments.filter(a => a.appointment_status !== 'pendiente').length === 0 ? (
                  <div className="border border-gray-200 rounded-md p-4">
                    <p className="text-gray-500 text-center">No tienes citas en tu historial</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userAppointments
                      .filter(appointment => appointment.appointment_status !== 'pendiente')
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
                            
                            <div className={`${appointment.appointment_status === 'completada' ? 'bg-[#0EB19B]' : 'bg-[#e74c3c]'} text-white text-xs py-1 px-3 rounded-full inline-block mb-2`}>
                              Estado: {appointment.appointment_status === 'completada' ? 'Completada' : 'Cancelada'}
                            </div>
                            
                            {appointment.appointment_status === 'completada' && (
                              <>
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
                                  <button 
                                    onClick={() => handleRateAppointment(appointment._id, ratings[appointment._id] || 0)}
                                    disabled={!ratings[appointment._id]}
                                    className="bg-[#0A3E59] text-white text-sm py-2 px-4 rounded-md hover:bg-[#0E6B96] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                  >
                                    Enviar valoración
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                      ))
                    }
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
