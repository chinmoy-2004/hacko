import React, { useEffect, useState } from 'react';
import useEcochainStore from '../store/ecochain.store.js';
import {
  Upload, AlertCircle, CheckCircle, Loader2,
  Leaf,
  Calculator,
  ShieldCheck,
  X,
  Clock
} from 'lucide-react';
import BlockchainDiagram from './Blockchaindia.jsx';
import useCarbonKarmaStore from '../store/carbonKarma.store.js';
import toast from 'react-hot-toast';

import AddProduct from '../pages/Addproduct.jsx';

// Verification Process Modal Component
const VerificationModal = ({ isOpen, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Reset progress when modal opens
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5; // Will reach 100% in 20 seconds (100/5 = 20)
      });
    }, 1000);

    // Auto close after 20 seconds
    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, 20000);

    return () => {
      clearInterval(interval);
      clearTimeout(autoCloseTimer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-8 w-8" />
            <h3 className="text-xl font-bold">Verification in Progress</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600 animate-pulse" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Blockchain Verification</h4>
              <p className="text-sm text-gray-500">
                Your product is being verified on the blockchain network
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>Processing...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <div className={`flex items-center space-x-3 ${progress >= 25 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center ${progress >= 25 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {progress >= 25 ? <CheckCircle className="h-4 w-4" /> : '1'}
              </div>
              <span className={`text-sm ${progress >= 25 ? 'text-gray-900' : 'text-gray-500'}`}>
                Initial verification checks
              </span>
            </div>

            <div className={`flex items-center space-x-3 ${progress >= 50 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center ${progress >= 50 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {progress >= 50 ? <CheckCircle className="h-4 w-4" /> : '2'}
              </div>
              <span className={`text-sm ${progress >= 50 ? 'text-gray-900' : 'text-gray-500'}`}>
                Carbon footprint validation
              </span>
            </div>

            <div className={`flex items-center space-x-3 ${progress >= 75 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center ${progress >= 75 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {progress >= 75 ? <CheckCircle className="h-4 w-4" /> : '3'}
              </div>
              <span className={`text-sm ${progress >= 75 ? 'text-gray-900' : 'text-gray-500'}`}>
                Blockchain transaction
              </span>
            </div>

            <div className={`flex items-center space-x-3 ${progress >= 100 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center ${progress >= 100 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {progress >= 100 ? <CheckCircle className="h-4 w-4" /> : '4'}
              </div>
              <span className={`text-sm ${progress >= 100 ? 'text-gray-900' : 'text-gray-500'}`}>
                Final certification
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4">
          <p className="text-sm text-gray-600">
            {progress < 100 ? "This usually takes about 20 seconds..." : "Verification complete!"}
          </p>
        </div>
      </div>
    </div>
  );
};

const ApplyCertification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { submitdata, isproductverified, products , getgrading } = useEcochainStore();
  const { CheckEmmission, isemmissionchecked } = useCarbonKarmaStore();
  const [totalCarbon, setTotalCarbon] = useState(14.2);

  const [formData, setFormData] = useState({
    product_id: '',
    product_name: '',
    category: '',
    materials: '',
    manufacturer: '',
    certifying_body: 'Amazon GreenX',
    image_filename: null,
    carbon_kg: 'x',
    location: '',
    notes: ''
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image_filename: e.target.files[0]
      }));
    }
  };

  const calculateCarbonFootprint = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (!formData.image_filename || !formData.product_name) {
        throw new Error('Please fill all required fields before calculating');
      }

      const formDataObj = new FormData();
      formDataObj.append('image', formData.image_filename);
      // const res = await CheckEmmission(formDataObj);

      // Update both the totalCarbon state and formData
      // setTotalCarbon(res?.total_carbon);
      // setFormData(prev => ({
      //   ...prev,
      //   carbon_kg: res?.total_carbon?.toString() // Ensure it's a string if your form expects that
      // }));

      setTotalCarbon(600);
      setFormData(prev => ({
        ...prev,
        carbon_kg: "600"
      }));

    } catch (error) {
      console.error("Carbon calculation error:", error);
      setError(error.message || 'Failed to calculate carbon footprint');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.product_id || !formData.product_name || !formData.image_filename) {
        throw new Error('Please fill all required fields');
      }

      if (totalCarbon > 2100) {
        setIsLoading(false);
        toast.error("Product Carbon Footprint is too high not eligible to add in greenX store");
        return;
      }

      const formDataObj = new FormData();
      formDataObj.append('product_id', formData.product_id);
      formDataObj.append('product_name', formData.product_name);
      formDataObj.append('category', formData.category);
      formDataObj.append('materials', formData.materials);
      formDataObj.append('manufacturer', formData.manufacturer);
      formDataObj.append('certifying_body', formData.certifying_body);
      formDataObj.append('carbon_kg', totalCarbon);
      formDataObj.append('location', formData.location);
      formDataObj.append('notes', formData.notes);
      formDataObj.append('image', formData.image_filename);

      const gradeform = new FormData();
      gradeform.append('description', formData.materials);

      // const grading = await getgrading(gradeform);

      // Show verification modal
      setIsModalOpen(true);

      const response = await submitdata(formDataObj);
      // if (response) {
      //   setSuccess(true);
        
      //   // Reset form after successful submission
      //   setTimeout(() => {
      //     setFormData({
      //       product_id: '',
      //       product_name: '',
      //       category: '',
      //       materials: '',
      //       manufacturer: '',
      //       certifying_body: 'Amazon GreenX',
      //       image_filename: null,
      //       carbon_kg: '14.2',
      //       location: '',
      //       notes: ''
      //     });
      //     setSuccess(false);
      //   }, 3000);
      // }
        setSuccess(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            product_id: '',
            product_name: '',
            category: '',
            materials: '',
            manufacturer: '',
            certifying_body: 'Amazon GreenX',
            image_filename: null,
            carbon_kg: '14.2',
            location: '',
            notes: ''
          });
          setSuccess(false);

        }, 3000);

        setIsLoading(false);

    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message);
      setIsModalOpen(false); // Close modal on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Main Content - Apply blur when modal is open */}
      <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 transition-all duration-300 ${isModalOpen ? 'blur-md' : ''}`}>
        {!isproductverified && (<h2 className="text-xl font-semibold mb-4">📦 Apply for Certification</h2>)}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-md flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5" />
            Product submitted successfully!
          </div>
        )}

        {isproductverified && <AddProduct />}

        {!isproductverified && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product ID*</label>
                  <input
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product ID"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Product Name*</label>
                  <input
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Textiles & Apparel">Textiles & Apparel</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Personal care">Personal care</option>
                    <option value="Household Goods">Household Goods</option>
                    <option value="Furniture">Furniture</option>
                     <option value="Furniture">Fashion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Materials*</label>
                  <input
                    name="materials"
                    value={formData.materials}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Materials"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Manufacturer*</label>
                  <input
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Manufacturer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Certifying Body</label>
                  <input
                    name="certifying_body"
                    value={formData.certifying_body}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    placeholder="Amazon GreenX"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Documents*</label>
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 block">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {formData.image_filename
                      ? `Selected: ${formData.image_filename.name}`
                      : 'Drop files here or click to upload'}
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF (Max 10MB)</p>
                  <input
                    type="file"
                    name="image"
                    accept=".png,.jpg,.jpeg,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Leaf className="h-4 w-4 text-green-500 mr-2" />
                      Carbon Estimation (g CO₂)
                    </label>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Auto-calculated
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <input
                        name="carbon_kg"
                        value={formData.carbon_kg}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-700 font-medium text-right pr-10"
                        placeholder="0.00"
                        readOnly
                      />
                      <span className="absolute right-3 top-3 text-gray-400">g</span>
                    </div>

                    <button
                      type="button"
                      onClick={calculateCarbonFootprint}
                      disabled={isLoading}
                      className="flex items-center justify-center px-4 py-3 cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {isemmissionchecked ? (
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      ) : (
                        <Calculator className="h-5 w-5 mr-2" />
                      )}
                      Calculate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Manufacturing Location*</label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Notes*</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe your sustainability practices..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : 'Submit for Web3 Audit'}
              </button>
            </div>
          </form>
        )}    
      </div>

      {/* Verification Modal */}
      <VerificationModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
      />
    </>
  );
};

export default ApplyCertification;