const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const inventoryRoutes = require('./routes/InventoryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Funciona' });
});

// Usar las rutas para inventario
app.use('/inventory', inventoryRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/wishventoryDB')
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'));
  })
  .catch(err => console.error('Error al conectar MongoDB:', err));