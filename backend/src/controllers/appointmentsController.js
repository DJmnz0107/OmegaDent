// Controlador de citas (CRUD)

import appointmentsModel from "../models/Appointments.js";
import patientsModel from "../models/Patients.js";
import doctorsModel from "../models/Doctors.js";
import servicesModel from "../models/Services.js";

const appointmentsController = {};

// Obtiene todas las citas
appointmentsController.getAppointments = async (req, res) => {
    try {
        const appointments = await appointmentsModel.find()
            .populate('patient_id', 'name lastname recordNumber')
            .populate('doctor_id', 'name lastName specialty')
            .populate('service_id', 'name');
        
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener citas", error: error.message });
    }
};

// Obtiene una cita específica por su ID
appointmentsController.getAppointmentById = async (req, res) => {
    try {
        const appointment = await appointmentsModel.findById(req.params.id)
            .populate('patient_id', 'name lastname recordNumber')
            .populate('doctor_id', 'name lastName specialty')
            .populate('service_id', 'name');
        
        if (!appointment) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        
        return res.status(200).json(appointment);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener la cita", error: error.message });
    }
};

// Obtiene todas las citas de un paciente específico
appointmentsController.getAppointmentsByPatient = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        
        // Verifica si el paciente existe
        const patientExists = await patientsModel.exists({ _id: patientId });
        if (!patientExists) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        
        const appointments = await appointmentsModel.find({ patient_id: patientId })
            .populate('doctor_id', 'name lastName specialty')
            .populate('service_id', 'name');
            
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las citas del paciente", error: error.message });
    }
};

// Obtiene todas las citas de un doctor específico
appointmentsController.getAppointmentsByDoctor = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        
        // Verifica si el doctor existe
        const doctorExists = await doctorsModel.exists({ _id: doctorId });
        if (!doctorExists) {
            return res.status(404).json({ message: "Doctor no encontrado" });
        }
        
        const appointments = await appointmentsModel.find({ doctor_id: doctorId })
            .populate('patient_id', 'name lastname recordNumber')
            .populate('service_id', 'name');
            
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las citas del doctor", error: error.message });
    }
};

// Crea una nueva cita
appointmentsController.createAppointment = async (req, res) => {
    try {
        const { 
            appointment_date, 
            appointment_time, 
            patient_id,  
            problem_description,
            // Estos campos se podrán asignar después por un administrador
            service_id,
            doctor_id,
            appointment_confirmation, 
            appointment_status
        } = req.body;

        // Validación de campos requeridos
        if (!appointment_date || !appointment_time || !patient_id) {
            return res.status(400).json({ 
                message: "La fecha, hora y paciente son campos obligatorios" 
            });
        }

        // Validamos que el paciente existe
        const patientExists = await patientsModel.exists({ _id: patient_id });
        if (!patientExists) {
            return res.status(400).json({ message: "El paciente especificado no existe" });
        }

        // Validamos doctor_id y service_id solo si se proporcionan
        if (doctor_id) {
            const doctorExists = await doctorsModel.exists({ _id: doctor_id });
            if (!doctorExists) {
                return res.status(400).json({ message: "El doctor especificado no existe" });
            }
        }

        if (service_id) {
            const serviceExists = await servicesModel.exists({ _id: service_id });
            if (!serviceExists) {
                return res.status(400).json({ message: "El servicio especificado no existe" });
            }
        }

        // Verifica si ya existe una cita para ese doctor en la misma fecha y hora, solo si se proporciona un doctor_id
        if (doctor_id) {
            const existingAppointment = await appointmentsModel.findOne({
                doctor_id,
                appointment_date,
                appointment_time,
                appointment_status: { $ne: "cancelada" } // No considerar citas canceladas
            });

            if (existingAppointment) {
                return res.status(400).json({ 
                    message: "El doctor ya tiene una cita agendada para esa fecha y hora" 
                });
            }
        }

        // Crea la nueva cita con solo los campos necesarios
        const appointmentData = { 
            appointment_date, 
            appointment_time, 
            patient_id,
            problem_description,
            appointment_status: appointment_status || "pendiente",
            appointment_confirmation: appointment_confirmation || false
        };
        
        // Añade campos opcionales solo si tienen valor
        if (doctor_id) appointmentData.doctor_id = doctor_id;
        if (service_id) appointmentData.service_id = service_id;
        
        const newAppointment = new appointmentsModel(appointmentData);
        
        await newAppointment.save();
        
        // Obtiene los datos relacionados para devolverlos en la respuesta
        // Usar una consulta que solo haga populate de los campos existentes
        let query = appointmentsModel.findById(newAppointment._id)
            .populate('patient_id', 'name lastname');
            
        // Solo hacemos populate de doctor_id y service_id si existen
        if (doctor_id) {
            query = query.populate('doctor_id', 'name lastName');
        }
        
        if (service_id) {
            query = query.populate('service_id', 'name');
        }
        
        const populatedAppointment = await query;
        
        return res.status(201).json({ 
            message: "Cita creada con éxito",
            appointment: populatedAppointment
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear la cita", error: error.message });
    }
};

// Actualiza una cita existente por su ID
appointmentsController.updateAppointment = async (req, res) => {
    try {
        const { 
            appointment_date, 
            appointment_time, 
            patient_id, 
            service_id, 
            appointment_confirmation, 
            problem_description, 
            appointment_status, 
            doctor_id 
        } = req.body;
        const appointmentId = req.params.id;

        // Verifica si la cita existe
        const appointment = await appointmentsModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }

        // Si se modifican las entidades relacionadas, verificar que existan
        if (patient_id) {
            const patientExists = await patientsModel.exists({ _id: patient_id });
            if (!patientExists) {
                return res.status(400).json({ message: "El paciente especificado no existe" });
            }
        }

        if (doctor_id) {
            const doctorExists = await doctorsModel.exists({ _id: doctor_id });
            if (!doctorExists) {
                return res.status(400).json({ message: "El doctor especificado no existe" });
            }
        }

        if (service_id) {
            const serviceExists = await servicesModel.exists({ _id: service_id });
            if (!serviceExists) {
                return res.status(400).json({ message: "El servicio especificado no existe" });
            }
        }

        // Si se cambia la fecha, hora o doctor, verificar que no haya conflicto
        if ((appointment_date || appointment_time || doctor_id) && 
            appointment_status !== "cancelada") {
            const checkDoctorId = doctor_id || appointment.doctor_id;
            const checkDate = appointment_date || appointment.appointment_date;
            const checkTime = appointment_time || appointment.appointment_time;
            
            const existingAppointment = await appointmentsModel.findOne({
                _id: { $ne: appointmentId }, // Excluir la cita actual
                doctor_id: checkDoctorId,
                appointment_date: checkDate,
                appointment_time: checkTime,
                appointment_status: { $ne: "cancelada" }
            });

            if (existingAppointment) {
                return res.status(400).json({ 
                    message: "El doctor ya tiene una cita agendada para esa fecha y hora" 
                });
            }
        }

        // Actualiza la cita
        const updatedAppointment = await appointmentsModel.findByIdAndUpdate(
            appointmentId,
            { 
                appointment_date, 
                appointment_time, 
                patient_id, 
                service_id, 
                appointment_confirmation, 
                problem_description, 
                appointment_status, 
                doctor_id 
            },
            { new: true }
        )
        .populate('patient_id', 'name lastname')
        .populate('doctor_id', 'name lastName')
        .populate('service_id', 'name');
        
        return res.status(200).json({ 
            message: "Cita actualizada con éxito",
            appointment: updatedAppointment
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la cita", error: error.message });
    }
};

// Elimina una cita por su ID
appointmentsController.deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        
        // Verifica si la cita existe
        const appointment = await appointmentsModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        
        // Elimina la cita
        await appointmentsModel.findByIdAndDelete(appointmentId);
        
        return res.status(200).json({ message: "Cita eliminada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la cita", error: error.message });
    }
};

// Cambia el estado de una cita (pendiente, completada, cancelada)
appointmentsController.changeAppointmentStatus = async (req, res) => {
    try {
        const { appointment_status } = req.body;
        const appointmentId = req.params.id;
        
        // Verifica que el estado sea válido
        if (!["pendiente", "completada", "cancelada"].includes(appointment_status)) {
            return res.status(400).json({ 
                message: "Estado de cita no válido. Debe ser: pendiente, completada o cancelada" 
            });
        }
        
        // Verifica si la cita existe
        const appointment = await appointmentsModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        
        // Actualiza solo el estado de la cita
        const updatedAppointment = await appointmentsModel.findByIdAndUpdate(
            appointmentId,
            { appointment_status },
            { new: true }
        )
        .populate('patient_id', 'name lastname')
        .populate('doctor_id', 'name lastName')
        .populate('service_id', 'name');
        
        return res.status(200).json({ 
            message: `Estado de la cita actualizado a "${appointment_status}"`,
            appointment: updatedAppointment
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al cambiar el estado de la cita", error: error.message });
    }
};

export default appointmentsController;
