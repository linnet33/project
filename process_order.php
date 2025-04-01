<?php
// process_order.php

// Database connection parameters
$servername = "localhost"; // Change if necessary
$username = "root"; // Your database username
$password = "Max051*#"; // Your database password
$dbname = "lapet"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the order data from the POST request
$data = json_decode(file_get_contents("php://input"), true); // Decode JSON input
$name = $data['name'];
$pickup_station = $data['pickup_station']; 
$phone = $data['phone'];
$payment_method = $data['payment'];
$tracking_id = uniqid('ORD-'); // Generate a unique tracking ID
$order_date = date('Y-m-d H:i:s'); // Get the current date and time

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO orders (name, address, phone, payment_method, tracking_id, order_date) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $name, $pickup_station, $phone, $payment_method, $tracking_id, $order_date);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'tracking_id' => $tracking_id]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>