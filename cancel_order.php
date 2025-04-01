<?php
header('Content-Type: application/json');

// Database connection parameters
$servername = "localhost"; // Your database server
$username = "root"; // Your database username
$password = "Max051*#"; // Your database password
$dbname = "lapet"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the order ID from the POST request
$data = json_decode(file_get_contents("php://input"), true);
$orderId = $data['orderId'];
error_log("Received Order ID: " . $orderId); // Log the received Order ID

// Prepare and bind
$stmt = $conn->prepare("UPDATE orders SET order_status = 'Canceled' WHERE id = ?");
$stmt->bind_param("i", $orderId);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Order not found or already canceled.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>