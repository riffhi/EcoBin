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
      // console.log('Starting image upload...', {
      //   fileName: imageFile.name,
      //   fileType: imageFile.type,
      //   fileSize: imageFile.size
      // });

      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch('/api/image_analysis', {
        method: 'POST',
        body: formData,
      });

      // console.log('Response status:', response.status);
      
      const data = await response.json();
      // console.log('Response data:', data);

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
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Waste Classification Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* File Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                  className="max-h-64 mx-auto rounded-lg"
                />
              </div>
            )}

            {/* Analysis Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !imageFile}
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Analyze Waste
            </button>

             {/* Error Display */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )} 

            {/* Results Display */}
            {result && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">Analysis Results</h3>
              
              <div className="space-y-1">
                <h4 className="font-medium">Description:</h4>
                <p className="text-blue-700 whitespace-pre-wrap">
                  {result.description}
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-medium">Waste Category:</h4>
                <p className="text-blue-700">
                    {result.category}
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-medium">Confidence Level:</h4>
                <p className="text-blue-700">
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