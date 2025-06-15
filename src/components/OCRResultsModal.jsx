import { useState } from 'react';
import { X, Camera } from 'lucide-react';

const OCRResultsModal = ({ isOpen, onClose }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanComplete, setScanComplete] = useState(false);

  if (!isOpen) return null;

  const handleStartScan = () => {
    console.log('Starting OCR scan...');
    setIsScanning(false);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanComplete(true);
    }, 2000);
  };

  const handleSaveResult = () => {
    console.log('Saving OCR result');
    onClose();
    // Reset state for next time
    setIsScanning(true);
    setScanComplete(false);
  };

  const handleRescan = () => {
    console.log('Starting new OCR scan');
    setIsScanning(true);
    setScanComplete(false);
  };

  const handleClose = () => {
    onClose();
    // Reset state for next time
    setIsScanning(true);
    setScanComplete(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {isScanning ? 'OCR Text Scanner' : 'OCR Scan Results'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Stage 1: Scanning Phase */}
          {isScanning && (
            <>
              <p className="text-gray-600 mb-6">
                Point your camera at the package label. The system will automatically detect and extract text from the label.
              </p>
              
              {/* Camera Preview Area */}
              <div className="bg-gray-100 rounded-lg p-8 mb-6 text-center border-2 border-dashed border-gray-300">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">Camera will activate when scan starts</p>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">Instructions:</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Ensure text is clearly visible</li>
                  <li>• Avoid glare or reflections</li>
                  <li>• Hold the camera steady</li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleStartScan}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Start OCR Scan
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* Stage 2: Post-Scan Phase (Results) */}
          {!isScanning && scanComplete && (
            <>
              <p className="text-gray-600 mb-6">Text extracted successfully from the package label.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Extracted Text:</label>
                  <div className="bg-gray-50 p-3 rounded-md border">
                    <p className="text-gray-900 font-mono">"Recyclable Material - Code #2 HDPE"</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material Detected (auto-parsed):</label>
                  <p className="text-gray-900 font-semibold">HDPE (High-Density Polyethylene)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Suggested Recycling Instructions:</label>
                  <div className="bg-green-50 p-3 rounded-md border border-green-200">
                    <p className="text-green-800">
                      Recycle with plastics collection bins. Check local recycling if unsure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleSaveResult}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Save Result
                </button>
                <button
                  onClick={handleRescan}
                  className="flex-1 border border-orange-600 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-md transition-colors"
                >
                  Rescan
                </button>
              </div>

              <button
                onClick={handleClose}
                className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
              >
                Close
              </button>
            </>
          )}

          {/* Scanning in Progress */}
          {!isScanning && !scanComplete && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Scanning and extracting text...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OCRResultsModal;