import { Minus, Plus, Heart, Gift, Trash2, MapPin } from "lucide-react";
import { useCart } from "../../context/CartContext";  // <-- Make sure this path is correct

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: newQuantity } });
  };

  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
  };

  const handleToggleGift = () => {
    dispatch({
      type: "TOGGLE_GIFT_OPTION",
      payload: item.id,
    });
  };

  return (
    <div className="p-6 border-b">
      <div className="flex flex-col md:flex-row gap-4">

        {/* Product Image */}
        <div className="flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 hover:text-green-600 cursor-pointer">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">Sold by {item.seller || "Eco Seller"}</p>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-2">
            {(item.certificates || []).map((cert, idx) => (
              <span key={idx} className="bg-green-100 text-green-700 border border-green-200 px-2 py-1 rounded text-xs">
                {cert.icon} {cert.name}
              </span>
            ))}
          </div>

          {/* Stock & Delivery */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-green-600">✓ In Stock</p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Eco-friendly shipping: {item.delivery || "3-5 days"}
            </p>
            <p className="text-sm font-medium text-green-700 flex items-center gap-1">
              🌱 {item.plastic}% Plastic Reduced
            </p>
          </div>

          {/* Gift Option */}
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox"
              id={`gift-${item.id}`}
              checked={item.giftOption || false}
              onChange={handleToggleGift}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor={`gift-${item.id}`} className="text-sm text-gray-600 flex items-center gap-1">
              <Gift className="h-3 w-3" />
              This is a gift
            </label>
          </div>

          {/* Price & Quantity */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold text-gray-900">
                ₹{(item.price * item.quantity).toLocaleString()}
              </div>
              {item.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ₹{(item.originalPrice * item.quantity).toLocaleString()}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-l-lg flex items-center justify-center"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-r-lg flex items-center justify-center"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={handleRemove}
                  className="text-gray-500 hover:text-red-600 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button className="text-gray-500 hover:text-green-600 p-1">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Links */}
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
    </div>
  );
};

export default CartItem;
