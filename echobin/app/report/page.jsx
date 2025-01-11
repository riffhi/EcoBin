'use client'
import React, { useState, useEffect } from "react";
import SearchBox from "../../components/searchBox";
import Maps from "../../components/mapComp";
import { Card, CardContent } from "@/components/ui/card";

export default function map() {
  const [selectPosition, setSelectPosition] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedReports = localStorage.getItem('mapReports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  // Function to compress image
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          
          // Calculate new dimensions (max width/height of 800px)
          let width = img.width;
          let height = img.height;
          const maxSize = 800;
          
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Function to safely store in localStorage
  const safelyStoreReports = (updatedReports) => {
    try {
      const serializedData = JSON.stringify(updatedReports);
      localStorage.setItem('mapReports', serializedData);
      return true;
    } catch (error) {
      if (error.name === 'QuotaExceededError' || error.code === 22) {
        alert('Storage full! Please delete some old reports first.');
      } else {
        alert('Error saving report. Please try again.');
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectPosition || !image) {
      alert('Please select both location and image');
      return;
    }

    try {
      // Compress the image
      const compressedImage = await compressImage(image);
      
      const newReport = {
        id: Date.now(),
        position: selectPosition,
        image: compressedImage,
        description,
        locationName: selectPosition.display_name
      };

      const updatedReports = [...reports, newReport];
      
      // Try to store the reports
      if (safelyStoreReports(updatedReports)) {
        setReports(updatedReports);
        
        // Reset form
        setImage(null);
        setDescription('');
        setSelectPosition(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    }
  };

  // Function to delete a report
  const handleDeleteReport = (reportId) => {
    const updatedReports = reports.filter(report => report.id !== reportId);
    if (safelyStoreReports(updatedReports)) {
      setReports(updatedReports);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 gap-4">
      {/* Form Section */}
      <div className="w-full">
        <button 
          onClick={() => setShowForm(!showForm)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showForm ? 'Hide Form' : 'Add New Report'}
        </button>

        {showForm && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">Location</label>
                  <SearchBox 
                    selectPosition={selectPosition} 
                    setSelectPosition={setSelectPosition}
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit Report
                </button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] border rounded-lg overflow-hidden">
        <Maps selectPosition={selectPosition} reports={reports} />
      </div>

      {/* Reports Section */}
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">Saved Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="h-full relative">
              <CardContent className="p-4">
                <img 
                  src={report.image} 
                  alt="Report" 
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <p className="font-bold">Location: {report.locationName}</p>
                <p className="mt-2">{report.description}</p>
                <button
                  onClick={() => handleDeleteReport(report.id)}
                  className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}