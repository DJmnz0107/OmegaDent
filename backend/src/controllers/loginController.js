import doctorsModel from "../models/Doctors.js";
import patientsModel from "../models/Patients.js";
import assistantsModel from "../models/Assistants.js";
import adminsModel from "../models/Admins.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

/**
 * Control de autenticación para doctores, pacientes, asistentes y administradores
 * Objeto de solicitud Express
 * Objeto de respuesta Express
 * Respuesta JSON con mensaje y token JWT en caso de éxito
 */
loginController.login = async (req, res) => {
  const { email, password } = req.body;

  // Validación de campos requeridos
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan campos" });
  }

  try {
    let userFound;
    let userType;

    // Verificar si es el administrador usando las credenciales en el archivo de configuración
    if (email === config.admin.EMAIL && password === config.admin.PASSWORD) {
      userType = "administrador";
      userFound = { _id: "admin" };
    } else {
      // Buscar primero en la colección de doctores
      userFound = await doctorsModel.findOne({ email });
      if (userFound) {
        userType = "doctor";
        // Comparar las contraseñas
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Contraseña inválida" });
        }
      } else {
        // Si no es un doctor, buscar en la colección de asistentes
        userFound = await assistantsModel.findOne({ email });
        if (userFound) {
          userType = "asistente";
          // Comparar las contraseñas
          const isMatch = await bcrypt.compare(password, userFound.password);
          if (!isMatch) {
            return res.status(401).json({ message: "Contraseña inválida" });
          }
        } else {
          // Si no es un asistente, buscar en la colección de pacientes
          userFound = await patientsModel.findOne({ email });
          if (userFound) {
            // Verificar si el paciente ha verificado su cuenta
            if (!userFound.isVerified) {
              return res.status(401).json({ 
                message: "Cuenta no verificada. Por favor, verifica tu correo electrónico",
                needsVerification: true
              });
            }
            
            userType = "paciente";
            // Comparar las contraseñas
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) {
              return res.status(401).json({ message: "Contraseña inválida" });
            }
          } else {
            // Si no es un paciente, buscar en la colección de administradores
            userFound = await adminsModel.findOne({ email });
            if (userFound) {
              userType = "administrador";
              // Comparar las contraseñas
              const isMatch = await bcrypt.compare(password, userFound.password);
              if (!isMatch) {
                return res.status(401).json({ message: "Contraseña inválida" });
              }
            }
          }
        }
      }
    }

    // Si no se encuentra el usuario en ninguna colección, devolver error
    if (!userFound) {
      console.log("Usuario no encontrado en ninguna colección");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generar y enviar el token JWT
    JWT.sign(
      {
        id: userFound._id,
        userType,
      },
      config.JWT.SECRET,
      {
        expiresIn: config.JWT.EXPIRES,
      },
      (error, token) => {
        if (error) {
          console.error("Error al generar token JWT:", error);
          return res.status(500).json({ message: "Error al generar el token" });
        }

        // Guardar el token en una cookie HTTP-only por seguridad
        res.cookie("authToken", token, { 
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Solo enviar por HTTPS en producción
          maxAge: 24 * 60 * 60 * 1000 // 24 horas en milisegundos
        });
        
        // Devolver el token también en el cuerpo de la respuesta para clientes móviles
        res.json({ 
          message: `Inicio de sesión exitoso como ${userType}`, 
          token,
          userType 
        });
      }
    );
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

export default loginController;