import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Leaf, ShoppingCart, Gift, MapPin, Trophy, Coins, Calendar, X } from 'lucide-react';

const UserDashboard = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

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

  const monthlyData = [
    { month: 'Jan', carbon: 20 },
    { month: 'Feb', carbon: 15 },
    { month: 'Mar', carbon: 25 },
    { month: 'Apr', carbon: 18 },
    { month: 'May', carbon: 22 },
    { month: 'Jun', carbon: 28 },
  ];

  const pieData = [
    { name: 'Home & Kitchen', value: 70 },
    { name: 'Personal Hygiene', value: 55 },
    { name: 'Bathroom', value: 35 },
    { name: 'Hair Care', value: 15 },
  ];

  const COLORS = ['#10C870', '#3B82F6', '#F59E0B', '#EF4444'];

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-8">

      {/* Top Section: Coins + Welcome */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10">
  <div className="w-full md:w-[58%] mb-4 md:mb-0">
    <h1 className="text-5xl font-bold mb-2">Welcome back, John Doe! 🌱</h1>
    <p className="text-gray-600 text-2xl">Track your environmental impact and see how you're making a difference</p>
  </div>

  <div className="bg-white rounded-xl p-6 shadow flex items-center  md:w-[35%]">
    <div className="mr-4">
      <Coins className="h-16 w-16 text-yellow-400" />
    </div>
    <div>
      <h2 className="font-semibold mb-2">Green Coins</h2>
      <p className="text-3xl font-bold text-green-600 mb-1">205</p>
    </div>
  </div>
</div>


      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold mb-2">Total CO₂ Reduced</h2>
          <p className="text-3xl font-bold text-green-600 mb-1">127.5 kg</p>
          <p className="text-sm text-gray-500">Equivalent to planting 5 trees</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">This Week</h2>
            <Leaf className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600 mb-1">12.3 kg</p>
          <p className="text-sm text-gray-500">Weekly Carbon Saved: 12 kg</p>
          <p className="text-sm text-green-600 mt-1">{randomMessage}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Weekly Rank</h2>
            <Trophy className="h-6 w-6 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-green-600 mb-1">#3</p>
          <p className="text-sm text-gray-500">Top 10% this week</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Member Since</h2>
            <Calendar className="h-6 w-6 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-green-600 mb-1">5 months</p>
          <p className="text-sm text-gray-500">Joined Jan 2024</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="flex font-semibold mb-4"><Leaf className='text-green-600 mx-2'/> Monthly Carbon Reduction</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="carbon" fill="#10B981" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold mb-4">🍃 Impact by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* Orders, Rewards, Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex items-center mb-4">
            <ShoppingCart className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="font-semibold text-lg">My Orders</h2>
          </div>
          <ul className="space-y-2 text-sm">
            <li>Order #12345 - Delivered</li>
            <li>Order #12346 - Out for Delivery</li>
            <li>Order #12347 - Processing</li>
          </ul>
          <button onClick={() => setShowOrders(true)} className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg w-full">View All</button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex items-center mb-4">
            <Gift className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="font-semibold text-lg">My Rewards</h2>
          </div>
          <ul className="space-y-2 text-sm">
            <li>Amazon Gift Card - 75 GreenCoins</li>
            <li>Discount Coupon - 100 GreenCoins</li>
            <li>Free Shipping - 25 GreenCoins</li>
          </ul>
          <button onClick={() => setShowRewards(true)} className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-lg w-full">Redeem</button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex items-center mb-4">
            <MapPin className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="font-semibold text-lg">Manage Address</h2>
          </div>
          <div className="text-sm mb-4">
            <p>{addressData.fullName}</p>
            <p>{addressData.street}, {addressData.city}, {addressData.state} - {addressData.pincode}</p>
            <p>Phone: {addressData.phone}</p>
          </div>
          <button onClick={() => setShowAddress(true)} className="bg-green-700 text-white px-4 py-2 rounded-lg w-full">Edit Address</button>
        </div>
      </div>

      {/* Orders Modal */}
      {showOrders && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-lg">All Orders</h2>
              <X className="cursor-pointer" onClick={() => setShowOrders(false)} />
            </div>
            <ul className="space-y-2 text-sm">
              <li>Order #12345 - Delivered</li>
              <li>Order #12346 - Out for Delivery</li>
              <li>Order #12347 - Processing</li>
              <li>Order #12348 - Cancelled</li>
              <li>Order #12349 - Delivered</li>
            </ul>
          </div>
        </div>
      )}

      {/* Rewards Modal */}
      {showRewards && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[80rem] relative">
            <button className="absolute top-3 right-3 cursor-pointer" onClick={() => setShowRewards(false)}><X /></button>
            <h2 className="font-bold text-xl mb-4">Claim your Shopping Rewards</h2>
            <div className="flex gap-6">
              <div className="border justify-center w-[25%] rounded-xl flex flex-col items-center p-4">
                <img src="/src/assets/dashboard/gift.png" className="h-32 rounded-md mx-auto mb-4" alt="Amazon Gift Card" />
                <div className="text-center">
                  <p className="font-bold text-lg">Amazon Gift Card</p>
                  <p className="text-sm my-2">A $10 gift card to use on Amazon.com.</p>
                  <p className="font-semibold">GreenCoins Required: 75 🟡</p>
                  <button className="mt-2 bg-yellow-400 px-4 py-2 rounded-lg">Redeem</button>
                </div>
              </div>
              <div className="border justify-center w-[25%] rounded-xl flex flex-col items-center p-4">
                <img src="/src/assets/dashboard/coupon.png" className="h-32 rounded-md mx-auto mb-4" alt="Discount Coupon" />
                <div className="text-center">
                  <p className="font-bold text-lg">Discount Coupon</p>
                  <p className="text-sm my-2">Get 20% off your next Greenovation purchase. 10% off Amazon purchase.</p>
                  <p className="font-semibold">GreenCoins Required: 100 🟡</p>
                  <button className="mt-2 bg-yellow-400 px-4 py-2 rounded-lg">Redeem</button>
                </div>
              </div>
              <div className="border justify-center w-[25%] rounded-xl flex flex-col items-center p-4">
                <img src="/src/assets/dashboard/shipping.png" className="h-32 rounded-md mx-auto mb-4" alt="Free Shipping" />
                <div className="text-center">
                  <p className="font-bold text-lg">Free Shipping</p>
                  <p className="text-sm my-2">Enjoy free shipping on your next Greenovation order.</p>
                  <p className="font-semibold">GreenCoins Required: 25 🟡</p>
                  <button className="mt-2 bg-yellow-400 px-4 py-2 rounded-lg">Redeem</button>
                </div>
              </div>
              <div className="border justify-center w-[25%] rounded-xl flex flex-col items-center p-4">
                <img src="/src/assets/dashboard/prime.png" className="h-32 rounded-md mx-auto mb-4" alt="Amazon Prime" />
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


      {/* Address Modal */}
      {showAddress && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-lg">Edit Address</h2>
              <X className="cursor-pointer" onClick={() => setShowAddress(false)} />
            </div>
            <form onSubmit={handleAddressSave} className="space-y-2 text-sm">
              <input name="fullName" defaultValue={addressData.fullName} className="w-full border p-2 rounded" />
              <input name="street" defaultValue={addressData.street} className="w-full border p-2 rounded" />
              <input name="city" defaultValue={addressData.city} className="w-full border p-2 rounded" />
              <input name="state" defaultValue={addressData.state} className="w-full border p-2 rounded" />
              <input name="pincode" defaultValue={addressData.pincode} className="w-full border p-2 rounded" />
              <input name="phone" defaultValue={addressData.phone} className="w-full border p-2 rounded" />
              <button type="submit" className="mt-2 bg-green-700 text-white px-4 py-2 rounded-lg w-full">Save Address</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
