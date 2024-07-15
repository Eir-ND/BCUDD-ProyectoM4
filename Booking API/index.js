// Importamos las librerías necesarias
const express = require('express'); // Express.js para creación del servidor
const routes = require('./routes/bookingRouter'); // Para trabajar con las rutas y peticiones CRUD
const cors = require('cors'); // CORS para permitir solicitudes de origen cruzado
const path = require('path')

// Definimos el puerto de la aplicación
const port = process.env.PORT || 3005
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`

// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Booking API",
            version: "1.0.0,"
        },
        servers: [
            {
                url: serverUrl
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/bookingRouter.js')}`],
};

// Cargamos las variables de entorno del archivo .env
require('dotenv').config();


// Creamos una nueva aplicación Express
const app = express();

// Middlewares
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(process.env.URL_BASE, routes);

// Iniciamos el servidor en el puerto definido
app.listen(port, () => {
    console.log(`Listening server in port ${port}`)
});