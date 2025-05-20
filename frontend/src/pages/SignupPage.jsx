import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CodeVerificationModal from '../components/CodeVerificationModal';
import SuccessModal from '../components/SuccessModal';
import { usePatientRegistration } from '../hooks/usePatientRegistration';

const SignupPage = () => {
  const navigate = useNavigate();
  
  // Estados para manejar el formulario de registro paso a paso
  const [step, setStep] = useState(1); // 1: primer formulario, 2: segundo formulario
  const [showVerification, setShowVerification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Hook personalizado para el registro de pacientes
  const { 
    loading, 
    error, 
    success, 
    verificationToken,
    patientId,
    registerPatient, 
    verifyCode, 
    resetStates 
  } = usePatientRegistration();
  
  // Configuración de react-hook-form para el primer paso (datos de acceso)
  const { 
    register: registerStep1, 
    handleSubmit: handleSubmitStep1, 
    formState: { errors: errorsStep1 },
    getValues: getValuesStep1
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  
  // Configuración de react-hook-form para el segundo paso (datos personales)
  const { 
    register: registerStep2, 
    handleSubmit: handleSubmitStep2, 
    formState: { errors: errorsStep2 },
    setValue,
    watch,
    getValues: getValuesStep2
  } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      dui: '',
      phoneNumber: '',
      birthday: '',
      weight: '',
      height: '',
      maritalStatus: '',
      gender: 'masculino',
      occupation: '',
      address: '',
      includeEmergencyContact: false,
      emergencyContact: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        occupation: '',
        familyRelationship: ''
      }
    }
  });
  
  // Observar el valor de includeEmergencyContact para resetear campos cuando cambie
  const watchIncludeEmergencyContact = watch("includeEmergencyContact", false);
  
  // Efecto para mostrar notificaciones de éxito o error
  useEffect(() => {
    if (error) {
      toast.error(error);
      resetStates();
    }
    
    if (success) {
      toast.success(success);
    }
  }, [error, success, resetStates]);
  
  // Efecto para limpiar campos de contacto de emergencia cuando se desactiva
  useEffect(() => {
    if (!watchIncludeEmergencyContact) {
      setValue("emergencyContact.firstName", "");
      setValue("emergencyContact.lastName", "");
      setValue("emergencyContact.phoneNumber", "");
      setValue("emergencyContact.occupation", "");
      setValue("emergencyContact.familyRelationship", "");
    }
  }, [watchIncludeEmergencyContact, setValue]);
  
  // Manejar envío del primer paso del formulario
  const onSubmitStep1 = (data) => {
    // Avanzar al segundo paso
    setStep(2);
  };
  
  // Manejar envío del segundo paso del formulario
  const onSubmitStep2 = async (data) => {
    try {
      // Preparar los datos para enviar al servidor
      const formDataToSubmit = {
        // Datos del paso 1
        email: getValuesStep1("email"),
        password: getValuesStep1("password"),
        
        // Datos del paso 2
        name: data.name,
        lastname: data.lastname,
        dui: data.dui || '',
        phoneNumber: data.phoneNumber || '',
        birthday: data.birthday || '',
        weight: data.weight ? Number(data.weight) : null,
        height: data.height ? Number(data.height) : null,
        maritalStatus: data.maritalStatus || null,
        gender: data.gender,
        occupation: data.occupation || '',
        address: data.address || '',
        recordNumber: Math.floor(Math.random() * 1000000).toString(), // Simulación de número de registro
        
        // Contacto de emergencia (si está incluido)
        emergencyContact: watchIncludeEmergencyContact ? {
          firstName: data.emergencyContact.firstName || '',
          lastName: data.emergencyContact.lastName || '',
          phoneNumber: data.emergencyContact.phoneNumber || '',
          occupation: data.emergencyContact.occupation || '',
          familyRelationship: data.emergencyContact.familyRelationship || ''
        } : null
      };
      
      // Llamar al servicio de registro
      await registerPatient(formDataToSubmit);
      
      // Mostrar modal de verificación
      setShowVerification(true);
    } catch (error) {
      console.error('Error al registrar paciente:', error);
      // El error ya se maneja en el useEffect que escucha los cambios en el estado 'error'
    }
  };
  
  // Manejar la verificación del código
  const handleCodeVerification = async (code) => {
    try {
      // Verificar el código con el backend
      await verifyCode(code);
      
      // Ocultar modal de verificación
      setShowVerification(false);
      
      // Mostrar modal de éxito
      setShowSuccess(true);
    } catch (error) {
      console.error('Error al verificar código:', error);
      // El error ya se maneja en el useEffect con el toast
      toast.error("Error al verificar el código. Intente nuevamente.");
    }
  };
  
  // Manejar cierre del modal de éxito
  const handleSuccessClose = () => {
    setShowSuccess(false);
    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A3E59] to-[#19CEB3] py-6">
      {/* Logo OmegaDent en la esquina superior izquierda */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center">
          <img src="/images/logo.svg" alt="OmegaDent Logo" className="h-6" />
          <span className="text-white text-xl font-bold ml-2">OmegaDent</span>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">
          {step === 1 ? 'Crea tu cuenta' : 'Información personal'}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {step === 1 ? '¡Únete a nosotros!' : 'Completa tus datos'}
        </p>
        
        {/* Formulario de registro - Paso 1 */}
        {step === 1 ? (
          <form onSubmit={handleSubmitStep1(onSubmitStep1)}>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                {...registerStep1("email", {
                  required: "El correo electrónico es requerido",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El correo electrónico no es válido"
                  }
                })}
                className={`w-full px-4 py-3 border ${errorsStep1.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                placeholder="Correo electrónico"
              />
              {errorsStep1.email && (
                <p className="text-red-500 text-xs mt-1">{errorsStep1.email.message}</p>
              )}
            </div>
            
            {/* Contraseña */}
            <div className="mb-4 relative">
              <input
                type="password"
                {...registerStep1("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres"
                  }
                })}
                className={`w-full px-4 py-3 border ${errorsStep1.password ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                placeholder="Contraseña"
              />
              {errorsStep1.password && (
                <p className="text-red-500 text-xs mt-1">{errorsStep1.password.message}</p>
              )}
            </div>
            
            {/* Confirmar contraseña */}
            <div className="mb-6 relative">
              <input
                type="password"
                {...registerStep1("confirmPassword", {
                  required: "Confirma tu contraseña",
                  validate: (value) => value === getValuesStep1("password") || "Las contraseñas no coinciden"
                })}
                className={`w-full px-4 py-3 border ${errorsStep1.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                placeholder="Confirmar contraseña"
              />
              {errorsStep1.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errorsStep1.confirmPassword.message}</p>
              )}
            </div>
            
            {/* Botón de siguiente - pixel perfect según la imagen */}
            <button
              type="submit"
              className="w-full bg-[#0A3A4A] text-white py-3 px-4 rounded-lg hover:bg-[#0E6B96] transition duration-300 font-medium"
              disabled={loading}
            >
              {loading ? "Procesando..." : "Siguiente"}
            </button>
          </form>
        ) : (
          // Paso 2: Formulario de información personal - pixel perfect según modelo de pacientes
          <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
            {/* Nombre */}
            <div className="mb-4">
              <input
                type="text"
                {...registerStep2("name", {
                  required: "El nombre es requerido"
                })}
                className={`w-full px-4 py-3 border ${errorsStep2.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                placeholder="Nombre"
              />
              {errorsStep2.name && (
                <p className="text-red-500 text-xs mt-1">{errorsStep2.name.message}</p>
              )}
            </div>
            
            {/* Apellido */}
            <div className="mb-4">
              <input
                type="text"
                {...registerStep2("lastname", {
                  required: "El apellido es requerido"
                })}
                className={`w-full px-4 py-3 border ${errorsStep2.lastname ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                placeholder="Apellido"
              />
              {errorsStep2.lastname && (
                <p className="text-red-500 text-xs mt-1">{errorsStep2.lastname.message}</p>
              )}
            </div>
            
            {/* Fila DUI y Teléfono */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* DUI */}
              <div>
                <input
                  type="text"
                  maxLength="10"
                  {...registerStep2("dui", {
                    pattern: {
                      value: /^\d{8}-\d{1}$/,
                      message: "El DUI debe tener el formato 00000000-0"
                    }
                  })}
                  className={`w-full px-4 py-3 border ${errorsStep2.dui ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                  placeholder="DUI (00000000-0)"
                  onKeyPress={(e) => {
                    // Solo permitir dígitos
                    if (!/\d/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, ''); // Eliminar cualquier carácter que no sea número
                    
                    // Si tenemos 8 o más dígitos, insertamos el guión
                    if (value.length >= 8) {
                      const firstPart = value.substring(0, 8);
                      const secondPart = value.substring(8, 9);
                      value = `${firstPart}-${secondPart}`;
                    }
                    
                    // Actualizar el valor en react-hook-form
                    setValue("dui", value);
                  }}
                />
                {errorsStep2.dui && (
                  <p className="text-red-500 text-xs mt-1">{errorsStep2.dui.message}</p>
                )}
              </div>
              
              {/* Teléfono */}
              <div>
                <input
                  type="text"
                  {...registerStep2("phoneNumber", {
                    pattern: {
                      value: /^\d{4}-\d{4}$/,
                      message: "El teléfono debe tener el formato 0000-0000"
                    }
                  })}
                  className={`w-full px-4 py-3 border ${errorsStep2.phoneNumber ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                  placeholder="Teléfono (0000-0000)"
                />
                {errorsStep2.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errorsStep2.phoneNumber.message}</p>
                )}
              </div>
            </div>
            
            {/* Dirección */}
            <div className="mb-4">
              <input
                type="text"
                {...registerStep2("address")}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                placeholder="Dirección"
              />
            </div>
            
            {/* Fila: Fecha de nacimiento, Profesión */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Fecha de nacimiento */}
              <div>
                <input
                  type="date"
                  {...registerStep2("birthday")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                  placeholder="Fecha de nacimiento"
                />
              </div>
              
              {/* Profesión/Ocupación */}
              <div>
                <input
                  type="text"
                  {...registerStep2("occupation")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                  placeholder="Profesión/Ocupación"
                />
              </div>
            </div>
            
            {/* Fila: Peso y Altura */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Peso */}
              <div>
                <input
                  type="text"
                  {...registerStep2("weight", {
                    pattern: {
                      value: /^\d+(\.\d+)?$/,
                      message: "Ingrese un número válido"
                    }
                  })}
                  className={`w-full px-4 py-3 border ${errorsStep2.weight ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                  placeholder="Peso (kg)"
                />
                {errorsStep2.weight && (
                  <p className="text-red-500 text-xs mt-1">{errorsStep2.weight.message}</p>
                )}
              </div>
              
              {/* Altura */}
              <div>
                <input
                  type="text"
                  {...registerStep2("height", {
                    pattern: {
                      value: /^\d+(\.\d+)?$/,
                      message: "Ingrese un número válido"
                    }
                  })}
                  className={`w-full px-4 py-3 border ${errorsStep2.height ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                  placeholder="Altura (cm)"
                />
                {errorsStep2.height && (
                  <p className="text-red-500 text-xs mt-1">{errorsStep2.height.message}</p>
                )}
              </div>
            </div>
            
            {/* Fila: Estado civil y Género */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Estado civil */}
              <div>
                <div className="relative">
                  <select
                    {...registerStep2("maritalStatus")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96] appearance-none pr-10"
                  >
                    <option value="">Estado civil</option>
                    <option value="soltero">Soltero/a</option>
                    <option value="casado">Casado/a</option>
                    <option value="divorciado">Divorciado/a</option>
                    <option value="viudo">Viudo/a</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Género */}
              <div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="masculino"
                      value="masculino"
                      {...registerStep2("gender")}
                      className="h-4 w-4 text-[#0E6B96] focus:ring-[#0E6B96]"
                    />
                    <label htmlFor="masculino" className="ml-2 text-sm text-gray-700">Masculino</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="femenino"
                      value="femenino"
                      {...registerStep2("gender")}
                      className="h-4 w-4 text-[#0E6B96] focus:ring-[#0E6B96]"
                    />
                    <label htmlFor="femenino" className="ml-2 text-sm text-gray-700">Femenino</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap -mx-2 mb-4">
              {/* Opción para incluir contacto de emergencia */}
              <div className="w-full px-2 mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeEmergencyContact"
                    {...registerStep2("includeEmergencyContact")}
                    className="h-4 w-4 text-[#0E6B96] focus:ring-[#0E6B96] mr-2"
                  />
                  <label htmlFor="includeEmergencyContact" className="font-semibold text-gray-700">
                    ¿Desea agregar un contacto de emergencia?
                  </label>
                </div>
              </div>
            </div>
            
            {/* Sección de contacto de emergencia (condicional) */}
            {watchIncludeEmergencyContact && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <h3 className="text-md font-semibold text-gray-700">Datos del contacto de emergencia</h3>
                </div>
                
                <div className="flex flex-wrap -mx-2">
                  {/* Nombre */}
                  <div className="w-1/3 px-2 mb-3">
                    <input
                      type="text"
                      {...registerStep2("emergencyContact.firstName")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                      placeholder="Nombre"
                    />
                  </div>
                  
                  {/* Apellido */}
                  <div className="w-1/3 px-2 mb-3">
                    <input
                      type="text"
                      {...registerStep2("emergencyContact.lastName")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                      placeholder="Apellido"
                    />
                  </div>
                  
                  {/* Teléfono */}
                  <div className="w-1/3 px-2 mb-3">
                    <input
                      type="text"
                      {...registerStep2("emergencyContact.phoneNumber")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                      placeholder="Teléfono"
                    />
                  </div>
                  
                  {/* Relación familiar */}
                  <div className="w-1/2 px-2 mb-3">
                    <input
                      type="text"
                      {...registerStep2("emergencyContact.familyRelationship")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                      placeholder="Relación familiar"
                    />
                  </div>
                  
                  {/* Ocupación */}
                  <div className="w-1/2 px-2 mb-3">
                    <input
                      type="text"
                      {...registerStep2("emergencyContact.occupation")}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                      placeholder="Ocupación"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Botón de registrar - pixel perfect según la imagen */}
            <button
              type="submit"
              className="w-full bg-[#0A3A4A] text-white py-3 px-4 rounded-lg hover:bg-[#0E6B96] transition duration-300 font-medium"
              disabled={loading}
            >
              {loading ? "Procesando..." : "Registrar"}
            </button>
          </form>
        )}
        
        {/* Indicadores de paso */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className={`h-2 w-2 rounded-full ${step === 1 ? 'bg-[#0E6B96]' : 'bg-gray-300'}`}></div>
          <div className={`h-2 w-2 rounded-full ${step === 2 ? 'bg-[#0E6B96]' : 'bg-gray-300'}`}></div>
        </div>
      </div>
      
      {/* Modal de verificación de código */}
      {showVerification && (
        <CodeVerificationModal 
          onVerify={handleCodeVerification}
          onClose={() => setShowVerification(false)}
        />
      )}
      
      {/* Modal de éxito */}
      {showSuccess && (
        <SuccessModal 
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
};

export default SignupPage;
