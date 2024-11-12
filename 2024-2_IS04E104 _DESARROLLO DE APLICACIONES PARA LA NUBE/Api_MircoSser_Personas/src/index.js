const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");

// Agregar Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// settings
const app = express();
const port = process.env.PORT || 9000;

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Microservicio de Personas',
      version: '1.0.0',
      description: 'Documentación de la API para el microservicio de personas',
    },
  },
  apis: ['./src/routes/*.js'], // Ajusta el path según la ubicación de tus archivos de rutas
  
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// middlewares
app.use(express.json());
app.use(express.static('public'));  // Sirve los archivos estáticos como index.html
app.use("/api", userRoute);

// routes
//app.get("/", (req, res) => {
//  res.sendFile(__dirname + '/public/index.html');
//});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
