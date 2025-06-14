import React, { useState } from 'react';

import { Info, Upload } from 'lucide-react';

// Simple reusable components
const Button = ({ children, className = '', variant = 'default', size = 'default', onClick, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    ghost: 'hover:bg-gray-100',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
  };
  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 px-3 text-sm',
    icon: 'h-10 w-10'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};


// Verify ECT Component
const VerifyECT = () => {
  const [ectId, setEctId] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    setResult({
      status: 'Valid',
      certificateBody: 'GreenCert International',
      carbonSaved: '14.2kg CO₂',
      productName: 'Organic Cotton T-Shirt',
      expiryDate: '2025-12-31'
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">✅ Verify ECT</h2>
        <Info className="h-4 w-4 text-gray-400" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Enter ECT ID</label>
          <Input
            placeholder="ECT-2024-001234"
            value={ectId}
            onChange={(e) => setEctId(e.target.value)}
          />
        </div>

        <Button onClick={handleVerify} className="w-full">
          Verify Certificate
        </Button>

        {result && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <Badge variant="success">{result.status}</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div><strong>Product:</strong> {result.productName}</div>
              <div><strong>Certificate Body:</strong> {result.certificateBody}</div>
              <div><strong>Carbon Saved:</strong> {result.carbonSaved}</div>
              <div><strong>Expires:</strong> {result.expiryDate}</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VerifyECT;