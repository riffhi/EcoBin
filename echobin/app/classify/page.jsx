'use client'
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from 'lucide-react';

export default function Home() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setError(null);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch('/api/image_analysis', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed. Please try again.');
      }

      setResult(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl min-h-screen">
      <Card className="shadow-lg rounded-xl bg-white">
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-black text-xl font-semibold">
            Waste Classification Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <div className="space-y-6">
            {/* File Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors duration-300">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400" />
                <span className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </span>
              </label>
            </div>
  
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
              </div>
            )}
  
            {/* Analysis Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !imageFile}
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300 font-medium"
            >
              {loading ? 'Analyzing...' : 'Analyze Waste'}
            </button>
  
            {/* Error Display */}
            {error && (
              <Alert variant="destructive" className="bg-red-100 border-red-400 text-red-700">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
  
            {/* Results Display */}
            {result && (
              <div className="mt-4 p-4 bg-[#E6FFE6] border-l-4 border-green-400 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg text-green-800">Analysis Results</h3>
  
                <div className="space-y-1">
                  <h4 className="font-medium">Description:</h4>
                  <p className="text-green-900 whitespace-pre-wrap">
                    {result.description}
                  </p>
                </div>
  
                <div className="space-y-1">
                  <h4 className="font-medium">Waste Category:</h4>
                  <p className="text-green-900">
                    {result.category}
                  </p>
                </div>
  
                <div className="space-y-1">
                  <h4 className="font-medium">Confidence Level:</h4>
                  <p className="text-green-900">
                    {result.confidence}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  
}
