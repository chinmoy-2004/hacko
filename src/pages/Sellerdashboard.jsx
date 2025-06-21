import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Leaf, Award, Package, Users, ShoppingCart, Star, ArrowUp, ArrowDown, Zap, TreePine, Medal, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

import useSellerStore from '../store/Seller.store.js';

const EcoCertifiedProductsTable = () => {

  const {downloadcertificate}=useSellerStore()
  
  const products=useSellerStore(state => state.products);

  // Sample product data
  const initialProducts = [
    {
      ect_id: 'ECT-2023-001',
      product_name: 'Organic Cotton T-Shirt',
      manufacturer: 'GreenWear Inc.',
      category: 'Apparel',
      carbon_kg: 2.5,
      eco_certified: false
    },
    {
      ect_id: 'ECT-2023-002',
      product_name: 'Bamboo Toothbrush',
      manufacturer: 'EcoOral',
      category: 'Personal Care',
      carbon_kg: 0.3,
      eco_certified: true
    },
    {
      ect_id: 'ECT-2023-003',
      product_name: 'Recycled Notebook',
      manufacturer: 'PaperPlanet',
      category: 'Stationery',
      carbon_kg: 0.8,
      eco_certified: true
    },
    {
      ect_id: 'ECT-2023-004',
      product_name: 'Solar Charger',
      manufacturer: 'SunPower Tech',
      category: 'Electronics',
      carbon_kg: 1.2,
      eco_certified: true
    }
  ];

  const [Products, setProducts] = useState(products? products : initialProducts);
  const [firstRowStatus, setFirstRowStatus] = useState('Pending');
  const [showFirstRowDownload, setShowFirstRowDownload] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstRowStatus('Complete');
      setShowFirstRowDownload(true);
      
      // Update the first product's certification status
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts];
        updatedProducts[0] = {
          ...updatedProducts[0],
          eco_certified: true
        };
        return updatedProducts;
      });
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async(ectId) => {
     await downloadcertificate(ectId);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl text-white font-semibold mb-4">🌿 Recent Certified Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ECT ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbon (kg)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Products.map((product, index) => (
              <tr key={product.ect_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index === 0 ? (showFirstRowDownload ? product.ect_id : '') : product.ect_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.product_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.manufacturer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.carbon_kg}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index === 0 ? (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      firstRowStatus === 'Complete' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {firstRowStatus}
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Complete
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(index !== 0 || showFirstRowDownload) && (
                    <button
                      onClick={() => handleDownload(product.ect_id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                      Download
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};






const GreenXSellerDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const { fetchProducts } = useSellerStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    // Sample data
    const revenueData = [
        { month: 'Jan', revenue: 45000, greenRevenue: 28000 },
        { month: 'Feb', revenue: 52000, greenRevenue: 35000 },
        { month: 'Mar', revenue: 48000, greenRevenue: 32000 },
        { month: 'Apr', revenue: 61000, greenRevenue: 45000 },
        { month: 'May', revenue: 55000, greenRevenue: 42000 },
        { month: 'Jun', revenue: 67000, greenRevenue: 51000 }
    ];

    const carbonData = [
        { month: 'Jan', saved: 120 },
        { month: 'Feb', saved: 185 },
        { month: 'Mar', saved: 165 },
        { month: 'Apr', saved: 220 },
        { month: 'May', saved: 195 },
        { month: 'Jun', saved: 285 }
    ];

    const productCategoryData = [
        { name: 'Eco Packaging', value: 35, color: '#10B981' },
        { name: 'Organic Products', value: 28, color: '#059669' },
        { name: 'Recycled Goods', value: 22, color: '#34D399' },
        { name: 'Biodegradable', value: 15, color: '#6EE7B7' }
    ];

    const performanceMetrics = [
        { name: 'Mon', orders: 24, returns: 2 },
        { name: 'Tue', orders: 32, returns: 1 },
        { name: 'Wed', orders: 28, returns: 3 },
        { name: 'Thu', orders: 35, returns: 2 },
        { name: 'Fri', orders: 42, returns: 1 },
        { name: 'Sat', orders: 38, returns: 4 },
        { name: 'Sun', orders: 45, returns: 2 }
    ];

    const StatCard = ({ icon: Icon, title, value, change, changeType, subtitle, gradient }) => (
        <div className={`relative overflow-hidden rounded-2xl p-6 text-white ${gradient}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Icon className="w-6 h-6" />
                    </div>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${changeType === 'positive' ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'
                        }`}>
                        {changeType === 'positive' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        <span>{change}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold">{value}</h3>
                    <p className="text-white/80 text-sm">{title}</p>
                    {subtitle && <p className="text-white/60 text-xs">{subtitle}</p>}
                </div>
            </div>
        </div>
    );

    const GreenScoreBadge = ({ score, grade }) => (
        <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {grade}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                {score}/100
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        GX
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">GreenX Seller Dashboard</h1>
                        <p className="text-blue-200">Welcome back, EcoStore India! 🌱</p>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center justify-between">
                    <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-xl p-1">
                        {['overview', 'analytics', 'greenmetrics'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all capitalize ${activeTab === tab
                                    ? 'bg-white text-slate-900 shadow-lg'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {tab === 'greenmetrics' ? 'Green Metrics' : tab}
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        <Link to='/applyforcertification'>
                            <button className="flex items-center cursor-pointer space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                <Package className="w-5 h-5" />
                                <span>Verify & Add Product</span>
                            </button>
                        </Link>

                    </div>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-8">
                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            icon={DollarSign}
                            title="Total Revenue"
                            value="₹3.28L"
                            change="+23.5%"
                            changeType="positive"
                            subtitle="vs last month"
                            gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                        />
                        <StatCard
                            icon={Leaf}
                            title="Green Revenue"
                            value="₹2.33L"
                            change="+31.2%"
                            changeType="positive"
                            subtitle="71% of total sales"
                            gradient="bg-gradient-to-br from-green-500 to-emerald-600"
                        />
                        <StatCard
                            icon={TreePine}
                            title="Carbon Saved"
                            value="285 kg CO₂"
                            change="+46.2%"
                            changeType="positive"
                            subtitle="= 15 tree seedlings"
                            gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
                        />
                        <StatCard
                            icon={Award}
                            title="GreenScore"
                            value="A+"
                            change="+5 pts"
                            changeType="positive"
                            subtitle="Rank: #12 globally"
                            gradient="bg-gradient-to-br from-purple-500 to-indigo-600"
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Revenue Chart */}
                        <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-white">Revenue Trends</h3>
                                <div className="flex space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                        <span className="text-blue-200 text-sm">Total Revenue</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        <span className="text-green-200 text-sm">Green Revenue</span>
                                    </div>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                                    <YAxis stroke="rgba(255,255,255,0.6)" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '12px',
                                            color: 'white'
                                        }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#60A5FA" fill="url(#colorRevenue)" />
                                    <Area type="monotone" dataKey="greenRevenue" stackId="2" stroke="#34D399" fill="url(#colorGreen)" />
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#34D399" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* GreenScore and Achievements */}
                        <div className="space-y-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-lg font-semibold text-white mb-4">GreenScore Rating</h3>
                                <div className="flex items-center justify-between">
                                    <GreenScoreBadge score={87} grade="A+" />
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-green-400">87/100</div>
                                        <div className="text-sm text-white/60">EcoChain Verified</div>
                                        <div className="flex items-center mt-2 text-green-400">
                                            <Zap className="w-4 h-4 mr-1" />
                                            <span className="text-sm">+5 this month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 p-3 bg-green-500/20 rounded-xl">
                                        <Medal className="w-8 h-8 text-yellow-400" />
                                        <div>
                                            <div className="font-medium text-white">Carbon Champion</div>
                                            <div className="text-sm text-white/60">Saved 100+ kg CO₂</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-blue-500/20 rounded-xl">
                                        <Target className="w-8 h-8 text-blue-400" />
                                        <div>
                                            <div className="font-medium text-white">Green Sales Pro</div>
                                            <div className="text-sm text-white/60">70%+ green revenue</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <EcoCertifiedProductsTable />
                </div>

            )}

            {activeTab === 'analytics' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Weekly Performance */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-6">Weekly Performance</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={performanceMetrics}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                                    <YAxis stroke="rgba(255,255,255,0.6)" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '12px',
                                            color: 'white'
                                        }}
                                    />
                                    <Bar dataKey="orders" fill="#34D399" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="returns" fill="#F87171" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Product Categories */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-6">Product Categories</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={productCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {productCategoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '12px',
                                            color: 'white'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                {productCategoryData.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-white/80 text-sm">{item.name} ({item.value}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'greenmetrics' && (
                <div className="space-y-8">
                    {/* Carbon Impact */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-6">Carbon Footprint Reduction</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={carbonData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                                <YAxis stroke="rgba(255,255,255,0.6)" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '12px',
                                        color: 'white'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="saved"
                                    stroke="#34D399"
                                    strokeWidth={3}
                                    dot={{ fill: '#34D399', strokeWidth: 2, r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Green Coin Rewards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <Medal className="w-6 h-6" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">2,450</div>
                                    <div className="text-yellow-100 text-sm">Green Coins Earned</div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="text-yellow-100 text-sm mb-2">This Month: +340 coins</div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <div className="bg-white h-2 rounded-full w-3/4"></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <TreePine className="w-6 h-6" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">1.2 tons</div>
                                    <div className="text-green-100 text-sm">Total CO₂ Saved</div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="text-green-100 text-sm">= 65 tree seedlings planted 🌱</div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <Package className="w-6 h-6" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">89%</div>
                                    <div className="text-purple-100 text-sm">Eco Packaging</div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="text-purple-100 text-sm">RePack AI Optimized</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GreenXSellerDashboard;



