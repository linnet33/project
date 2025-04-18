<?php
session_start();
require 'databaseconn.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['signUp'])) {
        $firstName = trim($_POST['fName']);
        $lastName = trim($_POST['lName']);
        $email = trim($_POST['email']);
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

        if ($stmt = $conn->prepare("SELECT email FROM login WHERE email = ?")) {
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                echo "<script>alert('Error: Email already exists! Try logging in.'); window.location.href = 'index.html';</script>";
                exit();
            } else {
                if ($stmt = $conn->prepare("INSERT INTO login (first_name, last_name, email, password) VALUES (?, ?, ?, ?)")) {
                    $stmt->bind_param("ssss", $firstName, $lastName, $email, $password);

                    if ($stmt->execute()) {
                        echo "<script>alert('Registration successful! You can now log in.'); window.location.href = 'index.html';</script>";
                        exit();
                    } else {
                        echo "<script>alert('Error: Unable to register. Try again!'); window.location.href = 'index.html';</script>";
                        exit();
                    }
                }
            }
            $stmt->close();
        }
    }

    if (isset($_POST['signIn'])) {
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);

        if ($stmt = $conn->prepare("SELECT customerid, password FROM login WHERE email = ?")) {
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                $stmt->bind_result($id, $hashed_password);
                $stmt->fetch();

                if (password_verify($password, $hashed_password)) {
                    $_SESSION['user_id'] = $id;
                    echo "<script>alert('Login successful! Redirecting...'); window.location.href = 'home.php';</script>";
                    exit();
                } else {
                    echo "<script>alert('Invalid password. Please try again.'); window.location.href = 'index.html';</script>";
                    exit();
                }
            } else {
                echo "<script>alert('Error: Email not found. Please register first.'); window.location.href = 'index.html';</script>";
                exit();
            }
        } else {
            echo "<script>alert('Error: Unable to prepare statement.'); window.location.href = 'index.html';</script>";
            exit();
        }
    }
}

$conn->close();
?>