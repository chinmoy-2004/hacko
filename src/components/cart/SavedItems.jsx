import { useCart } from "../../context/CartContext";
import { Gift, MapPin, Trash2, Heart } from "lucide-react";

const SavedItems = ({ savedItems, setSavedItems }) => {
  const { dispatch } = useCart();

  const handleMoveToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity: 1 } });
    setSavedItems(prev => prev.filter(saved => saved.id !== item.id));
  };

  const handleRemoveSaved = (itemId) => {
    setSavedItems(prev => prev.filter(saved => saved.id !== itemId));
  };

  if (savedItems.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Saved for Later ({savedItems.length} items)</h2>
      </div>
      <div className="p-6 space-y-6">
        {savedItems.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row gap-4 border-b pb-6">
            
            {/* Product Image */}
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 hover:text-green-600 cursor-pointer">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">Sold by {item.seller || "Eco Seller"}</p>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2">
                {(item.certifications || []).map((cert, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-700 border border-green-200 px-2 py-1 rounded text-xs"
                  >
                    {cert.icon} {cert.name || cert}
                  </span>
                ))}
              </div>

              {/* Delivery & Eco Tag */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-green-600">✓ In Stock</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Eco-friendly shipping: {item.delivery || "3–5 days"}
                </p>
                <p className="text-sm font-medium text-green-700 flex items-center gap-1">
                  🌱 {item.plastic || 0}% Plastic Reduced
                </p>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-xl font-bold text-gray-900">
                  ₹{item.price.toLocaleString()}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-medium"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveSaved(item.id)}
                    className="text-gray-500 hover:text-red-600 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    className="text-gray-500 hover:text-green-600 p-2"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Links */}
              <div className="flex gap-4 text-sm">
                <button className="text-green-600 hover:text-green-700 font-medium">
                  Save for later
                </button>
                <button className="text-green-600 hover:text-green-700 font-medium">
                  Move to wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItems;
