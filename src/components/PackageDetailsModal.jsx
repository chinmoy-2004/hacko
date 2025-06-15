import { useState } from 'react';
import { X, Edit, Trash2 } from 'lucide-react';

const PackageDetailsModal = ({ isOpen, onClose, packageData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(packageData || {});

  if (!isOpen || !packageData) return null;

  const handleSave = () => {
    // Save edited data logic would go here
    setIsEditing(false);
    console.log('Saving edited data:', editedData);
  };

  const handleDelete = () => {
    // Delete record logic would go here
    console.log('Deleting package record:', packageData.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Package Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">Here is the complete information for your scanned package.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.packageType || ''}
                  onChange={(e) => setEditedData({...editedData, packageType: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{packageData.packageType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.dimensions || ''}
                  onChange={(e) => setEditedData({...editedData, dimensions: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{packageData.dimensions}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scanned</label>
              <p className="text-gray-900">{packageData.scanTime}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material Type</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.materialType || 'Cardboard'}
                  onChange={(e) => setEditedData({...editedData, materialType: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{editedData.materialType || 'Cardboard'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recycling Status</label>
              {isEditing ? (
                <select
                  value={editedData.disposal || packageData.disposal}
                  onChange={(e) => setEditedData({...editedData, disposal: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Recyclable">Recyclable</option>
                  <option value="Fully recyclable">Fully recyclable</option>
                  <option value="Check local recycling">Check local recycling</option>
                </select>
              ) : (
                <p className="text-gray-900">{packageData.disposal}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disposal Instructions</label>
              {isEditing ? (
                <textarea
                  value={editedData.disposalInstructions || 'Clean the package and place in recycling bin. Remove any tape or labels before recycling.'}
                  onChange={(e) => setEditedData({...editedData, disposalInstructions: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md h-20"
                />
              ) : (
                <p className="text-gray-900">{editedData.disposalInstructions || 'Clean the package and place in recycling bin. Remove any tape or labels before recycling.'}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedData(packageData);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Edit Information
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 flex items-center justify-center gap-2 border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Record
                </button>
              </>
            )}
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

export default PackageDetailsModal;