const mongoose = require('mongoose');
const generarIdPersonalizado = require('../utils/generarIdPersonalizado'); // Importar la función de generación de ID

const conferenciaSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => generarIdPersonalizado(8), // Genera un ID personalizado de 8 caracteres
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
});

const Conferencia = mongoose.model('Conferencia', conferenciaSchema);

module.exports = Conferencia;
