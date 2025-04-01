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
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['tracking_id'])) {
    $tracking_id = $conn->real_escape_string($_GET['tracking_id']);
    $sql = "SELECT * FROM orders WHERE tracking_id = '$tracking_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $order = $result->fetch_assoc();
        $order['delivery_date'] = date('Y-m-d', strtotime($order['order_date'] . ' + 3 days'));
        echo json_encode($order);
    } else {
        echo json_encode(['error' => 'Order ID not found.']);
    }
} else {
    echo json_encode(['error' => 'No tracking ID provided.']);
}

$conn->close();
?>