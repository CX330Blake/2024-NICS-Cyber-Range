import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { message, Upload } from "antd";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const props = {
    name: "file",
    multiple: true,
    action: "https://example.com/api/upload",
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};

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

    // Handle file select
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

        fetch("http://example.com:5000/upload", {
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
                {/* <title>{username ? `${username} | STARdy` : "STARdy"}</title> */}
                <title>Resume | 1337 Works</title>
            </Helmet>
            <br />
            <div className="flex justify-center items-center w-2/3">
                <p className="text-4xl md:text-5xl">
                    Looking for a better position? New graduated college
                    student? Submit your resume to find an opportunity!
                </p>
                <br />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    color="error"
                    className="flex justify-center"
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />
                </Button>
            </div>
        </>
    );
}
