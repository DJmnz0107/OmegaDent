import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config.js";
import patientsModel from "../models/Patients.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const registerPatientsController = {};

// CREATE: Registrar un nuevo paciente y enviar código de verificación por correo
registerPatientsController.register = async (req, res) => {
  const {
    name,
    lastname,
    email,
    password,
    birthday,
    address,
    phoneNumber,
    weight,
    height,
    maritalStatus,
    dui,
    recordNumber,
    gender,
    occupation,
    emergencyContact
  } = req.body;

  // Validación de campos requeridos
  if (!name || !lastname || !email || !password || !recordNumber) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    // Verificar si el paciente ya existe por email o recordNumber
    const existingPatient = await patientsModel.findOne({ $or: [{ email }, { recordNumber }] });

    if (existingPatient) {
      return res.status(409).json({ message: "Ya existe un paciente con este email o número de registro" });
    }

    // Generar hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear el nuevo paciente
    const newPatient = new patientsModel({
      name,
      lastname,
      email,
      password: passwordHash,
      photo: req.body.photo || "",
      birthday: birthday || null,
      address: address || "",
      phoneNumber: phoneNumber || "",
      weight: weight || null,
      height: height || null,
      maritalStatus: maritalStatus || null,
      dui: dui || "",
      recordNumber,
      gender: gender || null,
      occupation: occupation || "",
      emergencyContact: emergencyContact || null,
      status: "activo",
      isVerified: false
    });

    // Guardar el paciente en la base de datos
    await newPatient.save();

    // Generar código de verificación
    const verificationCode = crypto.randomBytes(3).toString("hex"); // Código de 6 caracteres
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 horas

    // Crear JWT con el código de verificación
    const tokenCode = jwt.sign(
      {
        email,
        verificationCode,
        expiresAt,
      },
      config.JWT.SECRET,
      { expiresIn: "2h" }
    );

    // Guardar el token en una cookie
    res.cookie("verificationToken", tokenCode, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000, // 2 horas
    });

    // Configurar el transportador de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.EMAIL,
        pass: config.email.PASSWORD,
      },
    });

    // Configurar las opciones del correo
    const mailOptions = {
      from: config.email.EMAIL,
      to: email,
      subject: "Verificación de correo - OmegaDent",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
          <h2 style="color: #4a90e2;">Bienvenido/a a OmegaDent</h2>
          <p>Gracias por registrarte en nuestra clínica dental.</p>
          <p>Para verificar tu cuenta, utiliza el siguiente código:</p>
          <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 15px 0;">
            ${verificationCode}
          </div>
          <p>Este código expirará en 2 horas.</p>
          <p>Si no has solicitado este registro, por favor ignora este correo.</p>
          <p>Saludos,<br>El equipo de OmegaDent</p>
        </div>
      `,
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error al enviar correo:", err);
        return res.status(500).json({ message: "Error al enviar correo de verificación" });
      }
      console.log("Correo enviado:", info.response);
    });

    // Responder con éxito
    res.status(201).json({
      message: "Paciente registrado. Por favor verifica tu correo con el código enviado.",
      token: tokenCode,
      patientId: newPatient._id
    });
  } catch (error) {
    console.error("Error en registro de paciente:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// Verificar el correo electrónico con el código enviado
registerPatientsController.verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;
  const token = req.cookies.verificationToken || req.body.token; // Obtener de cookie o body

  if (!token) {
    return res.status(400).json({ message: "No se proporcionó token de verificación" });
  }

  try {
    // Verificar y decodificar el JWT
    const decoded = jwt.verify(token, config.JWT.SECRET);
    const { email, verificationCode: storedCode, expiresAt } = decoded;

    // Verificar si el código ha expirado
    if (Date.now() > expiresAt) {
      return res.status(400).json({ message: "El código de verificación ha expirado" });
    }

    // Comparar el código recibido con el almacenado
    if (verificationCode !== storedCode) {
      return res.status(400).json({ message: "Código de verificación inválido" });
    }

    // Buscar y actualizar el paciente
    const patient = await patientsModel.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    // Marcar como verificado
    patient.isVerified = true;
    await patient.save();

    // Limpiar la cookie de verificación
    res.clearCookie("verificationToken");

    // Generar token de autenticación (login automático)
    jwt.sign(
      {
        id: patient._id,
        userType: "paciente",
      },
      config.JWT.SECRET,
      {
        expiresIn: config.JWT.EXPIRES,
      },
      (error, authToken) => {
        if (error) {
          console.error("Error al generar token JWT:", error);
          return res.status(500).json({ message: "Error al generar el token de autenticación" });
        }

        // Guardar el token en una cookie
        res.cookie("authToken", authToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production"
        });

        // Responder con éxito
        res.status(200).json({
          message: "Correo verificado correctamente. Has iniciado sesión automáticamente",
          token: authToken,
          userType: "paciente"
        });
      }
    );
  } catch (error) {
    console.error("Error al verificar email:", error);
    res.status(500).json({
      message: "Error al verificar el correo",
      error: error.message
    });
  }
};

export default registerPatientsController;
