import React, { useState } from 'react';
import useEcochainStore from '../store/ecochain.store.js';
import { CheckCircle, AlertCircle, Shield, Search } from 'lucide-react';

// Reusable components (simplified)
const Button = ({ children, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
);

const Input = ({ value, onChange, onKeyPress }) => (
  <input
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Enter ECT ID (e.g., ECT-2024-001234)"
  />
);

const VerifyECT = () => {
  const [ectId, setEctId] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { verifyect } = useEcochainStore();

  const handleVerify = async () => {
    if (!ectId.trim()) return;
    
    setIsLoading(true);
    try {
      const data = await verifyect(ectId);

      if (!data) {
        setResult({ status: 'Invalid', error: 'Certificate not found' });
        return;
      }

      setResult({
        status: 'Valid',
        certificateBody: data.certifying_body,
        carbonSaved: data.carbon_kg,
        productName: data.product_name,
        productId: data.product_id,
        issueDate: new Date(data.issued_at).toLocaleDateString(),
        expiryDate: new Date(
          new Date(data.issued_at).getTime() + 365 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        manufacturer: data.manufacturer,
        materials: data.materials,
        category: data.category
      });
    } catch (error) {
      setResult({ status: 'Error', error: 'Failed to verify certificate' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Verify ECT Certificate</h2>
        <p className="text-gray-600 text-sm">Check product authenticity and environmental credentials</p>
      </div>

      <div className="space-y-3">
        <Input 
          value={ectId}
          onChange={(e) => setEctId(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button 
          onClick={handleVerify} 
          disabled={!ectId.trim() || isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Certificate'}
        </Button>
      </div>

      {result && (
        <div className={`p-4 rounded-lg border ${result.status === 'Valid' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-center mb-3">
            {result.status === 'Valid' ? (
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            )}
            <span className="font-semibold">
              {result.status === 'Valid' ? 'Valid Certificate' : 'Invalid Certificate'}
            </span>
          </div>

          {result.status === 'Valid' ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span>{result.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span>{result.productId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span>{result.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Materials:</span>
                <span>{result.materials}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Manufacturer:</span>
                <span>{result.manufacturer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Certified by:</span>
                <span>{result.certificateBody}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CO₂ Saved:</span>
                <span>{result.carbonSaved} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Issued:</span>
                <span>{result.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expires:</span>
                <span>{result.expiryDate}</span>
              </div>
            </div>
          ) : (
            <div className="text-red-600 text-sm">
              {result.error || 'Verification failed. Please check the ID and try again.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyECT;