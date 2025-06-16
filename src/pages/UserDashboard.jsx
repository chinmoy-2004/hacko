import React, { useState } from 'react';
import { Leaf, ShoppingCart, Gift, MapPin, User, Trophy, Truck, Coins, Settings, X } from 'lucide-react';

const UserDashboard = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  // State for address and phone number
  const [addressData, setAddressData] = useState({
    fullName: "John Doe",
    street: "123 Green Street",
    city: "EcoCity",
    state: "India",
    pincode: "110001",
    phone: "9876543210"
  });

  const ecoMessages = [
    "You saved 0.002% forests from cutting down!",
    "Reduced emissions equals cleaner skies!",
    "Your efforts helped save 100L of water!",
    "Tiny steps towards a greener planet!",
    "You prevented 0.0005% deforestation today!",
    "You saved enough carbon to power a small home for 1 hour!",
    "Thanks to you, 3 trees keep breathing peacefully!",
    "You prevented 50 plastic bottles from polluting oceans!",
    "Your actions delayed climate change by a few seconds!",
    "You saved oxygen for 5 people today!",
    "You prevented the cutting of 0.001% rainforest land!",
    "Your contribution is like planting 2 virtual trees today!"
  ];

  const randomMessage = ecoMessages[Math.floor(Math.random() * ecoMessages.length)];

  const handleAddressSave = (e) => {
    e.preventDefault();
    const form = e.target;
    setAddressData({
      fullName: form.fullName.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      pincode: form.pincode.value,
      phone: form.phone.value
    });
    setShowAddress(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8">
      <h1 className="text-3xl font-bold text-center mb-10">User Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Weekly Carbon Savings */}
        <div className="bg-white rounded-2xl p-6 shadow flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg mb-2">Weekly Carbon Saved</h2>
              <p className="text-3xl font-bold text-green-700">12 kg</p>
            </div>
            <Leaf className="h-16 w-16 text-green-500" />
          </div>
          <p className="text-sm text-green-700 mt-4 font-medium">{randomMessage}</p>
        </div>

        {/* Green Bits */}
        <div className="bg-white rounded-2xl p-6 shadow flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg mb-2">Green Coins</h2>
            <p className="text-3xl font-bold text-green-700">205</p>
          </div>
          <Coins className="h-16 w-16 text-yellow-400" />
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl p-6 shadow flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg mb-2">Leaderboard Position</h2>
            <p className="text-3xl font-bold text-green-700">#47th</p>
          </div>
          <Trophy className="h-16 w-16 text-yellow-500" />
        </div>
      </div>

      {/* Orders, Rewards, Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Orders */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex items-center mb-4">
            <ShoppingCart className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="font-bold text-lg">My Orders</h2>
          </div>
          <ul className="space-y-3 text-sm">
            <li>Order #12345 - Delivered</li>
            <li>Order #12346 - Out for Delivery</li>
            <li>Order #12347 - Processing</li>
          </ul>
          <button onClick={() => setShowOrders(true)} className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg">View All</button>
        </div>

        {/* Rewards */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex items-center mb-4">
            <Gift className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="font-bold text-lg">My Rewards</h2>
          </div>
          <ul className="space-y-3 text-sm">
            <li>Amazon Gift Card - 75 GreenCoins</li>
            <li>Discount Coupon - 100 GreenCoins</li>
            <li>Free Shipping - 25 GreenCoins</li>
            <li>Amazon Prime - 150 GreenCoins</li>
          </ul>
          <button onClick={() => setShowRewards(true)} className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-lg">Redeem</button>
        </div>

        {/* Address Management */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex items-center mb-4">
            <MapPin className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="font-bold text-lg">Manage Addresses</h2>
          </div>
          <div className="text-sm mb-4">
            <p>{addressData.fullName}</p>
            <p>{addressData.street}, {addressData.city}, {addressData.state} - {addressData.pincode}</p>
            <p>Phone: {addressData.phone}</p>
          </div>
          <button onClick={() => setShowAddress(true)} className="bg-green-700 text-white px-4 py-2 rounded-lg">Edit Address</button>
        </div>
      </div>

      {/* Redeem Modal */}
      {showRewards && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[80vw] relative">
            <button className="absolute top-3 right-3" onClick={() => setShowRewards(false)}><X /></button>
            <h2 className="font-bold text-xl mb-4">Claim your Shopping Rewards</h2>
            <div className="flex gap-6">
              <div className="border p-4 w-[25%] rounded-xl flex flex-col justify-between">
                <img src="https://m.media-amazon.com/images/G/01/gift-certificates/gc-horizontal-black.png" className="h-24 mx-auto mb-4" alt="Amazon Gift Card" />
                <div className="text-center">
                  <p className="font-bold text-lg">Amazon Gift Card</p>
                  <p className="text-sm my-2">A $10 gift card to use on Amazon.com.</p>
                  <p className="font-semibold">GreenCoins Required: 75 🟡</p>
                  <button className="mt-2 bg-yellow-400 px-4 py-2 rounded-lg">Redeem</button>
                </div>
              </div>
              <div className="border p-4 w-[25%] rounded-xl flex flex-col justify-between">
                <img src="https://cdn-icons-png.flaticon.com/512/992/992700.png" className="h-24 mx-auto mb-4" alt="Discount Coupon" />
                <div className="text-center">
                  <p className="font-bold text-lg">Discount Coupon</p>
                  <p className="text-sm my-2">Get 20% off your next GreenX purchase. 10% off Amazon purchase.</p>
                  <p className="font-semibold">GreenCoins Required: 100 🟡</p>
                  <button className="mt-2 bg-yellow-400 px-4 py-2 rounded-lg">Redeem</button>
                </div>
              </div>
              <div className="border p-4 w-[25%] rounded-xl flex flex-col justify-between">
                <img src="https://cdn-icons-png.flaticon.com/512/858/858469.png" className="h-24 mx-auto mb-4" alt="Free Shipping" />
                <div className="text-center">
                  <p className="font-bold text-lg">Free Shipping</p>
                  <p className="text-sm my-2">Enjoy free shipping on your next Greenovation order.</p>
                  <p className="font-semibold">GreenCoins Required: 25 🟡</p>
                  <button className="mt-2 bg-yellow-400 px-4 py-2 rounded-lg">Redeem</button>
                </div>
              </div>
              <div className="border p-4 w-[25%] rounded-xl flex flex-col justify-between">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Amazon_Prime_logo.png" className="h-24 mx-auto mb-4" alt="Amazon Prime" />
                <div className="text-center">
                  <p className="font-bold text-lg">Amazon Prime Membership</p>
                  <p className="text-sm my-2">Get a one-month Amazon Prime membership.</p>
                  <p className="font-semibold">GreenCoins Required: 150 🟡</p>
                  <button className="mt-2 bg-yellow-400 px-4 py-2 rounded-lg">Redeem</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Modal */}
      {showOrders && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button className="absolute top-3 right-3" onClick={() => setShowOrders(false)}><X /></button>
            <h2 className="font-bold text-xl mb-4">Order History</h2>
            <ul className="space-y-3 text-sm">
              <li>Order #12345 - Delivered on 10th June</li>
              <li>Order #12346 - Out for Delivery (ETA: 15th June)</li>
              <li>Order #12347 - Processing</li>
              <li>Order #12348 - Cancelled</li>
            </ul>
          </div>
        </div>
      )}

      {/* Address Modal */}
      {showAddress && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button className="absolute top-3 right-3" onClick={() => setShowAddress(false)}><X /></button>
            <h2 className="font-bold text-xl mb-4">Edit Address</h2>
            <form className="space-y-4" onSubmit={handleAddressSave}>
              <input type="text" name="fullName" defaultValue={addressData.fullName} className="w-full border p-2 rounded" placeholder="Full Name" required />
              <input type="text" name="street" defaultValue={addressData.street} className="w-full border p-2 rounded" placeholder="Street Address" required />
              <input type="text" name="city" defaultValue={addressData.city} className="w-full border p-2 rounded" placeholder="City" required />
              <input type="text" name="state" defaultValue={addressData.state} className="w-full border p-2 rounded" placeholder="State" required />
              <input type="text" name="pincode" defaultValue={addressData.pincode} className="w-full border p-2 rounded" placeholder="Pincode" required />
              <input type="text" name="phone" defaultValue={addressData.phone} className="w-full border p-2 rounded" placeholder="Phone Number" required />
              <button className="w-full bg-green-700 text-white py-2 rounded">Save Address</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserDashboard;