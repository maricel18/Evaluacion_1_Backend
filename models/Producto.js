const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define(
    'Producto',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING(255)
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        tableName: 'Productos'
    }
);

module.exports = Producto;