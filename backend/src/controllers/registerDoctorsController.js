import bcrypt from "bcryptjs";
import doctorsModel from "../models/Doctors.js";

const registerDoctorsController = {};

/**
 * Registrar un nuevo doctor en el sistema
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @returns {Object} - Respuesta JSON con mensaje de éxito o error
 */
registerDoctorsController.register = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const {
    name,
    lastName,
    email,
    password,
    dui,
    birthDate,
    specialty,
    phoneNumber
  } = req.body;

  // Validar campos requeridos
  if (!name || !lastName || !email || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    // Verificar si ya existe un doctor con el mismo correo
    const existingDoctor = await doctorsModel.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({ message: "Ya existe un doctor con este correo electrónico" });
    }

    // Verificar si ya existe un doctor con el mismo DUI (si se proporcionó)
    if (dui) {
      const doctorWithDui = await doctorsModel.findOne({ dui });
      if (doctorWithDui) {
        return res.status(409).json({ message: "Ya existe un doctor con este DUI" });
      }
    }

    // Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear el nuevo doctor
    const newDoctor = new doctorsModel({
      name,
      lastName,
      email,
      password: passwordHash,
      dui: dui || "",
      birthDate: birthDate || null,
      specialty: specialty || "",
      phoneNumber: phoneNumber || ""
    });

    // Guardar el doctor en la base de datos
    const savedDoctor = await newDoctor.save();

    // Responder con éxito, sin incluir la contraseña en la respuesta
    const doctorResponse = {
      _id: savedDoctor._id,
      name: savedDoctor.name,
      lastName: savedDoctor.lastName,
      email: savedDoctor.email,
      specialty: savedDoctor.specialty,
      createdAt: savedDoctor.createdAt
    };

    res.status(201).json({
      message: "Doctor registrado exitosamente",
      doctor: doctorResponse
    });
  } catch (error) {
    console.error("Error al registrar doctor:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

export default registerDoctorsController;
