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

// Get the tracking ID from the POST request
$data = json_decode(file_get_contents("php://input"), true);
$trackingId = $data['tracking_id']; // Change from orderId to tracking_id
error_log("Received Tracking ID: " . $trackingId); // Log the received Tracking ID

// Prepare and bind
$stmt = $conn->prepare("UPDATE orders SET order_status = 'Canceled' WHERE tracking_id = ?"); // Use tracking_id in the query
$stmt->bind_param("s", $trackingId); // Assuming tracking_id is a string

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