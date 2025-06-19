import React, { useState } from 'react';
import { Search, ShoppingCart, MapPin, Menu, ChevronDown, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header = ({ cartItemCount, onCartClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const sustainableApps = [
        { name: "EcoSense AI", path: "/ecosense-ai" },
        { name: "GreenGather", path: "/greengather" },
        { name: "Repack AI", path: "/repack-ai" },
        { name: "Carbon Karma", path: "/carbon-karma" },
        { name: "EcoChain AI", path: "/ecochain-ai" }
    ];

    return (
        <header className="bg-[#0f1a0f] text-white w-full">
            {/* Top bar */}
            <div className="bg-[#1a2b1a] px-4 py-1 text-sm">
                <div className="w-full flex justify-between items-center px-4 py-1">
                    <div className="text-white/80">📍 Deliver to Your Location</div>
                    <div className="flex space-x-6 text-white/80">
                        <span>Hello, Guest</span>
                        <span>Returns & Orders</span>
                        <span>Your Account</span>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="px-4 py-2">
                <div className="w-full flex justify-between items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="flex items-center space-x-1 cursor-pointer">
                            <img
                                src='/src/assets/home/amazon.png'
                                alt="Amazon Logo"
                                className="h-7 object-contain text-amber-50"
                            />
                            <span className="text-xs text-green-400">.com</span>
                        </Link>

                        <div className="h-6 w-px bg-gray-600"></div>

                        <div className="relative">
                            <button
                                className="flex items-center space-x-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span className="text-lg font-bold text-green-400">GreenX</span>
                                <span className="text-xs text-green-300">🌿</span>
                                <ChevronDown className={`h-3 w-3 text-green-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg z-50">
                                    {sustainableApps.map((app) => (
                                        <Link
                                            key={app.name}
                                            to={app.path}
                                            className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                            onClick={() => setDropdownOpen(false)} // close on selection
                                        >
                                            {app.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Delivery location */}
                    <div className="hidden md:flex items-center space-x-1 text-white cursor-pointer">
                        <MapPin className="h-4 w-4" />
                        <div className="text-xs">
                            <div className="text-gray-300">Deliver to</div>
                            <div className="font-bold">India</div>
                        </div>
                    </div>

                    {/* Search bar */}
                    <div className="flex-1 max-w-2xl">
                        <div className="relative flex">
                            <select className="bg-green-100 text-black px-2 py-2 border-r border-green-300 rounded-l text-sm outline-none">
                                <option>All</option>
                                <option>Eco Products</option>
                                <option>Sustainable Fashion</option>
                                <option>Green Tech</option>
                                <option>Organic Food</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Search sustainable products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-3 py-2 border-none rounded-none text-black bg-white outline-0"
                            />
                            <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r">
                                <Search className="h-4 w-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex items-center space-x-1 text-white cursor-pointer">
                            <span className="text-sm">🇺🇸</span>
                            <span className="text-sm font-bold">EN</span>
                        </div>

                        <div className="cursor-pointer">
                            <div className="text-xs text-gray-300">Hello, sign in</div>
                            <div className="text-sm font-bold">Account & Lists</div>
                        </div>

                        <Link className='cursor-pointer' to="/Sellerdashboard">
                          Seller-dashboard
                        </Link>

                        <div className="hidden md:block cursor-pointer">
                            <div className="text-xs text-gray-300">Returns</div>
                            <div className="text-sm font-bold">& Orders</div>
                        </div>

                        <Link to="/cart"><div className="relative cursor-pointer" onClick={onCartClick}>
                            <ShoppingCart className="h-6 w-6" />
                            <span className="ml-1 text-sm font-bold">Cart</span>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-green-500 text-xs text-white">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation bar */}
<div className="bg-[#1a2b1a] px-4 py-3 flex justify-between items-center">
    <div className="flex items-center space-x-6 text-sm">
        <button className="flex items-center text-white hover:bg-white/10 p-2">
            <Menu className="h-4 w-4 mr-2" /> All
        </button>
        <a href="#" className="text-white hover:text-green-300">Today's Green Deals</a>
        <a href="#" className="text-white hover:text-green-300">Customer Service</a>
        <a href="#" className="text-white hover:text-green-300">Eco Registry</a>
        <a href="#" className="text-white hover:text-green-300">Gift Cards</a>
        <a href="#" className="text-white hover:text-green-300">Sell Sustainable</a>
    </div>
    <div className="flex items-center space-x-6 text-sm mr-2">
        <div className='flex items-center text-white hover:text-green-300'>
            <Coins className="w-5 h-5 mr-1 text-yellow-400" />
            <p>205 coins</p>
        </div>
        <Link to="/user-dashboard">
        <button className='p-2 bg-green-700 rounded-xl px-4 uppercase text-white hover:bg-green-800 cursor-pointer'>
            User Dashboard
        </button>
        </Link>
    </div>
</div>

        </header>
    );
};

export default Header;
