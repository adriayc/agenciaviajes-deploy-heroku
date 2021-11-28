// Configuramos el servidor express usando la sintaxis Imports y Exports
import express from 'express';
import router from './routes/index.js';             // En la nueva version de imports/exports de node lleva la extesion
import db from './config/db.js';                    // Importar la configuracion de la DB

// Importar las variables de entorno
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const app = express();          // Asignando expres a la variable

// Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual (middleware)
app.use((req, res, next) => {
    // console.log(res);

    const year = new Date();

    // Guardar en una variable local de express
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    next();         // Pasa al siguinte linea de codigo (middleware)
    // return next();  // Obliga pasar al siguiente middleware 
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta publica (almacena los archivos estaticos)
app.use(express.static('public'));

// Agregar Router
app.use('/', router);

// Definir puerto y host para la app
const port = process.env.PORT || 4000;         // Obtiene la variable de entorno o usa el puerto 4000 (si no existe)
const host = process.env.HOST || '0.0.0.0.0';

app.listen(port, host, () => {
    console.log(`El servidor esta funcionado en el puerto ${port}`);
});