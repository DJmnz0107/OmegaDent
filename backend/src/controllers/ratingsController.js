// Controlador de calificaciones (CRUD)

import ratingsModel from "../models/Ratings.js";
import appointmentsModel from "../models/Appointments.js";
import patientsModel from "../models/Patients.js";

const ratingsController = {};

// Obtiene todas las calificaciones
ratingsController.getRatings = async (req, res) => {
    try {
        const ratings = await ratingsModel.find()
            .populate('user_id', 'name lastname')
            .populate({
                path: 'appointment_id',
                select: 'appointment_date appointment_time',
                populate: [
                    { path: 'doctor_id', select: 'name lastName' },
                    { path: 'service_id', select: 'name' }
                ]
            });
        
        return res.status(200).json(ratings);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener calificaciones", error: error.message });
    }
};

// Obtiene una calificación específica por su ID
ratingsController.getRatingById = async (req, res) => {
    try {
        const rating = await ratingsModel.findById(req.params.id)
            .populate('user_id', 'name lastname')
            .populate({
                path: 'appointment_id',
                select: 'appointment_date appointment_time',
                populate: [
                    { path: 'doctor_id', select: 'name lastName' },
                    { path: 'service_id', select: 'name' }
                ]
            });
        
        if (!rating) {
            return res.status(404).json({ message: "Calificación no encontrada" });
        }
        
        return res.status(200).json(rating);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener la calificación", error: error.message });
    }
};

// Obtiene calificaciones por usuario (paciente)
ratingsController.getRatingsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Verificar si el paciente existe
        const patientExists = await patientsModel.exists({ _id: userId });
        if (!patientExists) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        
        // Buscar calificaciones del paciente
        const ratings = await ratingsModel.find({ user_id: userId })
        .populate({
            path: 'appointment_id',
            select: 'appointment_date appointment_time',
            populate: [
                { path: 'doctor_id', select: 'name lastName' },
                { path: 'service_id', select: 'name' }
            ]
        });
            
        return res.status(200).json(ratings);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las calificaciones del paciente", error: error.message });
    }
};

// Obtiene calificaciones por cita
ratingsController.getRatingsByAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        
        // Verificar si la cita existe
        const appointmentExists = await appointmentsModel.exists({ _id: appointmentId });
        if (!appointmentExists) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        
        // Buscar calificaciones de la cita
        const ratings = await ratingsModel.find({ appointment_id: appointmentId })
            .populate({
                path: 'user_id',
                select: 'name lastname',
            });
            
        return res.status(200).json(ratings);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las calificaciones de la cita", error: error.message });
    }
};

// Crea una nueva calificación
ratingsController.createRating = async (req, res) => {
    try {
        const { 
            user_id, 
            appointment_id, 
            rating_score,
            comment
        } = req.body;

        // Validación de campos requeridos
        if (!user_id || !appointment_id || !rating_score) {
            return res.status(400).json({ 
                message: "El ID de usuario, ID de cita y puntuación son campos obligatorios" 
            });
        }

        // Validar puntuación entre 1 y 5
        if (rating_score < 1 || rating_score > 5) {
            return res.status(400).json({ message: "La puntuación debe estar entre 1 y 5" });
        }

        // Verificar si el paciente existe
        const patientExists = await patientsModel.exists({ _id: user_id });
        if (!patientExists) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        // Verificar si la cita existe
        const appointment = await appointmentsModel.findById(appointment_id);
        if (!appointment) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }

        // Verificar si la cita está finalizada
        if (appointment.appointment_status !== "finalizada" && appointment.appointment_status !== "completada") {
            return res.status(400).json({ message: "Solo se pueden calificar citas finalizadas" });
        }

        // Verificar si ya existe una calificación para esta cita por este usuario
        const existingRating = await ratingsModel.findOne({
            appointment_id,
            user_id
        });

        // Si ya existe una calificación, la actualizamos en lugar de crear una nueva
        if (existingRating) {
            existingRating.rating_score = rating_score;
            existingRating.comment = comment;
            
            await existingRating.save();
            
            // Poblar datos relacionados para la respuesta
            const updatedRating = await ratingsModel.findById(existingRating._id)
                .populate('user_id', 'name lastname')
                .populate({
                    path: 'appointment_id',
                    select: 'appointment_date appointment_time',
                    populate: [
                        { path: 'doctor_id', select: 'name lastName' },
                        { path: 'service_id', select: 'name' }
                    ]
                });
            
            return res.status(200).json({ 
                message: "Calificación actualizada con éxito",
                rating: updatedRating
            });
        }

        // Crear nueva calificación
        const newRating = new ratingsModel({
            user_id,
            appointment_id,
            rating_score,
            comment
        });

        await newRating.save();
        
        // Poblar datos relacionados para la respuesta
        const savedRating = await ratingsModel.findById(newRating._id)
            .populate('user_id', 'name lastname')
            .populate({
                path: 'appointment_id',
                select: 'appointment_date appointment_time',
                populate: [
                    { path: 'doctor_id', select: 'name lastName' },
                    { path: 'service_id', select: 'name' }
                ]
            });
        
        return res.status(201).json({ 
            message: "Calificación creada con éxito",
            rating: savedRating
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear la calificación", error: error.message });
    }
};

// Actualiza una calificación existente por su ID
ratingsController.updateRating = async (req, res) => {
    try {
        const ratingId = req.params.id;
        const { rating_score, comment } = req.body;
        
        // Verificar si la calificación existe
        const rating = await ratingsModel.findById(ratingId);
        if (!rating) {
            return res.status(404).json({ message: "Calificación no encontrada" });
        }
        
        // Validar que el usuario que actualiza sea el mismo que creó la calificación
        // Esta validación debería hacerse con el token del usuario autenticado
        // Por ahora, lo dejamos como comentario ya que no tenemos acceso al usuario autenticado
        // if (rating.user_id.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: "No tienes permiso para actualizar esta calificación" });
        // }
        
        // Validar puntuación entre 1 y 5 si se proporciona
        if (rating_score && (rating_score < 1 || rating_score > 5)) {
            return res.status(400).json({ message: "La puntuación debe estar entre 1 y 5" });
        }
        
        // Actualizar solo los campos proporcionados
        if (rating_score) rating.rating_score = rating_score;
        if (comment !== undefined) rating.comment = comment;
        
        await rating.save();
        
        // Poblar datos relacionados para la respuesta
        const updatedRating = await ratingsModel.findById(ratingId)
            .populate('user_id', 'name lastname')
            .populate({
                path: 'appointment_id',
                select: 'appointment_date appointment_time',
                populate: [
                    { path: 'doctor_id', select: 'name lastName' },
                    { path: 'service_id', select: 'name' }
                ]
            });
        
        return res.status(200).json({ 
            message: "Calificación actualizada con éxito",
            rating: updatedRating
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la calificación", error: error.message });
    }
};

// Elimina una calificación por su ID
ratingsController.deleteRating = async (req, res) => {
    try {
        const ratingId = req.params.id;
        
        // Verificar si la calificación existe
        const rating = await ratingsModel.findById(ratingId);
        if (!rating) {
            return res.status(404).json({ message: "Calificación no encontrada" });
        }
        
        // Validar que el usuario que elimina sea el mismo que creó la calificación
        // Esta validación debería hacerse con el token del usuario autenticado
        // Por ahora, lo dejamos como comentario ya que no tenemos acceso al usuario autenticado
        // if (rating.user_id.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: "No tienes permiso para eliminar esta calificación" });
        // }
        
        // Eliminar la calificación
        await ratingsModel.findByIdAndDelete(ratingId);
        
        return res.status(200).json({ message: "Calificación eliminada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la calificación", error: error.message });
    }
};

export default ratingsController;
