const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const conferenciasRouter = require('./routes/conferencias');
require('dotenv').config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Rutas
app.use('/api/conferences', conferenciasRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

