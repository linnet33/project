const express = require('express');
const app = express();
const mysql = require('mysql');

// API Endpoint to get order details
app.get('/api/orders/:trackingId', (req, res) => {
    const trackingId = req.params.trackingId;

    // Get the order details from the database
    db.query(`SELECT * FROM orders WHERE tracking_id = '${trackingId}'`, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error fetching order details' });
        } else {
            const orderDetails = results[0];
            res.json(orderDetails);
        }
    });
});

// Start the server
const port = 3003;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});