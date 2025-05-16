// importar lo de lalibreria "express"
import express from "express" ;
import cookieParser from "cookie-parser";
import doctorsRoutes from "./src/routes/doctors.js";
import patientsRoutes from "./src/routes/patients.js";
import servicesRoutes from "./src/routes/services.js";
import appointmentsRoutes from "./src/routes/appointments.js";
import adminsRoutes from "./src/routes/admins.js";
import assistantsRoutes from "./src/routes/assistants.js";

//Creso la constante para poder usar express en otros archivos
const app = express();

//middleware para aceptar datos desde postman

//Que acepte datos en json
app.use(express.json());
//Para que POSTMAN guarde el token en una cookie
app.use(cookieParser());


//Mandae a llamar a rutas
app.use("/doctors", doctorsRoutes);
app.use("/patients", patientsRoutes);
app.use("/services", servicesRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/admins", adminsRoutes);
app.use("/assistants", assistantsRoutes);

// Rutas publicas que no necesitan haber iniciado sesión


//Archivo la constante para poder usar express en otros archivos
export default app;
