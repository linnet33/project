const express = require('express');
const mysql = require('mysql2'); // Change this line
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'Max051*#', // Your MySQL password
    database: 'lapet' // Your database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Database connected!');
});

// Your API endpoints here...

// Start the server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});