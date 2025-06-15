import { X } from 'lucide-react';

const MLRecognitionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleConfirmSave = () => {
    console.log('Confirming and saving ML recognition result');
    onClose();
  };

  const handleRescan = () => {
    console.log('Starting new ML recognition scan');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">ML Package Recognition Results</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">The AI has analyzed your package and generated material information.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material Type:</label>
              <p className="text-gray-900 font-semibold">Cardboard Box</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confidence:</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
                <span className="text-indigo-600 font-semibold">94%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scan Time:</label>
              <p className="text-gray-900">1.2 seconds</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Suggested Disposal:</label>
              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <p className="text-green-800">
                  Cardboard is fully recyclable. Flatten the box, remove any tape or staples, 
                  and place in your recycling bin or take to a cardboard recycling center.
                </p>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">ML Transparency:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Model Version:</span> v2.1</p>
                <p><span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleConfirmSave}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Confirm & Save
            </button>
            <button
              onClick={handleRescan}
              className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md transition-colors"
            >
              Rescan
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MLRecognitionModal;