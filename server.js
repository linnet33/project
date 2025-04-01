const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'password', // Your MySQL password
    database: 'your_database_name' // Your database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Fetch all orders
app.get('/api/orders', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Update order status
app.put('/api/orders/:id', (req, res) => {
    const { order_status } = req.body;
    db.query('UPDATE orders SET order_status = ? WHERE id = ?', [order_status, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(204);
    });
});

// Delete order
app.delete('/api/orders/:id', (req, res) => {
    db.query('DELETE FROM orders WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(204);
    });
});

// Endpoint to create a new order (for demonstration purposes)
app.post('/api/orders', (req, res) => {
    const { name, address, phone, payment_method, tracking_id, order_date } = req.body;
    const newOrder = { name, address, phone, payment_method, tracking_id, order_date, order_status: 'Pending' };

    db.query('INSERT INTO orders SET ?', newOrder, (err, result) => {
        if (err) return res.status(500).send(err);
        
        // No email notification is sent now
        newOrder.id = result.insertId; // Set the order ID for the response
        res.status(201).json({ id: result.insertId, ...newOrder });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});