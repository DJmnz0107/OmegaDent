// importar lo de lalibreria "express"
import express from "express" ;

import cookieParser from "cookie-parser";


//Creso la constante para poder usar express en otros archivos
const app = express();

//middleware para aceptar datos desde postman

//Que acepte datos en json
app.use(express.json());
//Para que POSTMAN guarde el token en una cookie
app.use(cookieParser());


//Mandae a llamar a rutas


// Rutas publicas que no necesitan haber iniciado sesión



//Archivo la constante para poder usar express en otros archivos
export default app;
