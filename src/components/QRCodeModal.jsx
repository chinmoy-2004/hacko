import React, { useState } from 'react';
import { QrCode, X, RotateCcw } from 'lucide-react';

const QRCodeModal = ({ isOpen, onClose }) => {
  const [scanState, setScanState] = useState('scanning');
  const [qrData, setQrData] = useState({
    productName: 'Amazon Basics Storage Box',
    materialType: 'Corrugated Cardboard',
    recyclingInstructions: 'Remove all tape and labels. Flatten box. Place in recycling bin.',
    disposalLocation: 'Curbside recycling pickup or local recycling center'
  });

  const handleRescan = () => {
    setScanState('scanning');
  };

  const handleSaveInfo = () => {
    console.log('QR Code info saved:', qrData);
    onClose();
  };

  const simulateScan = () => {
    setTimeout(() => {
      setScanState('results');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Scan Package QR Code</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {scanState === 'scanning' && (
            <>
              <p className="text-gray-600 mb-4">
                Point your camera at the package QR code. We'll automatically extract product and disposal information.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-800 mb-2">Instructions:</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Ensure the QR code is clearly visible</li>
                  <li>• Align the QR code within the frame</li>
                  <li>• Hold steady for automatic detection</li>
                </ul>
              </div>

              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center mb-6">
                <div className="text-center">
                  <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Position QR code in this area</p>
                  <div className="mt-3">
                    <div className="w-24 h-24 border-2 border-blue-500 mx-auto rounded-lg flex items-center justify-center">
                      <QrCode className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={simulateScan}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
              >
                <QrCode className="h-4 w-4" />
                <span>Start QR Scan</span>
              </button>
            </>
          )}

          {scanState === 'results' && (
            <>
              <p className="text-gray-600 mb-6">
                QR code scanned successfully! Here's the extracted information:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name:
                  </label>
                  <p className="text-gray-900">{qrData.productName}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Material Type:
                  </label>
                  <p className="text-gray-900">{qrData.materialType}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recycling Instructions:
                  </label>
                  <p className="text-gray-900">{qrData.recyclingInstructions}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disposal Location:
                  </label>
                  <p className="text-gray-900">{qrData.disposalLocation}</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleSaveInfo}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md transition-colors"
                >
                  Save Info
                </button>

                <button
                  onClick={handleRescan}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Rescan</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;