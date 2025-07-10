import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Environment variables to be used later on:
// process.env.DB_
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise();

connection.connect((error) => {
    if (error) {
        throw error;
    } 
    else {
        console.log('Database connected successfully.');
    }
});

export default connection;