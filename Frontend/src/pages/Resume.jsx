import { Helmet } from "react-helmet";
import { PieChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const { Dragger } = Upload;

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

export default function Resume() {
    const [file, setFile] = useState(null);

    // 處理文件選擇
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // 處理表單提交
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file.");
            return;
        }

        // 模擬文件上傳
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
            <div className="flex justify-center flex-col">
                <Dragger {...props} className="w-1/2 mx-auto">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited
                        from uploading company data or other banned files.
                    </p>
                </Dragger>
                {/* <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: "Calculus" },
                                { id: 1, value: 15, label: "Computer Science" },
                                { id: 2, value: 20, label: "Linear Algebra" },
                            ],
                        },
                    ]}
                    width={600}
                    height={300}
                />
                <BarChart
                    xAxis={[
                        {
                            scaleType: "band",
                            data: [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday",
                            ],
                        },
                    ]}
                    series={[{ data: [4, 3, 5, 2, 4, 6, 3] }]}
                    width={600}
                    height={400}
                /> */}
            </div>
        </>
    );
}
