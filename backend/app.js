// importar lo de lalibreria "express"
import express from "express" ;
import cookieParser from "cookie-parser";
import cors from "cors";
import doctorsRoutes from "./src/routes/doctors.js";
import patientsRoutes from "./src/routes/patients.js";
import servicesRoutes from "./src/routes/services.js";
import appointmentsRoutes from "./src/routes/appointments.js";
import adminsRoutes from "./src/routes/admins.js";
import assistantsRoutes from "./src/routes/assistants.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerPatientsRoutes from "./src/routes/registerPatients.js";
import registerDoctorsRoutes from "./src/routes/registerDoctors.js";
import ratingsRoutes from "./src/routes/ratings.js";
import { verifyToken, checkRole } from "./src/middlewares/authMiddleware.js";
//Creso la constante para poder usar express en otros archivos
const app = express();

//middleware para aceptar datos desde postman

//Que acepte datos en json
app.use(express.json());
//Para que POSTMAN guarde el token en una cookie
app.use(cookieParser());
//Configuración de CORS para permitir solicitudes desde el frontend

app.use(
  cors({
    origin: "http://localhost:5173", // Dominio del cliente
    credentials: true, // Permitir envío de cookies y credenciales
  })
);

//Mandae a llamar a rutas
app.use("/api/doctors", doctorsRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/appointments", 
  verifyToken,                                 // Primero verifica el token
  checkRole(["paciente", "administrador"]),    // Luego verifica los roles permitidos
  appointmentsRoutes                           // Finalmente usa las rutas
);
app.use("/api/admins", adminsRoutes);
app.use("/api/assistants", assistantsRoutes);

// Rutas publicas que no necesitan haber iniciado sesión
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/register/patients", registerPatientsRoutes);
app.use("/api/register/doctors", registerDoctorsRoutes);

// Ruta de inicio para verificar que el servidor funciona

// Rutas para calificaciones - Requiere autenticación
app.use("/api/ratings", 
  verifyToken,                                          // Primero verifica el token
  checkRole(["paciente", "doctor", "administrador"]),  // Luego verifica los roles permitidos
  ratingsRoutes                                         // Finalmente usa las rutas
);

//Archivo la constante para poder usar express en otros archivos
export default app;
