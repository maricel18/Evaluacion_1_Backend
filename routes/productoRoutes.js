const express = require('express');
const router = express.Router();
const {
    listarProductos,
    buscarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController');

router.get('/productos', listarProductos);
router.get('/productos/buscar', buscarProductos);
router.get('/productos/:id', obtenerProductoPorId);
router.post('/productos', crearProducto);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

module.exports = router;