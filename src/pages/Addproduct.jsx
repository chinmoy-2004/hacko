import React, { useState } from 'react';
import { Package, Leaf, Image as ImageIcon, Type, Tag, Hash, DollarSign, BookOpen } from 'lucide-react';
import useEcochainStore from '../store/ecochain.store.js';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    image: null,
    description: ''
  });

  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addproduct  } = useEcochainStore.getState();

  const ect_id = useEcochainStore(state => state.ect_id);
  const grade = useEcochainStore(state => state.grade);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.name || !formData.category || !formData.brand || !formData.price || !formData.description) {
      toast.warning('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    console.log(ect_id);

    const submitdata = new FormData();
    submitdata.append('name', formData.name);
    submitdata.append('category', formData.category);
    submitdata.append('brand', formData.brand);
    submitdata.append('price', formData.price);
    submitdata.append('description', formData.description);
    submitdata.append('ect_no', ect_id); // Add ect_id from ecochain store
    submitdata.append('eco_score',80)
    submitdata.append('grading', grade); // Add grade from ecochain store
    if (formData.image) {
      submitdata.append('image_file', formData.image);
    }

    try {
      await addproduct(submitdata);
      console.log('Product submitted:', formData);
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        brand: '',
        price: '',
        image: null,
        description: ''
      });
      setPreviewUrl('');
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-7 mb-7 p-6 bg-white rounded-lg ">
      <h1 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
        <Package className="mr-2" /> Add New Eco Product
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Type className="mr-2 h-4 w-4" /> Product Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Bamboo Toothbrush"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Tag className="mr-2 h-4 w-4" /> Category*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Fashion">Fashion</option>
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Hash className="mr-2 h-4 w-4" /> Brand*
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="EcoBrand"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="mr-2 h-4 w-4" /> Price (₹)*
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="299"
                min="0"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <ImageIcon className="mr-2 h-4 w-4" /> Product Image*
            </label>
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 block">
              <div className="flex flex-col items-center justify-center">
                <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.image 
                    ? `Selected: ${formData.image.name}`
                    : 'Drop files here or click to upload'}
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                <input 
                  type="file" 
                  name="image"
                  className="hidden" 
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
              </div>
            </label>
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="h-32 object-contain rounded-md border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <BookOpen className="mr-2 h-4 w-4" /> Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Describe your eco-friendly product..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 cursor-pointer transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <Package className="h-5 w-5" />
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;