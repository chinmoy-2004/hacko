

import React, { useState } from 'react';
import useEcochainStore from '../store/ecochain.store.js';
import {
  Upload, AlertCircle, CheckCircle, Loader2,
  Leaf,
  Calculator
} from 'lucide-react';
import BlockchainDiagram from './Blockchaindia.jsx';
import useCarbonKarmaStore from '../store/carbonKarma.store.js';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom';

const ApplyCertification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const { submitdata, isproductverified } = useEcochainStore();
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
      const res = await CheckEmmission(formDataObj);

      // Update both the totalCarbon state and formData
      setTotalCarbon(res?.total_carbon);
      setFormData(prev => ({
        ...prev,
        carbon_kg: res?.total_carbon?.toString() // Ensure it's a string if your form expects that
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
        setIsLoading(false)

        toast.error("Product Carbon Footprint is too high not eligible to add in greenX store")
        setIsLoading(false)
        return


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

      const response = await submitdata(formDataObj);
      if (response) {
        setProducts(response.slice(0, 10)); // Update products with top 10 from response
        setSuccess(true);
        setIsModalOpen(true);
      }

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

    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">📦 Apply for Certification</h2>

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
                    {/* Leaf icon for eco-friendly visual cue */}
                    <Leaf className="h-4 w-4 text-green-500 mr-2" />
                    Carbon Estimation (kg CO₂)
                  </label>
                  {/* Auto-calculated badge */}
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Auto-calculated
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Input container with kg suffix */}
                  {/* In your carbon estimation input section */}
                  <div className="relative flex-1">
                    <input
                      name="carbon_kg"
                      value={formData.carbon_kg}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-700 font-medium text-right pr-10"
                      placeholder="0.00"
                      readOnly // Changed from disabled to readOnly for better accessibility
                    />
                    <span className="absolute right-3 top-3 text-gray-400">kg</span>
                  </div>

                  {/* Calculate button */}
                  <button
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


      {isproductverified && (
        <div className="mt-8 flex justify-center">
          <Link to="/addproduct" className="w-full max-w-md">
          <button
            className="
        bg-green-600 hover:bg-green-700 
        text-white font-medium 
        py-3 px-6 rounded-full
        shadow-md hover:shadow-lg
        transition-all duration-300
        flex items-center
        group
      "
          >
            <Leaf className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="text-lg">Add Your Eco Product</span>
            <svg
              className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          </Link>
        </div>
      )}



      {/* Products Table */}
      {products.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">🌿 Recent Certified Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ECT ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbon (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.ect_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.product_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.manufacturer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.carbon_kg}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.eco_certified ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Certified
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="mt-12">
          <BlockchainDiagram />
        </div>
      )}
    </div>
  );
};

export default ApplyCertification;