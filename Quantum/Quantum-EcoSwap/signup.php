<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Niharika";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO signup values('".$_POST["Fullname"]."','".$_POST["Email"]."','".$_POST["Password"]."','".$_POST["ConfirmPassword"]."')";


if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>