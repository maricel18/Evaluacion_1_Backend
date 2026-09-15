require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

const app = express();

// Middleware para leer formato JSON en las peticiones
app.use(express.json());

// Importar el modelo para registrarlo en Sequelize
const Producto = require('./models/Producto');

// Importar rutas
const productoRoutes = require('./routes/productoRoutes');
app.use('/api', productoRoutes);

const PORT = process.env.PORT || 8080;

// Probar conexión con SQL Server
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

// Levantar el servidor Express
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Sincronizar modelos con la tabla real en SQL Server
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada correctamente.');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });