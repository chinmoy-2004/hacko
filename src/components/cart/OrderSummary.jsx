import { Shield, Leaf } from "lucide-react";

const OrderSummary = ({ 
  cartItems, 
  subtotal, 
  discount, 
  shipping, 
  carbonOffset, 
  carbonOffsetFee,
  onCarbonOffsetToggle,
  total 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border sticky top-24">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Order Summary
        </h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({cartItems.length} items)</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Eco Discount</span>
            <span>-₹{discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          {carbonOffsetFee > 0 && (
            <div className="flex justify-between">
              <span>Carbon Offset</span>
              <span>₹{carbonOffsetFee}</span>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          {/* Carbon Offset Option */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <input 
                type="checkbox"
                id="carbon-offset"
                checked={carbonOffset}
                onChange={(e) => onCarbonOffsetToggle(e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mt-0.5"
              />
              <div className="grid gap-1.5 leading-none">
                <label 
                  htmlFor="carbon-offset" 
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Add ₹20 to offset carbon footprint 🌍
                </label>
                <p className="text-xs text-gray-500">
                  Make your order 100% carbon neutral
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-lg flex items-center justify-center gap-2">
          <Leaf className="h-5 w-5" />
          Proceed to Eco Checkout
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <Shield className="h-3 w-3" />
          Secure Transaction • SSL Encrypted
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
