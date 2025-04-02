<?php
$servername = "localhost";
$username = "root";
$password = "Max051*#";
$dbname = "lapet";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$pickup_station = $data['pickup_station'];
$phone = $data['phone'];
$payment_method = $data['payment'];
$tracking_id = uniqid('ORD-');
$order_date = date('Y-m-d H:i:s');

$stmt = $conn->prepare("INSERT INTO orders (name, address, phone, payment_method, tracking_id, order_date) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $name, $pickup_station, $phone, $payment_method, $tracking_id, $order_date);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'tracking_id' => $tracking_id]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>