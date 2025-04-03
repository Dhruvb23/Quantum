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

$sql = "INSERT INTO transaction values('".$_POST["id"]."','".$_POST["item_id"]."','".$_POST["giver_id"]."','".$_POST["reciver_id"]."','".$_POST["status"]."')";


if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>