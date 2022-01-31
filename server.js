const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const mysql = require('mysql2');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
},
console.log("Connected to employees_db on Port 3001"));


app.listen(PORT, () => console.log('Server started on port: 3001'));