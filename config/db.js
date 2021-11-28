import Sequelize from 'sequelize';

// require('dotenv').config({ path: 'variables.env' });         // Error!, cuando se esta usando 'module', esto funciona con 'CommonJS'
import dotenv from 'dotenv';                                    // Importa las varibles de entorno con dotenv en 'module'
dotenv.config({ path: 'variables.env' });

// Mostrar el host se imprima correctamente
// console.log(process.env.DB_HOST);

const db = new Sequelize(process.env.DB_NOMBRE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db;