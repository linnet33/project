<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "Max051*#";
$dbname = "lapet";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$trackingId = $data['tracking_id'];

$stmt = $conn->prepare("UPDATE orders SET order_status = 'Canceled' WHERE tracking_id = ?");
$stmt->bind_param("s", $trackingId);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Order not found or already canceled.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>