import { Shield, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const OrderSummary = () => {
  const {
    cart,
    subtotal,
    discount,
    shippingBase,
    shippingFee,
    carbonOffsetFee,
    total,
    ecoDiscountEnabled,
    useGreenCoins,
    carbonOffset,
    toggleEcoDiscount,
    toggleGreenCoins,
    toggleCarbonOffset,
  } = useCart();

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
            <span>Subtotal ({cart.length} items)</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          {ecoDiscountEnabled && (
            <div className="flex justify-between text-green-600">
              <span>Eco Discount (10%)</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Shipping</span>
            <span
              className={`${shippingFee === 0 ? "text-green-600 font-medium" : ""}`}
            >
              {shippingFee === 0 ? "Free" : `₹${shippingBase}`}
            </span>
          </div>
          {carbonOffsetFee > 0 && (
            <div className="flex justify-between">
              <span>Carbon Offset</span>
              <span>₹{carbonOffsetFee}</span>
            </div>
          )}
        </div>

        {/* Eco Discount Option */}
        <div className="border-t pt-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="eco-discount"
                checked={ecoDiscountEnabled}
                onChange={(e) => toggleEcoDiscount(e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mt-0.5"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="eco-discount"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Apply Eco Discount ♻️
                </label>
                <p className="text-xs text-gray-500">
                  Save 10% on this order by shopping sustainably
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Reward Checkbox */}
        <div className="border-t pt-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="greencoin-shipping"
                checked={useGreenCoins}
                onChange={(e) => toggleGreenCoins(e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mt-0.5"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="greencoin-shipping"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Redeem GreenCoins for free shipping 🚚
                </label>
                <p className="text-xs text-gray-500">
                  Use 40 GreenCoins to waive off ₹{shippingBase} shipping fee
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carbon Offset Option */}
        <div className="border-t pt-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="carbon-offset"
                checked={carbonOffset}
                onChange={(e) => toggleCarbonOffset(e.target.checked)}
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
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <Link to="/check-out">
          <button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-lg flex items-center justify-center gap-2">
            <Leaf className="h-5 w-5" />
            Proceed to Eco Checkout
          </button>
        </Link>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <Shield className="h-3 w-3" />
          Secure Transaction • SSL Encrypted
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
