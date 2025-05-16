// Controlador de pacientes (CRUD)

import patientsModel from "../models/Patients.js";
import bcrypt from "bcryptjs"; // Para encriptar contraseñas

const patientsController = {};

// Obtiene todos los pacientes
patientsController.getPatients = async (req, res) => {
    try {
        const patients = await patientsModel.find({}, { password: 0 }); // Excluye el campo password
        return res.status(200).json(patients);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener pacientes", error: error.message });
    }
};

// Obtiene un paciente específico por su ID
patientsController.getPatientById = async (req, res) => {
    try {
        const patient = await patientsModel.findById(req.params.id, { password: 0 }); // Excluye el campo password
        
        if (!patient) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        
        return res.status(200).json(patient);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el paciente", error: error.message });
    }
};

// Crea un nuevo paciente
patientsController.createPatient = async (req, res) => {
    try {
        const { 
            name, lastname, email, password, isVerified, photo, birthday, address, phoneNumber, 
            weight, height, maritalStatus, dui, recordNumber, 
            gender, occupation, emergencyContact, status 
        } = req.body;

        // Verifica si el número de expediente ya existe
        const existingPatient = await patientsModel.findOne({ recordNumber });
        if (existingPatient) {
            return res.status(400).json({ message: "El número de expediente ya está registrado" });
        }

        // Verifica si el email ya existe
        const existingEmail = await patientsModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Encripta la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crea el nuevo paciente
        const newPatient = new patientsModel({ 
            name, lastname, email, password: hashedPassword, isVerified: isVerified || false, 
            photo, birthday, address, phoneNumber, 
            weight, height, maritalStatus, dui, recordNumber, 
            gender, occupation, emergencyContact, status 
        });
        
        await newPatient.save();
        
        // Excluye la contraseña en la respuesta
        const patientResponse = newPatient.toObject();
        delete patientResponse.password;
        
        return res.status(201).json({ 
            message: "Paciente creado con éxito",
            patient: patientResponse
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el paciente", error: error.message });
    }
};

// Actualiza un paciente existente por su ID
patientsController.updatePatient = async (req, res) => {
    try {
        const { 
            name, lastname, email, password, isVerified, photo, birthday, address, phoneNumber, 
            weight, height, maritalStatus, dui, recordNumber, 
            gender, occupation, emergencyContact, status 
        } = req.body;
        const patientId = req.params.id;

        // Verifica si el paciente existe
        const patient = await patientsModel.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        // Si se actualiza el número de expediente, verifica que no exista ya
        if (recordNumber && recordNumber !== patient.recordNumber) {
            const existingRecordNumber = await patientsModel.findOne({ recordNumber });
            if (existingRecordNumber) {
                return res.status(400).json({ message: "El número de expediente ya está en uso" });
            }
        }

        // Si se actualiza el email, verifica que no exista ya
        if (email && email !== patient.email) {
            const existingEmail = await patientsModel.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "El email ya está en uso" });
            }
        }

        // Prepara el objeto con los datos a actualizar
        const updateData = {
            name, lastname, email, photo, birthday, address, phoneNumber, 
            weight, height, maritalStatus, dui, recordNumber, 
            gender, occupation, emergencyContact, status
        };

        // Si se proporciona una nueva contraseña, encriptarla
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Si se proporciona el estado de verificación, actualizarlo
        if (isVerified !== undefined) {
            updateData.isVerified = isVerified;
        }

        // Actualiza el paciente
        const updatedPatient = await patientsModel.findByIdAndUpdate(
            patientId,
            updateData,
            { new: true }
        ).select('-password'); // Excluye la contraseña de la respuesta
        
        return res.status(200).json({ 
            message: "Paciente actualizado con éxito",
            patient: updatedPatient
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el paciente", error: error.message });
    }
};

// Elimina un paciente por su ID
patientsController.deletePatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        
        // Verifica si el paciente existe
        const patient = await patientsModel.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        
        // Elimina el paciente
        await patientsModel.findByIdAndDelete(patientId);
        
        return res.status(200).json({ message: "Paciente eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el paciente", error: error.message });
    }
};

export default patientsController;
