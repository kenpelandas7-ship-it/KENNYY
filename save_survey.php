<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "survey_builder";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$jsonData = file_get_contents("php://input");

if (!$jsonData) {
    die("No survey data received.");
}

$stmt = $conn->prepare("INSERT INTO survey_templates (title, survey_json) VALUES (?, ?)");
$title = "Custom Survey Template";
$stmt->bind_param("ss", $title, $jsonData);

if ($stmt->execute()) {
    echo "Survey saved successfully!";
} else {
    echo "Error saving survey: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
