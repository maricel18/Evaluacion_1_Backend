const Producto = require('../models/Producto');
const { Op } = require('sequelize');

// GET /api/productos
const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
};

// GET /api/productos/buscar?nombre=texto
const buscarProductos = async (req, res) => {
    try {
        const { nombre } = req.query;
        if (!nombre) {
            const productos = await Producto.findAll();
            return res.status(200).json(productos);
        }

        const productos = await Producto.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${nombre}%`
                }
            }
        });

        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar productos' });
    }
};

// GET /api/productos/:id
const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el producto' });
    }
};

// POST /api/productos
const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, estado } = req.body;

        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
        }
        if (precio === undefined || Number(precio) <= 0) {
            return res.status(400).json({ mensaje: 'El precio es obligatorio y debe ser mayor a 0' });
        }
        if (stock === undefined || Number(stock) < 0) {
            return res.status(400).json({ mensaje: 'El stock es obligatorio y no puede ser negativo' });
        }

        const nuevoProducto = await Producto.create({
            nombre: nombre.trim(),
            descripcion,
            precio: Number(precio),
            stock: Number(stock),
            estado: estado !== undefined ? estado : true
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el producto' });
    }
};

// PUT /api/productos/:id
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, estado } = req.body;

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        if (nombre !== undefined && nombre.trim() === '') {
            return res.status(400).json({ mensaje: 'El nombre no puede estar vacío' });
        }
        if (precio !== undefined && Number(precio) <= 0) {
            return res.status(400).json({ mensaje: 'El precio debe ser mayor a 0' });
        }
        if (stock !== undefined && Number(stock) < 0) {
            return res.status(400).json({ mensaje: 'El stock no puede ser negativo' });
        }

        await producto.update({
            nombre: nombre !== undefined ? nombre.trim() : producto.nombre,
            descripcion: descripcion !== undefined ? descripcion : producto.descripcion,
            precio: precio !== undefined ? Number(precio) : producto.precio,
            stock: stock !== undefined ? Number(stock) : producto.stock,
            estado: estado !== undefined ? estado : producto.estado
        });

        res.status(200).json({
            mensaje: 'Producto actualizado correctamente',
            producto
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el producto' });
    }
};

// DELETE /api/productos/:id
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        await producto.destroy();
        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto' });
    }
};

module.exports = {
    listarProductos,
    buscarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};