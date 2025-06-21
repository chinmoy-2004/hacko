import React, { useState, useEffect } from "react";
import { Package, Coins, Star, Leaf, ShoppingCart, ShoppingBasket, Menu, X, PlusCircle, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import useRecommendStore from "../store/recommend.store.js";

const availableItems = [
  { name: "Atta", unitPrice: 40 },
  { name: "Daal", unitPrice: 60 },
  { name: "Rice", unitPrice: 50 },
  { name: "Sugar", unitPrice: 30 },
  { name: "Milk", unitPrice: 25 },
  { name: "Salt", unitPrice: 20 },
];

const GreenGather = () => {
  const [items, setItems] = useState([
    { name: "Atta", quantity: 5 },
    { name: "Daal", quantity: 5 },
    { name: "Milk", quantity: 1 },
  ]);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };
const getTotalPrice = () => {
  return items.reduce((sum, item) => {
    const found = availableItems.find((i) => i.name === item.name);
    return sum + (found ? found.unitPrice * item.quantity : 0);
  }, 0);
};

const originalPrice = getTotalPrice();
const discountRate = 0.15;
const discountedPrice = originalPrice - originalPrice * discountRate;
  const { dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);
  const { isrecommendationsLoading, personalized } = useRecommendStore.getState();


  const handleAddToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.product_id,
        title: product.name,
        price: product.price,
        originalPrice: product.price > 500 ? Math.floor(product.price * 1.2) : null,
        coins: Math.floor(product.eco_score * 1.5),
        savings: product.price > 500 ? `Save ${Math.floor(Math.random() * 10) + 10}%` : null,
        image: product.image_url,
        plastic: Math.min(100, product.eco_score + 15)
      }
    });
    toast.success(`${product.name} added to cart!`);
  };

  const productA = {
    name: "Organic Detergent A",
    price: 299,
    rating: 4.5,
    carbonSaved: 25,
    coins: 150,
    stock: "Available",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop",
  };

  const productB = {
    name: "Eco Detergent B",
    price: 349,
    rating: 4.2,
    carbonSaved: 18,
    coins: 100,
    stock: "Limited Stock",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop",
  };

  const betterProduct = productA.carbonSaved > productB.carbonSaved ? productA : productB;

  if (isrecommendationsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Product Recommendations */}
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Product Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalized.map((product) => (
            <div key={product.product_id} className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-lg transition">
              <div className="relative mb-4">
                <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                {product.price > 500 && (
                  <div className="absolute top-2 right-2 bg-green-200 text-green-700 text-xs px-3 py-1 rounded-full">
                    Save {Math.floor(Math.random() * 10) + 10}%
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <span className="text-xl font-bold">₹{product.price}</span>
                {product.price > 500 && (
                  <span className="ml-2 text-gray-500 line-through">
                    ₹{Math.floor(product.price * 1.2)}
                  </span>
                )}
              </div>
              <div className="flex justify-between text-sm mb-4">
                <div className="flex items-center">
                  <Coins className="w-4 h-4 mr-1 text-yellow-400" />
                  +{Math.floor(product.eco_score * 1.5)} Coins
                </div>
                <div className="flex items-center text-green-600">
                  <Leaf className="w-4 h-4 mr-1" />
                  {Math.min(100, product.eco_score + 15)}% less carbon
                </div>
              </div>
              <button
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-md"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Weekly Green Subscription</h2>

        <div className="border-2 border-green-300 rounded-lg bg-green-50 p-8 flex flex-col gap-6">

          {/* Items Selector */}
          {items.map((item, index) => (
            <div key={index} className="flex flex-wrap items-center gap-4">
              <select
                value={item.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
                className="p-2 border rounded-md w-40"
              >
                <option value="">Select Item</option>
                {availableItems.map((i) => (
                  <option key={i.name} value={i.name}>
                    {i.name} – ₹{i.unitPrice}/{i.name === "Milk" ? "L" : "kg"}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                className="p-2 border rounded-md w-24"
                placeholder="Qty"
              />

              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 text-green-600 font-medium hover:text-green-800"
          >
            <PlusCircle className="w-5 h-5" /> Add Another Item
          </button>

          {/* Summary */}
          <div className="flex flex-col lg:flex-row justify-between items-center mt-6 gap-6">
            <div className="flex gap-6">
              <div className="bg-white p-4 rounded-lg text-center w-32">
                <div className="text-2xl text-green-600 font-bold">25%</div>
                <div className="text-sm">Carbon Savings</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center w-32">
                <div className="flex justify-center items-center">
                  <Coins className="w-5 h-5 mr-1 text-yellow-500" />
                  <span className="text-2xl font-bold text-yellow-500">200</span>
                </div>
                <div className="text-sm">Coin Rewards</div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-700 mb-2">
                ₹{discountedPrice.toFixed(2)}
              </div>
              <div className="line-through text-gray-500 mb-1">₹{originalPrice.toFixed(2)}</div>
              <div className="text-sm text-green-600 font-medium mb-4">You save 15%!</div>

              <div className="space-3 flex gap-4">
                <button className="w-60 bg-green-600 text-white py-3 font-semibold hover:bg-green-700 rounded-md cursor-pointer">
                  Subscribe Now
                </button>
                <button className="w-60 border border-green-600 text-green-600 py-3 hover:bg-green-200 font-semibold rounded-md cursor-pointer">
                  Add to Basket
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* Compare Eco Products */}
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Compare Eco Products</h2>
        <div className="bg-white border rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Product A */}
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-4">
                <img src={productA.image} alt={productA.name} className="w-full h-full object-cover rounded-md" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{productA.name}</h3>
              <p className="mb-1">Price: {productA.price}</p>
              <div className="flex justify-center items-center mb-1">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{productA.rating} Quality</span>
              </div>
              <p className="text-green-600 font-medium">✓ {productA.stock}</p>
              <p className="text-green-500 font-medium">{productA.carbonSaved}% Carbon Saved</p>
            </div>

            {/* VS Section */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-5xl font-extrabold text-green-600 mb-4">VS</div>
              <button
                className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-100 font-medium"
                onClick={() => setShowModal(true)}
              >
                Compare More
              </button>
            </div>

            {/* Product B */}
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-4">
                <img src={productB.image} alt={productB.name} className="w-full h-full object-cover rounded-md" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{productB.name}</h3>
              <p className="mb-1">Price: {productB.price}</p>
              <div className="flex justify-center items-center mb-1">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{productB.rating} Quality</span>
              </div>
              <p className="text-orange-600 font-medium">⚠ {productB.stock}</p>
              <p className="text-green-500 font-medium">{productB.carbonSaved}% Carbon Saved</p>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-1/2 h-1/3 items-center justify-center relative">
              <button className="absolute top-2 right-2 text-gray-600" onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold mb-4 text-center">Comparison Result</h3>
              <div className="text-center">
                <p className="mb-2 text-lg font-semibold">
                  🌿 Better Eco Choice: <span className="text-green-600">{betterProduct.name}</span>
                </p>
                <p className="mb-2 flex justify-center items-center">
                  <Leaf className="w-5 h-5 text-green-500 mr-2" /> {betterProduct.carbonSaved}% Carbon Saved
                </p>
                <p className="mb-2 flex justify-center items-center">
                  <Coins className="w-5 h-5 text-yellow-500 mr-2" /> Earned: {betterProduct.coins} Green Coins
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Carbon Karma Badge */}
      <div className="container mx-auto py-8">
        <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 rounded-lg py-6 px-36 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Carbon Karma AI Active</h3>
            <p className="text-sm text-gray-700">Your choices this month saved 45kg CO₂ equivalent</p>
          </div>
          <div className="bg-green-600 text-white text-lg font-semibold px-6 py-2 rounded-full">
            Extra 15% Carbon Savings
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenGather;