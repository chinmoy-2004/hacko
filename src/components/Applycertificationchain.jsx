import React, { useState } from 'react';

import {
  Search, Globe, ShoppingCart, User, Terminal, ExternalLink, Zap,
  CheckCircle, AlertCircle, Info, Upload, Copy, Key, Star,
  FileText, Link, QrCode, ArrowRight
} from 'lucide-react';

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

const Progress = ({ value = 0, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div
      className="bg-blue-600 h-2 rounded-full transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
);


// Apply Certification Component
const ApplyCertification = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">📦 Apply for Certification</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <Input placeholder="Enter product name" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select category</option>
              <option>Textiles & Apparel</option>
              <option>Food & Beverages</option>
              <option>Electronics</option>
              <option>Cosmetics</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Documents</label>
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 block">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Drop files here or click to upload</p>
            <p className="text-xs text-gray-500">PDF, Images (Max 10MB)</p>

            {/* Hidden file input */}
            <input
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  console.log("File selected:", file.name);
                }
              }}
            />
          </label>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Carbon Estimation (kg CO₂)</label>
            <Input placeholder="Auto-calculated: 14.2" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Manufacturing Location</label>
            <Input placeholder="Enter location" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Additional Notes</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Describe your sustainability practices..."
          />
        </div>

        <Button className="w-full">Submit for Web3 Audit</Button>
      </div>
    </Card>
  );
};

export default ApplyCertification;
