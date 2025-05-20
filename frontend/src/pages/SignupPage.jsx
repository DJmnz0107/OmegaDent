import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeVerificationModal from '../components/CodeVerificationModal';
import SuccessModal from '../components/SuccessModal';

const SignupPage = () => {
  // Estados para manejar el formulario de registro paso a paso
  const [step, setStep] = useState(1); // 1: primer formulario, 2: segundo formulario
  const [showVerification, setShowVerification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [includeEmergencyContact, setIncludeEmergencyContact] = useState(false); // Estado para controlar si se incluye contacto de emergencia
  
  // Estado para almacenar los datos del formulario según el modelo de pacientes
  const [formData, setFormData] = useState({
    // Paso 1
    email: '',
    password: '',
    confirmPassword: '',
    
    // Paso 2
    name: '',             // Requerido
    lastname: '',         // Requerido
    dui: '',              // Documento Único de Identidad
    phoneNumber: '',      // Número de teléfono
    birthday: '',         // Fecha de nacimiento
    weight: '',           // Peso en kg
    height: '',           // Altura en cm
    maritalStatus: '',    // Estado civil (enum: ["soltero", "casado", "divorciado", "viudo"])
    gender: 'masculino',  // Género (enum: ["masculino", "femenino", "otro"])
    occupation: '',       // Profesión u ocupación
    // El número de expediente será asignado por el sistema
    address: '',          // Dirección
    
    // Contacto de emergencia
    emergencyContact: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      occupation: '',
      familyRelationship: ''
    }
  });
  
  // Estado para errores de validación
  const [errors, setErrors] = useState({});
  
  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    
    // Manejar checkbox para contacto de emergencia
    if (name === 'includeEmergencyContact') {
      setIncludeEmergencyContact(checked);
      
      // Si se desmarca, limpiar los datos de contacto de emergencia
      if (!checked) {
        setFormData({
          ...formData,
          emergencyContact: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            occupation: '',
            familyRelationship: ''
          }
        });
      }
      return;
    }
    
    // Manejo de campos anidados (emergencyContact)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      // Para campos simples
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Limpiar errores cuando el usuario corrige un campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validar el primer paso del formulario (email y contraseña)
  const validateFirstStep = () => {
    const newErrors = {};
    
    // Validar email
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    
    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Validar el segundo paso del formulario (datos personales)
  const validateSecondStep = () => {
    const newErrors = {};
    
    // Campos requeridos según el modelo
    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.lastname) {
      newErrors.lastname = 'El apellido es requerido';
    }
    
    // El número de expediente será asignado por el sistema, no se requiere validación
    
    // Validar DUI (formato típico: 00000000-0)
    if (formData.dui && !/^\d{8}-\d{1}$/.test(formData.dui)) {
      newErrors.dui = 'El DUI debe tener el formato 00000000-0';
    }
    
    // Validar teléfono (formato típico en El Salvador: 0000-0000)
    if (formData.phoneNumber && !/^\d{4}-\d{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'El teléfono debe tener el formato 0000-0000';
    }
    
    // Validar que el peso y la altura sean números
    if (formData.weight && isNaN(Number(formData.weight))) {
      newErrors.weight = 'El peso debe ser un número';
    }
    
    if (formData.height && isNaN(Number(formData.height))) {
      newErrors.height = 'La altura debe ser un número';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del primer paso del formulario
  const handleFirstStepSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos del primer paso
    if (!validateFirstStep()) {
      return;
    }
    
    // Avanzar al segundo paso
    setStep(2);
  };
  
  // Manejar envío del segundo paso del formulario
  const handleSecondStepSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos del segundo paso
    if (!validateSecondStep()) {
      return;
    }
    
    // Mostrar modal de verificación de código
    setShowVerification(true);
    
    // Aquí se enviaría la información al backend para crear el usuario
    console.log('Datos del formulario a enviar:', {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      lastname: formData.lastname,
      dui: formData.dui,
      phoneNumber: formData.phoneNumber,
      birthday: formData.birthday,
      weight: formData.weight,
      height: formData.height,
      maritalStatus: formData.maritalStatus,
      gender: formData.gender,
      occupation: formData.occupation,
      recordNumber: formData.recordNumber,
      address: formData.address,
      emergencyContact: formData.emergencyContact
    });
  };
  
  // Manejar la verificación del código
  const handleCodeVerification = () => {
    // Ocultar modal de verificación
    setShowVerification(false);
    // Mostrar modal de éxito
    setShowSuccess(true);
  };
  
  // Manejar cierre del modal de éxito
  const handleSuccessClose = () => {
    setShowSuccess(false);
    // Aquí se podría redirigir a otra página si es necesario
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
          <form onSubmit={handleFirstStepSubmit}>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                placeholder="Correo electrónico"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            
            {/* Contraseña */}
            <div className="mb-4 relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                placeholder="Contraseña"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            
            {/* Confirmar contraseña */}
            <div className="mb-6 relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                placeholder="Confirmar contraseña"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            
            {/* Botón de siguiente - pixel perfect según la imagen */}
            <button
              type="submit"
              className="w-full bg-[#0A3A4A] text-white py-3 px-4 rounded-lg hover:bg-[#0E6B96] transition duration-300 font-medium"
            >
              Siguiente
            </button>
          </form>
        ) : (
          // Paso 2: Formulario de información personal - pixel perfect según modelo de pacientes
          <form onSubmit={handleSecondStepSubmit}>
            {/* Nombre */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                placeholder="Nombre"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            
            {/* Apellido */}
            <div className="mb-4">
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.lastname ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                placeholder="Apellido"
                required
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
              )}
            </div>
            
            {/* Fila DUI y Teléfono */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* DUI */}
              <div>
                <input
                  type="text"
                  name="dui"
                  value={formData.dui}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.dui ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                  placeholder="DUI (00000000-0)"
                />
                {errors.dui && (
                  <p className="text-red-500 text-xs mt-1">{errors.dui}</p>
                )}
              </div>
              
              {/* Teléfono */}
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                  placeholder="Teléfono (0000-0000)"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                )}
              </div>
            </div>
            
            {/* Dirección */}
            <div className="mb-4">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
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
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                  placeholder="Fecha de nacimiento"
                />
              </div>
              
              {/* Profesión/Ocupación */}
              <div>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
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
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.weight ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                  placeholder="Peso (kg)"
                />
                {errors.weight && (
                  <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
                )}
              </div>
              
              {/* Altura */}
              <div>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.height ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]`}
                  placeholder="Altura (cm)"
                />
                {errors.height && (
                  <p className="text-red-500 text-xs mt-1">{errors.height}</p>
                )}
              </div>
            </div>
            
            {/* Fila: Estado civil y Género */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Estado civil */}
              <div>
                <div className="relative">
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
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
                      name="gender"
                      value="masculino"
                      checked={formData.gender === 'masculino'}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#0E6B96] focus:ring-[#0E6B96]"
                    />
                    <label htmlFor="masculino" className="ml-2 text-sm text-gray-700">Masculino</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="femenino"
                      name="gender"
                      value="femenino"
                      checked={formData.gender === 'femenino'}
                      onChange={handleChange}
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
                    name="includeEmergencyContact"
                    checked={includeEmergencyContact}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#0E6B96] focus:ring-[#0E6B96] mr-2"
                  />
                  <label htmlFor="includeEmergencyContact" className="font-semibold text-gray-700">
                    ¿Desea agregar un contacto de emergencia?
                  </label>
                </div>
              </div>
            </div>
            
            {/* Sección de contacto de emergencia (condicional) */}
            {includeEmergencyContact && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <h3 className="text-md font-semibold text-gray-700">Datos del contacto de emergencia</h3>
                </div>
                
                <div className="flex flex-wrap -mx-2">
                  {/* Nombre */}
                  <div className="w-1/3 px-2 mb-3">
                    <input
                      type="text"
                      name="emergencyContact.firstName"
                      value={formData.emergencyContact.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                      placeholder="Nombre"
                    />
                  </div>
                  
                  {/* Apellido */}
                  <div className="w-1/3 px-2 mb-3">
                    <input
                      type="text"
                      name="emergencyContact.lastName"
                      value={formData.emergencyContact.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                      placeholder="Apellido"
                    />
                  </div>
                  
                  {/* Teléfono */}
                  <div className="w-1/3 px-2 mb-3">
                    <input
                      type="text"
                      name="emergencyContact.phoneNumber"
                      value={formData.emergencyContact.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                      placeholder="Teléfono"
                    />
                  </div>
                  
                  {/* Relación familiar */}
                  <div className="w-1/2 px-2 mb-3">
                    <input
                      type="text"
                      name="emergencyContact.familyRelationship"
                      value={formData.emergencyContact.familyRelationship}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
                      placeholder="Relación familiar"
                    />
                  </div>
                  
                  {/* Ocupación */}
                  <div className="w-1/2 px-2 mb-3">
                    <input
                      type="text"
                      name="emergencyContact.occupation"
                      value={formData.emergencyContact.occupation}
                      onChange={handleChange}
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
            >
              Registrar
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
