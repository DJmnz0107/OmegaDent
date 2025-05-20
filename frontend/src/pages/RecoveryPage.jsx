import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RecoveryPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [currentStep] = useState(1);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar el correo electrónico
    if (!email) {
      alert('Por favor ingresa tu correo electrónico');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Por favor ingresa un correo electrónico válido');
      return;
    }
    
    // Aquí implementaremos la lógica para enviar el correo de recuperación
    console.log('Solicitud de recuperación para:', email);
    
    // Simular envío y navegar a la página de verificación de código
    navigate('/verify-code');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A3E59] to-[#19CEB3]">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Confirma tu correo electrónico</h2>
          <p className="text-gray-600 mt-2">
            Ingresa tu correo electrónico para recuperar tu contraseña.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de correo electrónico */}
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0E6B96]"
              placeholder="Correo Electrónico"
              required
            />
          </div>

          {/* Botón de confirmar */}
          <button
            type="submit"
            className="w-full bg-[#0A3A4A] text-white py-3 px-4 rounded-lg hover:bg-[#0E6B96] transition duration-300 font-medium"
          >
            Confirmar
          </button>

          {/* Indicador de pasos */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className={`h-2 w-2 rounded-full ${currentStep === 1 ? 'bg-[#0A3A4A]' : 'bg-gray-300'}`}></div>
            <div className={`h-2 w-2 rounded-full ${currentStep === 2 ? 'bg-[#0A3A4A]' : 'bg-gray-300'}`}></div>
            <div className={`h-2 w-2 rounded-full ${currentStep === 3 ? 'bg-[#0A3A4A]' : 'bg-gray-300'}`}></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPage;
