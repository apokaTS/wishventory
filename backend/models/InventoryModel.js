const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // ID lineal, requerido y único
    descripcion: { type: String, required: true },
    costo: { type: Number, required: true },
    minimo: { type: Number, required: true },
    existencias: { type: Number, required: true },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;