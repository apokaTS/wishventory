const express = require('express');
const router = express.Router();
const Inventory = require('../models/InventoryModel');

// Crear nuevo producto de inventario (el backend asigna el id lineal automáticamente)
router.post('/', async (req, res) => {
  try {
    const { descripcion, costo, minimo, existencias } = req.body;
    // Buscar el último id y sumar 1
    const last = await Inventory.findOne().sort({ id: -1 });
    const nextId = last ? (parseInt(last.id) + 1).toString() : "1";
    const newInventory = new Inventory({ id: nextId, descripcion, costo, minimo, existencias });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    // Manejo de error por duplicado u otros
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los productos de inventario
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto de inventario
router.put('/:id', async (req, res) => {
  try {
    const { descripcion, costo, minimo, existencias } = req.body;
    const updated = await Inventory.findOneAndUpdate(
      { id: req.params.id },
      { descripcion, costo, minimo, existencias },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un producto de inventario
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Inventory.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;