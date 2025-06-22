// import React, { useState } from 'react';
// import { Camera, X, Ruler, Upload } from 'lucide-react';
// import useRepackstore from '../store/repack.store.js';
// import toast from 'react-hot-toast';

// const PackageDimensionModal = ({ isOpen, onClose }) => {
//   const {upload}=useRepackstore();
//   const [scanMode, setScanMode] = useState('camera');
//   const [dimensions, setDimensions] = useState({
//     length: '',
//     width: '',
//     height: ''
//   });
//   const [detectedDimensions, setDetectedDimensions] = useState({
//     length: '20.5',
//     width: '15.2',
//     height: '10.8'
//   });
//   const [uploadedImage, setUploadedImage] = useState(null);

//   const handleStartScanning = () => {
//     // Simulate scanning process
//     setTimeout(() => {
//       setScanMode('results');
//     }, 2000);
//   };

//   const handleManualEntry = (field, value) => {
//     setDimensions(prev => ({ ...prev, [field]: value }));
//   };

//   const handleConfirmSave = () => {
//     console.log('Dimensions saved:', detectedDimensions);
//     onClose();
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setUploadedImage(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   const handleAnalyzeImage = async () => {
//   try {
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput.files.length > 0) {
//       await upload(fileInput.files[0]); // Send the File object directly
//       setScanMode('results');
//     }
//   } catch (error) {
//     console.error("Error analyzing image:", error);
//     toast.error("Failed to analyze image");
//   }
// };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Scan Package Dimensions</h2>
//             <button 
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>

//           {/* {scanMode === 'camera' && (
//             <>
//               <p className="text-gray-600 mb-6">
//                 Use your device camera to automatically detect the dimensions of your package. 
//                 Ensure the entire package is visible in the frame for accurate measurements.
//               </p>

//               <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center mb-6">
//                 <div className="text-center">
//                   <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
//                   <p className="text-gray-500">Camera view will appear here</p>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <button
//                   onClick={handleStartScanning}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
//                 >
//                   <Camera className="h-4 w-4" />
//                   <span>Start Scanning</span>
//                 </button>

//                 <button
//                   onClick={() => setScanMode('upload')}
//                   className="w-full border border-green-600 text-green-600 hover:bg-green-50 px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
//                 >
//                   <Upload className="h-4 w-4" />
//                   <span>Upload Image</span>
//                 </button>

//                 <button
//                   onClick={() => setScanMode('manual')}
//                   className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
//                 >
//                   <Ruler className="h-4 w-4" />
//                   <span>Enter Manually</span>
//                 </button>
//               </div>
//             </>
//           )} */}


//               <p className="text-gray-600 mb-6">
//                 Upload an image of your package for AI-powered dimension analysis.
//               </p>

//               <div className="mb-6">
//                 <label className="block">
//                   <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors">
//                     {uploadedImage ? (
//                       <img 
//                         src={uploadedImage} 
//                         alt="Uploaded package" 
//                         className="max-h-44 max-w-full object-contain rounded-md"
//                       />
//                     ) : (
//                       <div className="text-center">
//                         <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
//                         <p className="text-gray-500">Click to upload package image</p>
//                         <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
//                       </div>
//                     )}
//                   </div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                 </label>
//               </div>

//               <div className="space-y-3">
//                 {uploadedImage && (
//                   <button
//                     onClick={handleAnalyzeImage}
//                     className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
//                   >
//                     <Upload className="h-4 w-4" />
//                     <span>Analyze Image</span>
//                   </button>
//                 )}

//                 {/* <button
//                   onClick={() => setScanMode('camera')}
//                   className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors"
//                 >
//                   Back to Camera
//                 </button> */}
//               </div>


//           {/* {scanMode === 'manual' && (
//             <>
//               <p className="text-gray-600 mb-6">
//                 Enter package dimensions manually as a backup option.
//               </p>

//               <div className="space-y-4 mb-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Length (cm)
//                   </label>
//                   <input
//                     type="number"
//                     value={dimensions.length}
//                     onChange={(e) => handleManualEntry('length', e.target.value)}
//                     placeholder="Enter length"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Width (cm)
//                   </label>
//                   <input
//                     type="number"
//                     value={dimensions.width}
//                     onChange={(e) => handleManualEntry('width', e.target.value)}
//                     placeholder="Enter width"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Height (cm)
//                   </label>
//                   <input
//                     type="number"
//                     value={dimensions.height}
//                     onChange={(e) => handleManualEntry('height', e.target.value)}
//                     placeholder="Enter height"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <button
//                   onClick={handleConfirmSave}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md transition-colors"
//                 >
//                   Save Dimensions
//                 </button>

//                 <button
//                   onClick={() => setScanMode('camera')}
//                   className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors"
//                 >
//                   Back to Camera
//                 </button>
//               </div>
//             </>
//           )} */}

//           {scanMode === 'results' && (
//             <>
//               <p className="text-gray-600 mb-6">
//                 Package dimensions detected successfully!
//               </p>

//               <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
//                 <h3 className="font-medium text-green-800 mb-3">Detected Dimensions:</h3>
//                 <div className="space-y-2 text-green-700">
//                   <div>Length: {detectedDimensions.length} cm</div>
//                   <div>Width: {detectedDimensions.width} cm</div>
//                   <div>Height: {detectedDimensions.height} cm</div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <button
//                   onClick={handleConfirmSave}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md transition-colors"
//                 >
//                   Confirm & Save
//                 </button>

//                 <button
//                   onClick={() => setScanMode('camera')}
//                   className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors"
//                 >
//                   Rescan
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageDimensionModal;


import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import useRepackstore from '../store/repack.store.js';
import toast from 'react-hot-toast';

const PackageDimensionModal = ({ isOpen, onClose }) => {
  const { upload } = useRepackstore();
  const [scanMode, setScanMode] = useState('upload');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    try {
      setIsLoading(true);
      const fileInput = document.querySelector('input[type="file"]');
      if (!fileInput?.files?.[0]) {
        toast.error('Please select an image first');
        return;
      }

      const response = await upload(fileInput.files[0]);
      setResults(response);
      setScanMode('results');
      setUploadedImage(null); // Clear uploaded image after analysis
    } catch (error) {
      toast.error('Failed to analyze image');
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Package Dimension Scanner</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          {scanMode === 'upload' && (
            <>
              <p className="text-gray-600 mb-6">
                Upload an image of your package for dimension analysis
              </p>

              <div className="mb-6">
                <label className="block">
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
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
                        <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG</p>
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

              <button
                onClick={handleAnalyzeImage}
                disabled={!uploadedImage || isLoading}
                className={`w-full px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors ${uploadedImage
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                {isLoading ? (
                  <span>Analyzing...</span>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Analyze Image</span>
                  </>
                )}
              </button>
            </>
          )}

          {scanMode === 'results' && results && (
            <>
              <div className="space-y-6">
                {/* Original Image */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800">Original Package</h3>
                  </div>
                  <div className="w-full h-64 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={results.input_image}
                      alt="Original package"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                {/* Detected Dimensions */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800">Detected Dimensions</h3>
                  </div>
                  <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={results.box_image}
                      alt="Detected box dimensions"
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute inset-0 border-2 border-blue-400 border-dashed pointer-events-none"></div>
                  </div>
                </div>

                {/* Measurement Results */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-blue-600 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-blue-800 text-lg">Package Measurements</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Length", value: results.dims[0]/10 },
                      { label: "Width", value: results.dims[1]/10 },
                      { label: "Height", value: results.dims[2]/10 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium text-blue-700">{item.value} cm</span>
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-3 border-t border-blue-200">
                      <span className="text-gray-600">Shape</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {results.shape.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setScanMode('upload')}
                      className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Rescan
                    </button>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                    >
                      Confirm
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDimensionModal;