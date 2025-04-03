<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Quantum";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO users values('".$_POST["id"]."','".$_POST["Fullname"]."','".$_POST["Email"]."','".$_POST["Password"]."')";


if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>