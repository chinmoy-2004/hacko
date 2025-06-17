import { useState } from "react";
import { ArrowLeft, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import EcoImpactCard from "../components/cart/EcoImpactCard";
import SavedItems from "../components/cart/SavedItems";
import SustainabilityTips from "../components/cart/SustainabilityTips";
import FrequentlyBoughtTogether from "../components/cart/FrequentlyBoughtTogether";
import { useCart } from "../context/CartContext";  // ✅ Use context

const Cart = () => {
  const { cart, dispatch } = useCart();

  const [savedItems] = useState([
    {
      id: "3",
      name: "Solar-Powered Garden Lights",
      price: 3499,
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400",
      certifications: ["Energy Star", "Recyclable"]
    }
  ]);

  const [carbonOffset, setCarbonOffset] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQuantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const toggleGiftOption = (id) => {
    const updatedItem = cart.find(item => item.id === id);
    if (updatedItem) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id, quantity: updatedItem.quantity }
      });
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 500;
  const shipping = 0;
  const carbonOffsetFee = carbonOffset ? 20 : 0;
  const total = subtotal - discount + shipping + carbonOffsetFee;

  const totalCarbonSaved = cart.reduce((sum, item) => sum + (parseFloat(item.carbonSaved || 0) * item.quantity), 0);
  const totalWaterSaved = Math.round(totalCarbonSaved * 15);
  const supportedArtisans = cart.length * 3;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-100 border-b border-green-200 py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-800 text-sm font-medium">
            🌿 Every order helps plant trees • Free carbon-neutral shipping on orders above ₹1000
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  Your Eco Cart ({cart.length} items)
                </h1>
              </div>

              <div className="divide-y">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                    onToggleGift={toggleGiftOption}
                  />
                ))}
              </div>
            </div>

            <SavedItems savedItems={savedItems} />
            <SustainabilityTips />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <OrderSummary 
                cartItems={cart}
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                carbonOffset={carbonOffset}
                carbonOffsetFee={carbonOffsetFee}
                onCarbonOffsetToggle={setCarbonOffset}
                total={total}
              />
              <EcoImpactCard 
                totalCarbonSaved={totalCarbonSaved}
                totalWaterSaved={totalWaterSaved}
                supportedArtisans={supportedArtisans}
              />
            </div>

            <FrequentlyBoughtTogether />
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          {/* Your footer */}
        </div>
      </footer>
    </div>
  );
};

export default Cart;
