<?php
$servername = "localhost";
$username = "mseet_37005749_312";  // Replace with your MySQL username
$password = "";      // Replace with your MySQL password
$dbname = "https://php-myadmin.net/db_structure.php?db=mseet_37005749_312";  // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$user = $_POST['username'];
$email = $_POST['email'];
$pass = $_POST['password'];

// Hash the password
$hashed_password = password_hash($pass, PASSWORD_DEFAULT);

// Insert into database
$sql = "INSERT INTO users (username, email, password) VALUES ('$user', '$email', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
