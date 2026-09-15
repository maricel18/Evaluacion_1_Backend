require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

const app = express();
app.use(express.json());

const Producto = require('./models/Producto');

const productoRoutes = require('./routes/productoRoutes');
app.use('/api', productoRoutes);

const PORT = process.env.PORT || 8080;
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada correctamente.');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });