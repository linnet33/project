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

// Fetch all orders from the database
$sql = "SELECT * FROM orders";
$result = $conn->query($sql);

if ($result) {
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        // Calculate delivery date (assuming it's 3 days after the order date)
        $row['delivery_date'] = date('Y-m-d', strtotime($row['order_date'] . ' + 3 days'));
        $orders[] = $row;
    }
    echo json_encode($orders);
} else {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
}

$conn->close();
?>