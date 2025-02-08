<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    header("Access-Control-Allow-Origin: *"); // Bug0: Dangerous 
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    $upload_dir = 'uploads/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $file_name = $_FILES['file']['name'];
    $file_tmp = $_FILES['file']['tmp_name'];

    if (str_ends_with($file_name, ".php")) {
        die("Bad Hacker...");
    }


    // Bug1: Arbitrary file upload, no extension sanitization 
    $upload_path = $upload_dir . $file_name;

    // Bug2: Didn't check the MIME-Type, attackers can fake the Content-Type
    // Bug3: Didn't check the file content, attackers can upload webshells
    if (move_uploaded_file($file_tmp, $upload_path)) {
        echo "File uploaded successfully: <a href='$upload_path'>$file_name</a>";
    } else {
        echo "File upload failed.";
    }
}
