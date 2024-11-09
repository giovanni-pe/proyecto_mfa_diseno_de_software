const express = require('express');
const router = express.Router();
const Conferencia = require('../models/Conferencia');
const generarIdPersonalizado = require('../utils/generarIdPersonalizado'); // Importa la función de generación de ID

// Listar conferencias activas
router.get('/', async (req, res) => {
  try {
    const conferencias = await Conferencia.find({ status: 'Active' });
    res.json({ conferencias });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar nueva conferencia con ID único
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  let idUnico;
  let conferenciaExistente;

  // Genera un ID único para la nueva conferencia
  do {
    idUnico = generarIdPersonalizado(8);
    conferenciaExistente = await Conferencia.findOne({ _id: idUnico });
  } while (conferenciaExistente);

  const nuevaConferencia = new Conferencia({ _id: idUnico, title, description });

  try {
    const conferenciaGuardada = await nuevaConferencia.save();
    res.status(201).json({ conferencia: conferenciaGuardada });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Editar conferencia existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const conferenciaActualizada = await Conferencia.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true, runValidators: true }
    );
    if (!conferenciaActualizada) {
      return res.status(404).json({ message: 'Conferencia no encontrada' });
    }
    res.json({ conferencia: conferenciaActualizada });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Desactivar conferencia
router.put('/disable/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const conferenciaDesactivada = await Conferencia.findOneAndUpdate(
      { _id: id },
      { status: 'Inactive' },
      { new: true }
    );
    if (!conferenciaDesactivada) {
      return res.status(404).json({ message: 'Conferencia no encontrada' });
    }
    res.json({ conferencia: conferenciaDesactivada });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;