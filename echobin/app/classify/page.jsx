'use client';
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
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#023838] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/path/to/pattern.svg')] bg-cover"></div>

      <div className="relative z-10 container mx-auto p-4 max-w-2xl">
        <Card className="backdrop-blur-md bg-white/10 shadow-xl rounded-3xl p-8">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-white text-center">
              Waste Classification Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Upload Section */}
              <div
                className="border-2 border-dashed border-teal-400 rounded-xl p-6 text-center transition-transform transform hover:scale-105 focus-within:scale-105"
              >
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
                  <Upload className="h-14 w-14 text-teal-300 animate-bounce" />
                  <span className="mt-2 text-base text-teal-100">
                    Click to upload or drag and drop
                  </span>
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4 animate-fade-in">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Analysis Button */}
              <button
              onClick={handleSubmit}
              disabled={loading || !imageFile}
              className="w-full p-3 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', 
                color: '#FFFFFF' 
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="loader rounded-full border-t-4 border-b-4 border-white w-5 h-5 animate-spin"></div>
                  <span>Analyzing...</span>
                </span>
              ) : (
                'Analyze Waste'
              )}
            </button>



              {/* Error Display */}
              {error && (
                <Alert variant="destructive" className="animate-fade-in">
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              {/* Results Display */}
              {result && (
                <div className="mt-6 p-6 bg-white/20 backdrop-blur-md rounded-xl shadow-md space-y-4 animate-fade-in">
                  <h3 className="font-semibold text-2xl text-white">Analysis Results</h3>

                  <div className="space-y-2">
                    <h4 className="font-medium text-teal-100">Description:</h4>
                    <p className="text-teal-200 whitespace-pre-wrap">
                      {result.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-teal-100">Waste Category:</h4>
                    <p className="text-teal-200">{result.category}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-teal-100">Confidence Level:</h4>
                    <p className="text-teal-200">{result.confidence}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
