'use client'
import React, { useState } from "react";

export default function ReportUncleanAreas() {
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("File:", file ? file.name : "No file uploaded");
    console.log("Location:", location);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#1E4F39" }}
    >
      <div
        className="p-6 rounded-lg shadow-lg"
        style={{
          width: "400px",
          border: "2px solid #0B5394",
          backgroundColor: "#FDF3CC",
        }}
      >
        <h2
          className="text-center font-bold"
          style={{
            fontSize: "18px",
            color: "#000000",
            marginBottom: "5px",
          }}
        >
          REPORT UNCLEAN AREAS
        </h2>
        <p
          className="text-center"
          style={{
            fontSize: "12px",
            color: "#000000",
            marginBottom: "15px",
          }}
        >
          See something messy? Let us Know!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              className="block text-center mb-2"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#000000",
              }}
            >
              Upload Waste Image
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md"
              style={{
                backgroundColor: "#D9D9D9",
                borderColor: "#D9D9D9",
                color: "#000000",
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Add Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              style={{
                backgroundColor: "#D9D9D9",
                borderColor: "#D9D9D9",
                color: "#000000",
                textAlign: "center",
              }}
            />
          </div>
          <button
  type="submit"
  className="block mx-auto px-6 py-2 rounded-md"
  style={{
    backgroundColor: "#008000",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "14px",
  }}
>
  Submit
</button>

        </form>
      </div>
    </div>
  );
}
