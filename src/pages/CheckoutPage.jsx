import { useState } from 'react';
import { Truck, Zap, Gift, Leaf, MapPin, ShoppingBag, ArrowLeft, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Adjust the path as necessary

const CheckoutPage = () => {
    const { cart, subtotal, discount, shippingFee, carbonOffsetFee, total, ecoDiscountEnabled } = useCart();

  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [packagingOption, setPackagingOption] = useState('minimal');
  const [savedAddress, setSavedAddress] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(Boolean(!savedAddress));

  const cartItems = [
    { id: 1, name: 'Organic Cotton T-Shirt', price: 899, quantity: 2, image: '/tshirt.jpg' },
    { id: 2, name: 'Bamboo Toothbrush Set', price: 299, quantity: 1, image: '/toothbrush.jpg' }
  ];
  const deliveryFee = deliveryOption === 'express' ? 29 : 0;
  const packagingFee =
  packagingOption === "gift"
    ? 25
    : packagingOption === "none"
    ? 10
    : 0;
  const finalTotal = total + packagingFee + deliveryFee + carbonOffsetFee;

  const getDeliveryDate = () => {
    const today = new Date();
    if (deliveryOption === 'express') {
      const estDate = new Date(today.setDate(today.getDate() + 3));
      return `Arrives by ${estDate.toLocaleDateString()}`;
    } else {
      const minDate = new Date(today.setDate(today.getDate() + 5));
      const maxDate = new Date(today.setDate(today.getDate() + 2));
      return `Arrives by ${minDate.toLocaleDateString()} - ${maxDate.toLocaleDateString()}`;
    }
  };

  // Save button handler
  const handleSaveAddress = (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const formData = new FormData(form);
    setSavedAddress({
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      addressLine: formData.get('addressLine'),
      city: formData.get('city'),
      state: formData.get('state'),
      pincode: formData.get('pincode'),
    });
    setIsEditingAddress(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/cart">
          <button className="flex items-center text-green-700 mb-6">
            <ArrowLeft className="mr-1 h-5 w-5" /> Back to Cart
          </button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold text-green-800 flex items-center mb-6">
              <Leaf className="mr-2 h-5 w-5" /> Delivery & Packaging
            </h2>

            {/* Delivery Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Delivery Details
              </h3>

              {/* Show saved address if exists and not editing */}
              {savedAddress && !isEditingAddress ? (
                <div className="space-y-2">
                  <div><strong>Name:</strong> {savedAddress.fullName}</div>
                  <div><strong>Phone:</strong> {savedAddress.phone}</div>
                  <div><strong>Address:</strong> {savedAddress.addressLine}, {savedAddress.city}, {savedAddress.state} - {savedAddress.pincode}</div>
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(true)}
                    className="mt-3 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
                  >
                    Edit Address
                  </button>
                </div>
              ) : (
                <form>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        name="fullName"
                        type="text"
                        defaultValue={savedAddress?.fullName || 'John Doe'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        defaultValue={savedAddress?.phone || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        Address <MapPin className="ml-1 h-4 w-4" />
                      </label>
                      <textarea
                        name="addressLine"
                        rows={3}
                        defaultValue={savedAddress?.addressLine || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          name="city"
                          type="text"
                          defaultValue={savedAddress?.city || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          name="state"
                          type="text"
                          defaultValue={savedAddress?.state || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode
                        </label>
                        <input
                          name="pincode"
                          type="text"
                          defaultValue={savedAddress?.pincode || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveAddress}
                    className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
                  >
                    Save this address
                  </button>
                </form>
              )}
            </div>


            {/* Delivery Options */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Options</h3>
              
              <div className="space-y-3">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${deliveryOption === 'standard' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  onClick={() => setDeliveryOption('standard')}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <Truck className={`h-5 w-5 mr-3 ${deliveryOption === 'standard' ? 'text-green-600' : 'text-gray-500'}`} />
                      <div>
                        <h4 className="font-medium text-gray-900">Standard Delivery</h4>
                        <p className="text-sm text-gray-600">5-7 business days</p>
                        <p className="text-sm text-green-700 mt-1 flex items-center">
                          <Leaf className="mr-1 h-4 w-4" /> Standard delivery helps reduce emissions
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">FREE</span>
                  </div>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${deliveryOption === 'express' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  onClick={() => setDeliveryOption('express')}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <Zap className={`h-5 w-5 mr-3 ${deliveryOption === 'express' ? 'text-green-600' : 'text-gray-500'}`} />
                      <div>
                        <h4 className="font-medium text-gray-900">Express Delivery</h4>
                        <p className="text-sm text-gray-600">2-3 business days</p>
                      </div>
                    </div>
                    <span className="font-medium">₹29</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Packaging Options */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Packaging Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${packagingOption === 'minimal' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  onClick={() => setPackagingOption('minimal')}
                >
                  <div className="flex items-start mb-2">
                    <Recycle className={`h-5 w-5 mr-2 ${packagingOption === 'minimal' ? 'text-green-600' : 'text-gray-500'}`} />
                    <h4 className="font-medium text-gray-900">Minimal Packaging</h4>
                  </div>
                  <p className="text-xs text-gray-600">Our default Cardboard packaging</p>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${packagingOption === 'gift' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  onClick={() => setPackagingOption('gift')}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start">
                      <Gift className={`h-5 w-5 mr-2 ${packagingOption === 'gift' ? 'text-green-600' : 'text-gray-500'}`} />
                      <h4 className="font-medium text-gray-900">Gift Packaging</h4>
                    </div>
                    <span className="text-sm font-medium">+₹25</span>
                  </div>
                  <p className="text-xs text-gray-600">Recyclable gift wrap with seed paper along with normal packaging.</p>
                </div>

               <div 
                  className={`border rounded-lg p-4 cursor-pointer ${packagingOption === 'paper' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  onClick={() => setPackagingOption('paper')}
                >
                 
                    <div className="flex items-start">
                      <Gift className={`h-5 w-5 mr-2 ${packagingOption === 'gift' ? 'text-green-600' : 'text-gray-500'}`} />
                      <h4 className="font-medium text-gray-900">Paper Packaging</h4>
                    </div>
                  <p className="text-xs text-gray-600">Ordinary Eco-Friendly Paper Packaging!</p>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${packagingOption === 'none' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  onClick={() => setPackagingOption('none')}
                >
                   <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start mb-2">
                    <Leaf className={`h-5 w-5 mr-2 ${packagingOption === 'none' ? 'text-green-600' : 'text-gray-500'}`} />
                    <h4 className="font-medium text-gray-900">Plantable Packaging</h4>
                  </div>
                  <span className="text-sm font-medium">+₹15</span></div>
                  <p className="text-xs text-gray-600">Seed paper wrap – grows into herbs!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-green-800 flex items-center mb-6">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md mr-3"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                {ecoDiscountEnabled && (
                  <div className="flex justify-between text-green-600">
                    <span className="text-gray-600">Eco Discount (10%)</span>
                    <span className="font-medium">-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>

                {carbonOffsetFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carbon Offset</span>
                    <span className="font-medium">₹{carbonOffsetFee}</span>
                  </div>
                )}

                {deliveryFee > 0 && (<div className="flex justify-between">
  <span className="text-gray-600">Express Delivery</span>
  <span className="font-medium">
    ₹{deliveryFee}
  </span>
</div>)}
 

                {packagingFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Packaging</span>
                    <span className="font-medium">₹{packagingFee}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="bg-green-50 rounded-md p-3 mb-6">
                <p className="text-sm text-green-800">{getDeliveryDate()}</p>
              </div>

              {/* Green Points */}
              <div className="bg-green-100 rounded-md p-3 mb-6">
                <p className="text-sm text-green-800 font-medium">
                  You'll earn <span className="font-bold">79 Green Points</span> with this order!
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Redeem points for discounts on future purchases
                </p>
              </div>

              {/* Pay Button */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-200">
                Pay Now & Place Order
              </button>

              {/* Secure Payment Note */}
              <p className="text-xs text-center text-gray-500 mt-3">
                Your payment is securely processed. We never store your payment details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;