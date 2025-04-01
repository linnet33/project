<?php
header('Content-Type: application/json');

$servername = "localhost"; 
$username = "root"; 
$password = "Max051*#";
$dbname = "lapet"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['order_id']) && isset($data['status'])) {
    $order_id = $conn->real_escape_string($data['order_id']);
    $new_status = $conn->real_escape_string($data['status']);

    // Update the order status in the database
    $sql = "UPDATE orders SET order_status = '$new_status' WHERE tracking_id = '$order_id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to update status: ' . $conn->error]);
    }
} else {
    echo json_encode(['error' => 'Invalid input.']);
}

$conn->close();
?>