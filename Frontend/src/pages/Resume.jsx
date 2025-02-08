import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { message } from "antd";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import { CheckCircle } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export default function Resume() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    // Handle file select
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name); // 更新顯示的文件名
        }
    };

    // Handle file submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file.");
            return;
        }

        // Upload
        const formData = new FormData();
        formData.append("file", file);

        fetch("http://backendServer/upload.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => alert("File uploaded successfully"))
            .catch((error) => alert("Error uploading file"));
    };

    return (
        <>
            <Helmet>
                <title>Resume | 1337 Works</title>
            </Helmet>
            <br />
            <div className="flex justify-center">
                <div className="flex flex-col justify-center items-center w-2/3">
                    <p className="text-2xl md:text-4xl text-center font-mono">
                        Looking for a better position? New graduated college
                        student?{" "}
                        <strong className="text-2xl md:text-4xl text-secondary">
                            Submit Your RESUME
                        </strong>{" "}
                        to find an opportunity!
                    </p>
                    <br />
                    <br />
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        color="success"
                        className="flex justify-center"
                    >
                        Select files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                    </Button>
                    <br />
                    <p>{fileName}</p>
                    <br />
                    <Button
                        variant="outlined"
                        color="success"
                        startIcon={<CheckCircle />}
                        onClick={handleSubmit}
                    >
                        Confirm Upload
                    </Button>
                </div>
            </div>
        </>
    );
}
