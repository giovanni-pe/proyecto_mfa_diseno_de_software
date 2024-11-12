const express = require('express');
const router = express.Router();
const Conferencia = require('../models/Conferencia');
const generarIdPersonalizado = require('../utils/generarIdPersonalizado'); // Importa la función de generación de ID

/**
 * @swagger
 * tags:
 *   name: Conferencias
 *   description: API para gestionar conferencias
 */

/**
 * @swagger
 * /api/conferences:
 *   get:
 *     summary: Listar conferencias activas
 *     tags: [Conferencias]
 *     responses:
 *       200:
 *         description: Lista de conferencias activas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conferencias:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Conferencia'
 */
router.get('/', async (req, res) => {
  try {
    const conferencias = await Conferencia.find({ status: 'Active' });
    res.json({ conferencias });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/conferences:
 *   post:
 *     summary: Agregar una nueva conferencia
 *     tags: [Conferencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Conferencia'
 *     responses:
 *       201:
 *         description: Conferencia creada correctamente
 *       400:
 *         description: Error al crear conferencia
 */
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

/**
 * @swagger
 * /api/conferences/{id}:
 *   put:
 *     summary: Editar una conferencia existente
 *     tags: [Conferencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la conferencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Conferencia'
 *     responses:
 *       200:
 *         description: Conferencia actualizada correctamente
 *       404:
 *         description: Conferencia no encontrada
 */
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

/**
 * @swagger
 * /api/conferences/disable/{id}:
 *   put:
 *     summary: Desactivar una conferencia
 *     tags: [Conferencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la conferencia
 *     responses:
 *       200:
 *         description: Conferencia desactivada correctamente
 *       404:
 *         description: Conferencia no encontrada
 */
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
