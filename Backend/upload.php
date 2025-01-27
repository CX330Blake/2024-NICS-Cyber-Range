<?php
// 設置允許的 MIME 類型和文件擴展名
$allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
$allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

// 文件保存目錄
$uploadDir = 'uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// 處理文件上傳
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];

        // 檢查文件是否上傳成功
        if ($file['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $file['tmp_name'];
            $fileName = basename($file['name']);
            $fileSize = $file['size'];
            $fileType = mime_content_type($fileTmpPath);
            $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

            // 驗證 MIME 類型和擴展名
            if (in_array($fileType, $allowedMimeTypes) && in_array($fileExtension, $allowedExtensions)) {
                // 防止文件名衝突，重新生成唯一名稱
                $newFileName = uniqid() . '.' . $fileExtension;
                $destination = $uploadDir . $newFileName;

                // 移動文件到目標目錄
                if (move_uploaded_file($fileTmpPath, $destination)) {
                    echo json_encode(['status' => 'success', 'message' => 'File uploaded successfully.']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Failed to move uploaded file.']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Invalid file type or extension.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'File upload error.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No file uploaded.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
