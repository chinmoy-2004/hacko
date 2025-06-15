import React, { useState } from 'react';
import { Camera, X, Ruler, Upload } from 'lucide-react';

const PackageDimensionModal = ({ isOpen, onClose }) => {
  const [scanMode, setScanMode] = useState('camera');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: ''
  });
  const [detectedDimensions, setDetectedDimensions] = useState({
    length: '20.5',
    width: '15.2',
    height: '10.8'
  });
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleStartScanning = () => {
    // Simulate scanning process
    setTimeout(() => {
      setScanMode('results');
    }, 2000);
  };

  const handleManualEntry = (field, value) => {
    setDimensions(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmSave = () => {
    console.log('Dimensions saved:', detectedDimensions);
    onClose();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = () => {
    // Simulate image analysis process
    setTimeout(() => {
      setScanMode('results');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Scan Package Dimensions</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {scanMode === 'camera' && (
            <>
              <p className="text-gray-600 mb-6">
                Use your device camera to automatically detect the dimensions of your package. 
                Ensure the entire package is visible in the frame for accurate measurements.
              </p>

              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center mb-6">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Camera view will appear here</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleStartScanning}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>Start Scanning</span>
                </button>

                <button
                  onClick={() => setScanMode('upload')}
                  className="w-full border border-green-600 text-green-600 hover:bg-green-50 px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </button>

                <button
                  onClick={() => setScanMode('manual')}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <Ruler className="h-4 w-4" />
                  <span>Enter Manually</span>
                </button>
              </div>
            </>
          )}

          {scanMode === 'upload' && (
            <>
              <p className="text-gray-600 mb-6">
                Upload an image of your package for AI-powered dimension analysis.
              </p>

              <div className="mb-6">
                <label className="block">
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors">
                    {uploadedImage ? (
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded package" 
                        className="max-h-44 max-w-full object-contain rounded-md"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Click to upload package image</p>
                        <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-3">
                {uploadedImage && (
                  <button
                    onClick={handleAnalyzeImage}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Analyze Image</span>
                  </button>
                )}

                <button
                  onClick={() => setScanMode('camera')}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors"
                >
                  Back to Camera
                </button>
              </div>
            </>
          )}

          {scanMode === 'manual' && (
            <>
              <p className="text-gray-600 mb-6">
                Enter package dimensions manually as a backup option.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => handleManualEntry('length', e.target.value)}
                    placeholder="Enter length"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => handleManualEntry('width', e.target.value)}
                    placeholder="Enter width"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => handleManualEntry('height', e.target.value)}
                    placeholder="Enter height"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmSave}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md transition-colors"
                >
                  Save Dimensions
                </button>

                <button
                  onClick={() => setScanMode('camera')}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors"
                >
                  Back to Camera
                </button>
              </div>
            </>
          )}

          {scanMode === 'results' && (
            <>
              <p className="text-gray-600 mb-6">
                Package dimensions detected successfully!
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-green-800 mb-3">Detected Dimensions:</h3>
                <div className="space-y-2 text-green-700">
                  <div>Length: {detectedDimensions.length} cm</div>
                  <div>Width: {detectedDimensions.width} cm</div>
                  <div>Height: {detectedDimensions.height} cm</div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmSave}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md transition-colors"
                >
                  Confirm & Save
                </button>

                <button
                  onClick={() => setScanMode('camera')}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors"
                >
                  Rescan
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDimensionModal;
