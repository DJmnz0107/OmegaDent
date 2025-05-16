// Controlador de doctores (CRUD)

import doctorsModel from "../models/Doctors.js";
import bcrypt from "bcryptjs"; // Para encriptar contraseñas

const doctorsController = {};

// Obtiene todos los doctores
doctorsController.getDoctors = async (req, res) => {
    try {
        const doctors = await doctorsModel.find({}, { password: 0 }); // Excluye el campo password
        return res.status(200).json(doctors);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener doctores", error: error.message });
    }
};

// Obtiene un doctor específico por su ID
doctorsController.getDoctorById = async (req, res) => {
    try {
        const doctor = await doctorsModel.findById(req.params.id, { password: 0 }); // Excluye el campo password
        
        if (!doctor) {
            return res.status(404).json({ message: "Doctor no encontrado" });
        }
        
        return res.status(200).json(doctor);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el doctor", error: error.message });
    }
};

// Crea un nuevo doctor
doctorsController.createDoctor = async (req, res) => {
    try {
        const { 
            name, lastName, email, password, dui, birthDate, specialty, 
            phoneNumber 
        } = req.body;

        // Verifica si el DUI ya existe (si se proporciona)
        if (dui) {
            const existingDoctor = await doctorsModel.findOne({ dui });
            if (existingDoctor) {
                return res.status(400).json({ message: "El DUI ya está registrado" });
            }
        }

        // Verifica si el email ya existe
        const existingEmail = await doctorsModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Encripta la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crea el nuevo doctor
        const newDoctor = new doctorsModel({ 
            name, lastName, email, password: hashedPassword, dui, birthDate, specialty, 
            phoneNumber
        });
        
        await newDoctor.save();
        
        // Excluye la contraseña en la respuesta
        const doctorResponse = newDoctor.toObject();
        delete doctorResponse.password;
        
        return res.status(201).json({ 
            message: "Doctor creado con éxito",
            doctor: doctorResponse
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el doctor", error: error.message });
    }
};

// Actualiza un doctor existente por su ID
doctorsController.updateDoctor = async (req, res) => {
    try {
        const { 
            name, lastName, email, password, dui, birthDate, specialty, 
            phoneNumber 
        } = req.body;
        const doctorId = req.params.id;

        // Verifica si el doctor existe
        const doctor = await doctorsModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor no encontrado" });
        }

        // Si se actualiza el DUI, verifica que no exista ya
        if (dui && dui !== doctor.dui) {
            const existingDUI = await doctorsModel.findOne({ dui });
            if (existingDUI) {
                return res.status(400).json({ message: "El DUI ya está en uso por otro doctor" });
            }
        }

        // Si se actualiza el email, verifica que no exista ya
        if (email && email !== doctor.email) {
            const existingEmail = await doctorsModel.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "El email ya está en uso" });
            }
        }

        // Prepara el objeto con los datos a actualizar
        const updateData = {
            name, lastName, email, dui, birthDate, specialty, 
            phoneNumber
        };

        // Si se proporciona una nueva contraseña, encriptarla
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Actualiza el doctor
        const updatedDoctor = await doctorsModel.findByIdAndUpdate(
            doctorId,
            updateData,
            { new: true }
        ).select('-password'); // Excluye la contraseña de la respuesta
        
        return res.status(200).json({ 
            message: "Doctor actualizado con éxito",
            doctor: updatedDoctor
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el doctor", error: error.message });
    }
};

// Elimina un doctor por su ID
doctorsController.deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        
        // Verifica si el doctor existe
        const doctor = await doctorsModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor no encontrado" });
        }
        
        // Elimina el doctor
        await doctorsModel.findByIdAndDelete(doctorId);
        
        return res.status(200).json({ message: "Doctor eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el doctor", error: error.message });
    }
};

export default doctorsController;
