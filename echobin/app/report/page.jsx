'use client';
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
      style={{ backgroundColor: "#023838" }}
    >
      <div
        className="p-8 rounded-lg shadow-2xl w-full max-w-md"
        style={{
          backgroundColor: "#FDF3CC",
        }}
      >
        <h2
          className="text-center font-bold text-2xl text-gray-900 mb-4"
        >
          Report Unclean Areas
        </h2>
        <p
          className="text-center text-sm text-gray-700 mb-6"
        >
          See something messy? Let us know!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Upload Waste Image
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-900"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Add Location
            </label>
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-200 text-center text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="block mx-auto w-full py-2 rounded-md bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}