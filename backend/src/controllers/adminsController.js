// Controlador de administradores (CRUD)

import adminsModel from "../models/Admins.js";
import bcrypt from "bcryptjs"; // Para encriptar contraseñas

const adminsController = {};

// Obtiene todos los administradores
adminsController.getAdmins = async (req, res) => {
    try {
        // Busca todos los administradores pero excluye el campo password por seguridad
        const admins = await adminsModel.find({}, { password: 0 });
        return res.status(200).json(admins);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener administradores", error: error.message });
    }
};

// Obtiene un administrador específico por su ID
adminsController.getAdminById = async (req, res) => {
    try {
        const admin = await adminsModel.findById(req.params.id, { password: 0 });
        
        if (!admin) {
            return res.status(404).json({ message: "Administrador no encontrado" });
        }
        
        return res.status(200).json(admin);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el administrador", error: error.message });
    }
};

// Crea un nuevo administrador
adminsController.createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica si el email ya existe
        const existingAdmin = await adminsModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Encripta la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crea el nuevo administrador con la contraseña encriptada
        const newAdmin = new adminsModel({ 
            email, 
            password: hashedPassword
        });
        
        await newAdmin.save();
        
        // Retorna respuesta exitosa sin incluir la contraseña
        return res.status(201).json({ 
            message: "Administrador creado con éxito",
            admin: {
                _id: newAdmin._id,
                email: newAdmin.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el administrador", error: error.message });
    }
};

// Actualiza un administrador existente por su ID
adminsController.updateAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminId = req.params.id;

        // Verifica si el administrador existe
        const admin = await adminsModel.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Administrador no encontrado" });
        }

        // Si se está actualizando el email, verifica que no exista ya
        if (email && email !== admin.email) {
            const existingEmail = await adminsModel.findOne({ email });
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

        // Actualiza el administrador
        const updatedAdmin = await adminsModel.findByIdAndUpdate(
            adminId,
            updateData,
            { new: true }
        ).select('-password'); // Excluye la contraseña de la respuesta
        
        return res.status(200).json({ 
            message: "Administrador actualizado con éxito",
            admin: updatedAdmin
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el administrador", error: error.message });
    }
};

// Elimina un administrador por su ID
adminsController.deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        
        // Verifica si el administrador existe
        const admin = await adminsModel.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Administrador no encontrado" });
        }
        
        // Elimina el administrador
        await adminsModel.findByIdAndDelete(adminId);
        
        return res.status(200).json({ message: "Administrador eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el administrador", error: error.message });
    }
};

export default adminsController;
