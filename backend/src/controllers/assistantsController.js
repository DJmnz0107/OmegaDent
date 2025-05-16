// Controlador de asistentes (CRUD)

import assistantsModel from "../models/Assistants.js";
import bcrypt from "bcryptjs"; // Para encriptar contraseñas

const assistantsController = {};

// Obtiene todos los asistentes
assistantsController.getAssistants = async (req, res) => {
    try {
        // Busca todos los asistentes pero excluye el campo password por seguridad
        const assistants = await assistantsModel.find({}, { password: 0 });
        return res.status(200).json(assistants);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener asistentes", error: error.message });
    }
};

// Obtiene un asistente específico por su ID
assistantsController.getAssistantById = async (req, res) => {
    try {
        const assistant = await assistantsModel.findById(req.params.id, { password: 0 });
        
        if (!assistant) {
            return res.status(404).json({ message: "Asistente no encontrado" });
        }
        
        return res.status(200).json(assistant);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el asistente", error: error.message });
    }
};

// Crea un nuevo asistente
assistantsController.createAssistant = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica si el email ya existe
        const existingAssistant = await assistantsModel.findOne({ email });
        if (existingAssistant) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Encripta la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crea el nuevo asistente con la contraseña encriptada
        const newAssistant = new assistantsModel({ 
            email, 
            password: hashedPassword
        });
        
        await newAssistant.save();
        
        // Retorna respuesta exitosa sin incluir la contraseña
        return res.status(201).json({ 
            message: "Asistente creado con éxito",
            assistant: {
                _id: newAssistant._id,
                email: newAssistant.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el asistente", error: error.message });
    }
};

// Actualiza un asistente existente por su ID
assistantsController.updateAssistant = async (req, res) => {
    try {
        const { email, password } = req.body;
        const assistantId = req.params.id;

        // Verifica si el asistente existe
        const assistant = await assistantsModel.findById(assistantId);
        if (!assistant) {
            return res.status(404).json({ message: "Asistente no encontrado" });
        }

        // Si se está actualizando el email, verifica que no exista ya
        if (email && email !== assistant.email) {
            const existingEmail = await assistantsModel.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "El email ya está en uso" });
            }
        }

        // Prepara el objeto con los datos a actualizar
        const updateData = {};
        if (email) updateData.email = email;

        // Si se proporciona nueva contraseña, encriptarla
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Actualiza el asistente
        const updatedAssistant = await assistantsModel.findByIdAndUpdate(
            assistantId,
            updateData,
            { new: true }
        ).select('-password'); // Excluye la contraseña de la respuesta
        
        return res.status(200).json({ 
            message: "Asistente actualizado con éxito",
            assistant: updatedAssistant
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el asistente", error: error.message });
    }
};

// Elimina un asistente por su ID
assistantsController.deleteAssistant = async (req, res) => {
    try {
        const assistantId = req.params.id;
        
        // Verifica si el asistente existe
        const assistant = await assistantsModel.findById(assistantId);
        if (!assistant) {
            return res.status(404).json({ message: "Asistente no encontrado" });
        }
        
        // Elimina el asistente
        await assistantsModel.findByIdAndDelete(assistantId);
        
        return res.status(200).json({ message: "Asistente eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el asistente", error: error.message });
    }
};

export default assistantsController;
