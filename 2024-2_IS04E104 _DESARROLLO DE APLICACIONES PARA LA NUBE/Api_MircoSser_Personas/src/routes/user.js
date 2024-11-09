const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// Crear un usuario
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener todos los usuarios
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener un usuario por ID

// Actualizar un usuario por ID
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { dni, firstName, lastName, email, phoneNumber, birthDate } = req.body;

  userSchema
    .findByIdAndUpdate(
      id,
      { dni, firstName, lastName, email, phoneNumber, birthDate },
      { new: true }
    )
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});


// Eliminar un usuario por ID
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario eliminado correctamente" });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
