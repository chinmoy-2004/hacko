// import React, { useState } from 'react';
// import useEcochainStore from '../store/ecochain.store.js';
// import {
//   Search, Globe, ShoppingCart, User, Terminal, ExternalLink, Zap,
//   CheckCircle, AlertCircle, Info, Upload, Copy, Key, Star,
//   FileText, Link, QrCode, ArrowRight
// } from 'lucide-react';
// import BlockchainDiagram from './Blockchaindia.jsx';

// // Simple reusable components
// const Button = ({ children, className = '', variant = 'default', size = 'default', onClick, ...props }) => {
//   const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';
//   const variants = {
//     default: 'bg-blue-600 text-white hover:bg-blue-700',
//     outline: 'border border-gray-300 bg-white hover:bg-gray-50',
//     ghost: 'hover:bg-gray-100',
//     secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
//   };
//   const sizes = {
//     default: 'h-10 px-4 py-2 text-sm',
//     sm: 'h-8 px-3 text-sm',
//     icon: 'h-10 w-10'
//   };

//   return (
//     <button
//       className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
//       onClick={onClick}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// const Input = ({ className = '', ...props }) => (
//   <input
//     className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
//     {...props}
//   />
// );

// const Card = ({ children, className = '' }) => (
//   <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
//     {children}
//   </div>
// );



// // Apply Certification Component
// const ApplyCertification = () => {
//   const [ismodalopen, setIsmodalopen] = useState(false);

//   const {submitdata}=useEcochainStore();
//    const [formData, setFormData] = useState({
//     product_id: '',
//     product_name: '',
//     category: '',
//     materials: '',
//     manufacturer: '',
//     certifying_body: 'Amazon GreenX',
//     image_filename: null,
//     carbon_kg: '14.2', // Auto-calculated value
//     location: '',
//     notes: ''
//   });

//   const handlesubmit = () => {
//     console.log("Form submitted with data:", formData);
//     submitdata(formData);
//     setIsmodalopen(true);
//   }

//   return (
//     <Card className="p-6">
//       <h2 className="text-xl font-semibold mb-4">📦 Apply for Certification</h2>

//       <div className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//            <div>
//             <label className="block text-sm font-medium mb-2">Product Id</label>
//             <Input placeholder="Enter product Id"  onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}/>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Product Name</label>
//             <Input placeholder="Enter product name" onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}/>
//           </div>

//          <div>
//             <label className="block text-sm font-medium mb-2">Category</label>
//             <select onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option>Select category</option>
//               <option>Textiles & Apparel</option>
//               <option>Food & Beverages</option>
//               <option>Electronics</option>
//               <option>Cosmetics</option>
//             </select>
//           </div>

//          <div>
//             <label className="block text-sm font-medium mb-2">Materials</label>
//             <Input placeholder="Materials" onChange={(e) => setFormData({ ...formData, materials: e.target.value })}/>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Manufacturer</label>
//             <Input placeholder="Manufacturer" onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}/>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2" >Certyfying Body</label>
//             <Input placeholder="Amazon GreenX" disabled onChange={(e) => setFormData({ ...formData, certifying_body: e.target.value })}/>
//           </div>
           
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Upload Documents</label>
//           <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 block">
//             <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
//             <p className="text-sm text-gray-600">Drop files here or click to upload</p>
//             <p className="text-xs text-gray-500">PDF, Images (Max 10MB)</p>

//             {/* Hidden file input */}
//             <input
//               type="file"
//               accept=".pdf,image/*"
//               className="hidden"
//               onChange={(e) => setFormData({ ...formData, image_filename: e.target.files[0] })}
//             />
//           </label>
//         </div>


//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Carbon Estimation (kg CO₂)</label>
//             <Input placeholder="Auto-calculated: 14.2" disabled onChange={(e) => setFormData({ ...formData, carbon_kg: e.target.value })}/>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Manufacturing Location</label>
//             <Input placeholder="Enter location" onChange={(e) => setFormData({ ...formData, location: e.target.value })}/>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Additional Notes</label>
//           <textarea
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="3"
//             placeholder="Describe your sustainability practices..."
//             onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//           />
//         </div>

//         <Button onClick={handlesubmit} className="w-full">Submit for Web3 Audit</Button>

       
//       </div>

//        {ismodalopen ? (
//           <div className="mt-12">
//             <BlockchainDiagram />
//           </div>
//         ) : null}

//     </Card>

              
//   );
// };

// export default ApplyCertification;
import React, { useState } from 'react';
import useEcochainStore from '../store/ecochain.store.js';
import {
  Upload, AlertCircle, CheckCircle, Loader2
} from 'lucide-react';
import BlockchainDiagram from './Blockchaindia.jsx';
const ApplyCertification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { submitdata } = useEcochainStore();

  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Basic validation
      if (!formData.product_id || !formData.product_name || !formData.image_filename) {
        throw new Error('Please fill all required fields');
      }

      // Create FormData for file upload
      const formDataObj = new FormData();
      formDataObj.append('product_id', formData.product_id);
      formDataObj.append('product_name', formData.product_name);
      formDataObj.append('category', formData.category);
      formDataObj.append('materials', formData.materials);
      formDataObj.append('manufacturer', formData.manufacturer);
      formDataObj.append('certifying_body', formData.certifying_body);
      formDataObj.append('carbon_kg', formData.carbon_kg);
      formDataObj.append('location', formData.location);
      formDataObj.append('notes', formData.notes);
      formDataObj.append('image', formData.image_filename);
      
      // Update store and UI
      await submitdata(formDataObj);
      setSuccess(true);
      setIsModalOpen(true);
      
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
            <div>
              <label className="block text-sm font-medium mb-2">Carbon Estimation (kg CO₂)</label>
              <input
                name="carbon_kg"
                value={formData.carbon_kg}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                placeholder="Auto-calculated: 14.2"
                disabled
              />
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

      {isModalOpen && (
        <div className="mt-12">
          <BlockchainDiagram />
        </div>
      )}
    </div>
  );
};

export default ApplyCertification;