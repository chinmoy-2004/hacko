import React, { useState } from "react";
import { ShieldCheck, X, CheckCircle, Loader, ChevronLeft, Leaf, Award, Factory, Calendar } from 'lucide-react';
import useEcochainStore from "../store/ecochain.store.js";
import { useCart } from "../context/CartContext.jsx";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";




const EcoProductCard = ({ product }) => {
  const { dispatch } = useCart();
  const [verificationState, setVerificationState] = useState({
    status: 'idle', // 'idle', 'verifying', 'verified', 'invalid'
    data: null
  });
  const [showVerification, setShowVerification] = useState(false);

  const {verifyect} = useEcochainStore()

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      id: uuidv4(),
      quantity: 1
    };

    dispatch({ type: "ADD_TO_CART", payload: productToAdd });
    toast.success(`${product.title} added to cart!`);
  };

  const verifyECT = async (ectNo) => {
    console.log(ectNo)
    if (!ectNo) return;
    
    setVerificationState({ status: 'verifying', data: null });
    setShowVerification(true);
    
    // Simulate API call with 80% success rate
    const ectId=ectNo
    try {
      const data = await verifyect(ectId);
      
    
      const mockResponse =  {
        status: 'verified',
        data: {
          certificateBody: data.certifying_body,
          carbonSaved: data.carbon_kg,
          productName: data.product_name,
          issueDate: new Date(data.issued_at).toLocaleDateString(),
          expiryDate: new Date(
          new Date(data.issued_at).getTime() + 365 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
          manufacturer: product.brand,
          materials: data.materials,
          category:data.category|| "Personal Care"
        }
      } 
      
      setVerificationState(mockResponse);
      
      
    } catch (error) {
      setVerificationState({ 
        status: 'invalid', 
        error: 'Network error occurred' 
      });
      toast.error("Verification error occurred");
    }
  };

  const getGradingColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      case 'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const resetVerification = () => {
    setShowVerification(false);
    setVerificationState({ status: 'idle', data: null });
  };

  if (showVerification) {
    return (
      <div className="bg-white rounded-xl shadow-md border p-4 w-full h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b">
          <button 
            onClick={resetVerification}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to product
          </button>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            ECT Verification
          </span>
        </div>

        {/* Verification Content */}
        <div className="flex flex-col h-full">
          {verificationState.status === 'verifying' && (
            <div className="flex flex-col items-center justify-center flex-1 space-y-4">
              <div className="bg-blue-50 rounded-full p-4">
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Verifying ECT</h3>
                <p className="text-gray-500 text-sm">Checking certification database...</p>
              </div>
            </div>
          )}

          {verificationState.status === 'verified' && (
            <div className="flex-1 overflow-y-auto">
              {/* Success Header */}
              <div className="text-center mb-6">
                <div className="bg-green-50 rounded-full p-3 inline-flex mb-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Verified ✓</h3>
                <p className="text-gray-500 text-sm">Certificate is valid and authentic</p>
              </div>

              <div className="space-y-4">
                {/* Environmental Impact - Highlight */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center mb-2">
                    <Leaf className="w-4 h-4 mr-2 text-green-600" />
                    <h4 className="font-semibold text-green-800">Environmental Impact</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 mb-1">
                      {verificationState.data.carbonSaved} g Co2e
                    </div>
                    <div className="text-green-600 text-sm">Carbon footprint contains</div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Award className="w-4 h-4 mr-2 text-gray-600" />
                    <h4 className="font-semibold text-gray-800">Product Details</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Product:</span>
                      <span className="font-medium text-right">{verificationState.data.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Manufacturer:</span>
                      <span className="font-medium text-right">{verificationState.data.manufacturer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Materials:</span>
                      <span className="font-medium text-right">{verificationState.data.materials}</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Certificate Info</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Issued by:</span>
                      <span className="font-medium text-right">{verificationState.data.certificateBody}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valid until:</span>
                      <span className="font-medium text-right">{verificationState.data.expiryDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={resetVerification}
                className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}

          {verificationState.status === 'invalid' && (
            <div className="flex flex-col items-center justify-center flex-1 space-y-4 text-center">
              <div className="bg-red-50 rounded-full p-4">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Verification Failed</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  {verificationState.error || 'The ECT certificate could not be verified.'}
                </p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={resetVerification}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => verifyECT(product.ectNo)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border p-4 w-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 h-full">
      {/* Product Image */}
      <div className="relative mb-3">
        <img 
          src={product.image} 
          alt={product.title} 
          className="rounded-lg h-44 w-full object-cover" 
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}
          </div>
        )}
        <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
          🌿 Eco-Friendly
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 text-base leading-tight">{product.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <div className="flex text-yellow-400 mr-2">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </div>
          <span>({product.reviews})</span>
        </div>

        {/* ECT and Grading */}
        {product.ectNo && (
          <div className="mb-2 flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
            <span className="text-xs font-medium text-gray-600">ECT: {product.ectNo}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getGradingColor(product.grading)}`}>
              {product.grading}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        {/* Eco Score */}
        <div className="mb-3 flex items-center">
          <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
            {product.badge}
          </div>
          <span className="text-xs text-gray-500 font-medium">ECO SCORE</span>
        </div>

        {/* Certifications */}
        {product.certificates && (
          <div className="mb-3 flex flex-wrap gap-1">
            {product.certificates.slice(0, 3).map((cert, idx) => (
              <div key={idx} className="flex items-center bg-green-50 text-green-700 px-2 py-1 text-xs rounded-full border border-green-200">
                <span>{cert.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price and Actions */}
      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm line-through text-gray-400">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          {product.ectNo && (
            <button
              onClick={() => verifyECT(product.ectNo)}
              className="flex items-center text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-full transition-colors border border-blue-200 font-medium"
              title="Verify ECT Certificate"
            >
              <ShieldCheck className="w-3 h-3 mr-1" />
              Verify
            </button>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};



export default EcoProductCard;