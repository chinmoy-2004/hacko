import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";  // ✅ unique id generator

const EcoProductCard = ({ product }) => {
  const { dispatch } = useCart();

  
const handleAddToCart = () => {
  const productToAdd = {
    ...product,
    id: uuidv4(),  // ✅ assign unique id on every add
    quantity: 1
  };

  dispatch({ type: "ADD_TO_CART", payload: productToAdd });
  toast.success(`${product.title} added to cart!`);
};


  return (
    <div className="bg-white rounded-lg shadow-md border p-4 w-[20vw] flex flex-col justify-between mx-4">
      <div className="relative">
        <img src={product.image} alt={product.title} className="rounded-md h-44 w-full object-cover" />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.discount}
          </div>
        )}
        <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
          🌿 Eco-Friendly
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-gray-800">{product.title}</h3>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <div className="flex text-yellow-400 mr-1">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </div>
          <span>({product.reviews})</span>
        </div>
      </div>

      <div className="bg-green-50 p-3 mt-3 rounded-lg border border-green-100 text-sm text-gray-700">
        <div className="flex items-center mb-2">
          <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
            {product.badge}
          </div>
          ECO BADGE
        </div>
        <div className="mb-1">This badge certifies the product's eco-friendly and sustainable attributes.</div>
        <div className="mt-2">
          <div className="flex justify-between">
            <span>Plastic Reduced</span>
            <span className="font-semibold">{product.plastic}%</span>
          </div>
          <div className="h-2 bg-green-100 rounded-full mb-2">
            <div className="h-2 bg-green-500 rounded-full" style={{ width: `${product.plastic}%` }}></div>
          </div>

          <div className="flex justify-between">
            <span>Chemical Reduced</span>
            <span className="font-semibold">{product.chemical}%</span>
          </div>
          <div className="h-2 bg-green-100 rounded-full mb-2">
            <div className="h-2 bg-green-500 rounded-full" style={{ width: `${product.chemical}%` }}></div>
          </div>
          <div>♻️ Recyclable</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {product.certificates.map((cert, idx) => (
          <div key={idx} className="flex items-center bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
            {cert.icon} <span className="ml-1">{cert.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="text-lg font-bold text-gray-800">${product.price}</div>
        {product.originalPrice && (
          <div className="text-sm line-through text-gray-400">${product.originalPrice}</div>
        )}
      </div>

      <button onClick={handleAddToCart} className="mt-4 bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  );
};

export default EcoProductCard;
