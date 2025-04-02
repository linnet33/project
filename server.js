const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'your_database_name'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/api/orders', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.put('/api/orders/:id', (req, res) => {
    const { order_status } = req.body;
    db.query('UPDATE orders SET order_status = ? WHERE id = ?', [order_status, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(204);
    });
});

app.delete('/api/orders/:id', (req, res) => {
    db.query('DELETE FROM orders WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(204);
    });
});

app.post('/api/orders', (req, res) => {
    const { name, address, phone, payment_method, tracking_id, order_date } = req.body;
    const newOrder = { name, address, phone, payment_method, tracking_id, order_date, order_status: 'Pending' };

    db.query('INSERT INTO orders SET ?', newOrder, (err, result) => {
        if (err) return res.status(500).send(err);
        newOrder.id = result.insertId;
        res.status(201).json({ id: result.insertId, ...newOrder });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});