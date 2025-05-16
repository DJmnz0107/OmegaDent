// Controlador de servicios (CRUD)

import servicesModel from "../models/Services.js";

const servicesController = {};

// Obtiene todos los servicios
servicesController.getServices = async (req, res) => {
    try {
        const services = await servicesModel.find();
        return res.status(200).json(services);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener servicios", error: error.message });
    }
};

// Obtiene un servicio específico por su ID
servicesController.getServiceById = async (req, res) => {
    try {
        const service = await servicesModel.findById(req.params.id);
        
        if (!service) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        
        return res.status(200).json(service);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el servicio", error: error.message });
    }
};

// Crea un nuevo servicio
servicesController.createService = async (req, res) => {
    try {
        const { name, description, procedures } = req.body;

        // Verifica si ya existe un servicio con el mismo nombre
        const existingService = await servicesModel.findOne({ name });
        if (existingService) {
            return res.status(400).json({ message: "Ya existe un servicio con ese nombre" });
        }

        // Crea el nuevo servicio
        const newService = new servicesModel({ 
            name,
            description,
            procedures: procedures || []
        });
        
        await newService.save();
        
        return res.status(201).json({ 
            message: "Servicio creado con éxito",
            service: newService
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el servicio", error: error.message });
    }
};

// Actualiza un servicio existente por su ID
servicesController.updateService = async (req, res) => {
    try {
        const { name, description, procedures } = req.body;
        const serviceId = req.params.id;

        // Verifica si el servicio existe
        const service = await servicesModel.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }

        // Si se está actualizando el nombre, verifica que no exista ya
        if (name && name !== service.name) {
            const existingName = await servicesModel.findOne({ name });
            if (existingName) {
                return res.status(400).json({ message: "Ya existe un servicio con ese nombre" });
            }
        }

        // Actualiza el servicio
        const updatedService = await servicesModel.findByIdAndUpdate(
            serviceId,
            {
                name,
                description,
                procedures
            },
            { new: true }
        );
        
        return res.status(200).json({ 
            message: "Servicio actualizado con éxito",
            service: updatedService
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el servicio", error: error.message });
    }
};

// Elimina un servicio por su ID
servicesController.deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        
        // Verifica si el servicio existe
        const service = await servicesModel.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        
        // Elimina el servicio
        await servicesModel.findByIdAndDelete(serviceId);
        
        return res.status(200).json({ message: "Servicio eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el servicio", error: error.message });
    }
};

export default servicesController;
