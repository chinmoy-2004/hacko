import React, { useState } from 'react';
import {
    Package,
    Coins,
    Leaf,
    BarChart2,
    Users,
    CreditCard,
    Settings,
    MessageSquare,
    Bell,
    HelpCircle,
    LogOut,
    Box
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products] = useState([
        {
            id: 1,
            name: "Bamboo Toothbrush",
            price: 299,
            stock: 42,
            ecoScore: 85,
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop"
        },
        {
            id: 2,
            name: "Organic Cotton Tote",
            price: 499,
            stock: 18,
            ecoScore: 92,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop"
        }
    ]);

    const [orders] = useState([
        {
            id: "#ORD-1001",
            customer: "Priya Sharma",
            amount: 798,
            status: "Delivered",
            date: "15 Jun 2023"
        },
        {
            id: "#ORD-1002",
            customer: "Rahul Patel",
            amount: 1299,
            status: "Shipped",
            date: "16 Jun 2023"
        }
    ]);

    const stats = {
        totalSales: 2097,
        totalProducts: 2,
        pendingOrders: 1,
        carbonSaved: 45 // kg
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <StatCard
                                icon={<Coins className="h-6 w-6" />}
                                title="Total Sales"
                                value={`₹${stats.totalSales}`}
                                change="+12% from last month"
                            />
                            <StatCard
                                icon={<Package className="h-6 w-6" />}
                                title="Products"
                                value={stats.totalProducts}
                                change="+1 this week"
                            />
                            <StatCard
                                icon={<CreditCard className="h-6 w-6" />}
                                title="Pending Orders"
                                value={stats.pendingOrders}
                                change="2 completed today"
                            />
                            <StatCard
                                icon={<Leaf className="h-6 w-6" />}
                                title="Carbon Saved"
                                value={`${stats.carbonSaved} kg`}
                                change="Equivalent to 3 trees"
                            />
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'products':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Your Eco Products</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                );
            case 'orders':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Order History</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'analytics':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Sales Analytics</h3>
                        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Analytics charts will appear here</p>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                                <input
                                    type="text"
                                    defaultValue="EcoFriendly Store"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    defaultValue="seller@ecofriendly.com"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                                Save Changes
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-green-800 text-white p-4 flex flex-col">
                <div className="flex items-center space-x-2 p-4 mb-8">
                    <Leaf className="h-8 w-8" />
                    <span className="text-xl font-bold">EcoSeller</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <SidebarItem
                        icon={<BarChart2 className="h-5 w-5" />}
                        active={activeTab === 'dashboard'}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </SidebarItem>
                    <SidebarItem
                        icon={<Package className="h-5 w-5" />}
                        active={activeTab === 'products'}
                        onClick={() => setActiveTab('products')}
                    >
                        Products
                    </SidebarItem>
                    <SidebarItem
                        icon={<CreditCard className="h-5 w-5" />}
                        active={activeTab === 'orders'}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders
                    </SidebarItem>
                    <SidebarItem
                        icon={<Users className="h-5 w-5" />}
                        active={activeTab === 'analytics'}
                        onClick={() => setActiveTab('analytics')}
                    >
                        Analytics
                    </SidebarItem>
                    <SidebarItem
                        icon={<Settings className="h-5 w-5" />}
                        active={activeTab === 'settings'}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </SidebarItem>
                    <Link to='/ecochain-ai'>
                        <SidebarItem
                            icon={<Box className="h-5 w-5" />}
                        >
                            add product
                        </SidebarItem>
                    </Link>
                </nav>

                <div className="mt-auto p-4">
                    <button className="flex items-center space-x-2 text-white hover:text-green-200 w-full">
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="flex justify-between items-center p-4">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-500 hover:text-gray-700">
                                <Bell className="h-5 w-5" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <MessageSquare className="h-5 w-5" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <HelpCircle className="h-5 w-5" />
                            </button>
                            <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                                ES
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6">
                    {renderTabContent()}
                </main>
            </div>
        </div>
    );
};

// Reusable Components
const SidebarItem = ({ icon, children, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-2 w-full p-3 rounded-md transition-colors
      ${active ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700 hover:bg-opacity-50'}`}
    >
        {icon}
        <span>{children}</span>
    </button>
);

const StatCard = ({ icon, title, value, change }) => (
    <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-green-100 text-green-600">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-xl font-semibold">{value}</p>
            </div>
        </div>
        <p className="mt-2 text-xs text-green-600">{change}</p>
    </div>
);

const OrderCard = ({ order }) => (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
        <div>
            <p className="font-medium">{order.id}</p>
            <p className="text-sm text-gray-500">{order.customer}</p>
        </div>
        <div className="text-right">
            <p className="font-medium">₹{order.amount}</p>
            <span className={`text-xs px-2 py-1 rounded-full 
        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {order.status}
            </span>
        </div>
    </div>
);

const ProductCard = ({ product }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h4 className="font-semibold">{product.name}</h4>
            <p className="text-green-600 font-medium mt-1">₹{product.price}</p>
            <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-500">{product.stock} in stock</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Eco Score: {product.ecoScore}/100
                </span>
            </div>
        </div>
    </div>
);

export default SellerDashboard;