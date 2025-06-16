import React, { useState } from "react";
import { Package, Coins, Star, Leaf, ShoppingCart, ShoppingBasket, Menu, X } from "lucide-react";

const GreenGather = () => {
    const recommendedProducts = [
        {
            id: 1,
            name: "Bamboo Toothbrush",
            price: "₹299",
            originalPrice: "₹399",
            coins: "50",
            savings: "Save 20%",
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
            carbonSavings: "15% less carbon"
        },
        {
            id: 2,
            name: "Organic Rice 5kg",
            price: "₹749",
            originalPrice: "₹899",
            coins: "75",
            savings: "Save 17%",
            image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
            carbonSavings: "25% less carbon"
        },
        {
            id: 3,
            name: "Eco Cotton Towels",
            price: "₹1,299",
            originalPrice: "₹1,599",
            coins: "120",
            savings: "Save 19%",
            image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop",
            carbonSavings: "30% less carbon"
        },
        {
            id: 4,
            name: "Natural Soap Pack",
            price: "₹449",
            originalPrice: "₹599",
            coins: "65",
            savings: "Save 25%",
            image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=300&fit=crop",
            carbonSavings: "20% less carbon"
        }
    ];

    const [showModal, setShowModal] = useState(false);

  const productA = {
    name: "Organic Detergent A",
    price: "₹299",
    rating: 4.5,
    carbonSaved: 25,
    coins: 150,
    stock: "Available",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop"
  };

  const productB = {
    name: "Eco Detergent B",
    price: "₹349",
    rating: 4.2,
    carbonSaved: 18,
    coins: 100,
    stock: "Limited Stock",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop"
  };

  const betterProduct = productA.carbonSaved > productB.carbonSaved ? productA : productB;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Product Recommendations */}
            <div className="container mx-auto py-8">
                <h2 className="text-3xl font-bold mb-6">Product Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendedProducts.map(product => (
                        <div key={product.id} className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-lg transition">
                            <div className="relative mb-4">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                                <div className="absolute top-2 right-2 bg-green-200 text-green-700 text-xs px-3 py-1 rounded-full">{product.savings}</div>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                            <div className="flex items-center mb-2">
                                <span className="text-xl font-bold">{product.price}</span>
                                <span className="ml-2 text-gray-500 line-through">{product.originalPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-4">
                                <div className="flex items-center">
                                    <Coins className="w-4 h-4 mr-1 text-yellow-400" />
                                    +{product.coins} Coins
                                </div>
                                <div className="flex items-center text-green-600">
                                    <Leaf className="w-4 h-4 mr-1" />
                                    {product.carbonSavings}
                                </div>
                            </div>
                            <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-md">Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subscription Box */}
            <div className="container mx-auto py-8">
                <h2 className="text-3xl font-bold mb-6">Weekly Green Subscription</h2>

                <div className="border-2 border-green-300 rounded-lg bg-green-50 p-8 flex flex-col lg:flex-row justify-between">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-4">Essential Bundle</h3>
                        <ul className="space-y-2 mb-6">
                            <li>✔ Atta 5kg</li>
                            <li>✔ Daal 5kg</li>
                            <li>✔ Milk</li>
                        </ul>
                        <div className="flex space-x-6 mb-6">
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
                    </div>

                    <div className="text-center flex-1">
                        <div className="text-4xl font-bold mb-2">₹1,499</div>
                        <div className="line-through text-gray-500 mb-4">₹1,899</div>
                        <div className="space-y-3">
                            <button className="w-full bg-green-600 text-white py-3 font-semibold hover:bg-green-700 rounded-md cursor-pointer">Subscribe Now</button>
                            <button className="w-full border border-green-600 text-green-600 py-3 hover:bg-green-200 font-semibold rounded-md cursor-pointer">Add to Basket</button>
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
