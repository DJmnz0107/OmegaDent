import JWT from "jsonwebtoken";
import { config } from "../config.js";
import doctorsModel from "../models/Doctors.js";
import patientsModel from "../models/Patients.js";
import assistantsModel from "../models/Assistants.js";
import adminsModel from "../models/Admins.js";

/**
 * Middleware para verificar la autenticación mediante token JWT
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función para continuar al siguiente middleware
 */
export const verifyToken = (req, res, next) => {
  // Obtener el token de la cookie o del encabezado Authorization
  const token = req.cookies.authToken || 
               (req.headers.authorization && req.headers.authorization.startsWith("Bearer ") 
               ? req.headers.authorization.split(" ")[1] : null);

  // Si no hay token, retornar error
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó token de autenticación" });
  }

  try {
    // Verificar el token con la clave secreta
    const decoded = JWT.verify(token, config.JWT.SECRET);
    
    // Adjuntar la información del usuario decodificada a la solicitud
    req.user = decoded;
    
    // Continuar con la siguiente función
    next();
  } catch (error) {
    console.error("Error en verificación de token:", error);
    
    // Si el token expiró o es inválido
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado. Por favor, inicie sesión nuevamente" });
    }
    
    return res.status(401).json({ message: "Token inválido" });
  }
};

/**
 * Middleware para verificar que el usuario tenga el rol requerido
 * @param {Array} allowedRoles - Array de roles permitidos para acceder a la ruta
 * @returns {Function} - Middleware que verifica el rol del usuario
 */
export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // Verificar que exista información de usuario (middleware verifyToken debe ejecutarse primero)
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    // Verificar si el rol del usuario está entre los roles permitidos
    if (allowedRoles.includes(req.user.userType)) {
      return next();
    }

    // Si el rol no está permitido, devolver error
    return res.status(403).json({ 
      message: "No tiene permisos para acceder a este recurso" 
    });
  };
};

/**
 * Middleware para verificar que el usuario existe en la base de datos
 * Útil después de verificar el token para asegurar que el usuario sigue existiendo
 */
export const userExists = async (req, res, next) => {
  try {
    // Omitir esta verificación para el administrador
    if (req.user.id === "admin") {
      return next();
    }
    
    let userFound = null;
    
    // Buscar el usuario según su tipo
    switch(req.user.userType) {
      case "doctor":
        userFound = await doctorsModel.findById(req.user.id);
        break;
      case "paciente":
        userFound = await patientsModel.findById(req.user.id);
        break;
      case "asistente":
        userFound = await assistantsModel.findById(req.user.id);
        break;
      case "administrador":
        userFound = await adminsModel.findById(req.user.id);
        break;
      default:
        return res.status(400).json({ message: "Tipo de usuario inválido" });
    }
    
    // Si el usuario no existe, retornar error
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    // Adjuntar el usuario completo a la solicitud (opcional)
    req.dbUser = userFound;
    
    // Continuar con la siguiente función
    next();
  } catch (error) {
    console.error("Error al verificar existencia de usuario:", error);
    return res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};
