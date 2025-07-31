import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, MapPin, Menu, ChevronDown, Coins, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useRecommendStore from '../store/recommend.store.js';
import axiosInstance from '../lib/axios';

const Header = ({ cartItemCount, onCartClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const { getproduct } = useRecommendStore();

    const sustainableApps = [
        { name: "EcoSense AI", path: "/ecosense-ai", description: "AI-powered environmental monitoring" },
        { name: "GreenGather AI", path: "/greengather", description: "Sustainable community platform" },
        { name: "Repack AI", path: "/repack-ai", description: "Smart packaging optimization" },
        { name: "Carbon Karma", path: "/carbon-karma", description: "Carbon footprint tracker" },
        { name: "EcoChain Trace", path: "/ecochain-ai", description: "Supply chain transparency" }
    ];

    // Debounce autocomplete requests
    useEffect(() => {
        console.log('Search query changed:', searchQuery);
        const timerId = setTimeout(() => {
            if (searchQuery.trim().length >= 2) {
                fetchAutocompleteSuggestions(searchQuery);
            } else {
                setSuggestions([]);
            }
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchQuery]);

    const fetchAutocompleteSuggestions = async (query) => {
        try {
            console.log('Fetching suggestions for:', query);
            setLoading(true);
            const response = await axiosInstance.get('/recommend/autocomplete', {
                params: { q: query }
            });
            
            // Ensure we always have an array, even if response.data is null/undefined
            const suggestionsData = Array.isArray(response?.data) ? response.data : [];
            setSuggestions(suggestionsData);
            setShowSuggestions(true);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]); // Reset to empty array on error
            setLoading(false);
        }
    };

    const performSearch = (query) => {
        if (query.trim()) {
            getproduct(query);
            navigate(`/search`);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        performSearch(suggestion);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        performSearch(searchQuery);
        setShowSuggestions(false);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-[#0f1a0f] text-white w-full top-0 z-50">
            {/* Top bar */}
            <div className="bg-[#1a2b1a] px-4 py-1 text-sm">
                <div className="w-full flex justify-between items-center px-4 py-1">
                    <div className="text-white/80 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>Deliver to Your Location</span>
                    </div>
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
                    {/* Left side - Logo and GreenX dropdown */}
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="flex items-center space-x-1 cursor-pointer">
                            <img
                                src='/amazon.png'
                                alt="Amazon Logo"
                                className="h-7 object-contain text-amber-50"
                            />
                            <span className="text-xs text-green-400">.in</span>
                        </Link>

                        <div className="h-6 w-px bg-gray-600"></div>

                        <div className="relative" ref={dropdownRef}
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}>
                            <button
                                className="flex items-center space-x-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
                            >
                                <span className="text-lg font-bold text-green-400">GreenX</span>
                                <span className="text-xs text-green-800">🌿</span>
                                <ChevronDown className={`h-3 w-3 text-green-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute top-full left-0 bg-white border border-green-200 shadow-lg z-50 rounded-md w-64 overflow-hidden">
                                    <div className="bg-green-600 p-3 text-white">
                                        <h3 className="font-bold">GreenX Ecosystem</h3>
                                        <p className="text-xs text-green-100">Sustainable solutions for a better future</p>
                                    </div>
                                    <div className="divide-y divide-green-100">
                                        {sustainableApps.map((app) => (
                                            <Link
                                                key={app.name}
                                                to={app.path}
                                                className="block px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors duration-150"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <div className="font-medium text-green-700">{app.name}</div>
                                                <div className="text-xs text-gray-500 mt-1">{app.description}</div>
                                            </Link>
                                        ))}
                                    </div>
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

                    {/* Search bar with autocomplete */}
                    <div className="flex-1 max-w-2xl relative" ref={searchRef}>
                        <form onSubmit={handleSearchSubmit} className="relative flex">
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
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(e.target.value.length > 0);
                                }}
                                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                                className="flex-1 px-3 py-2 border-none rounded-none text-black bg-white outline-0"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                            <button 
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r"
                            >
                                <Search className="h-4 w-4 text-white" />
                            </button>
                        </form>

                        {/* Autocomplete suggestions dropdown */}
                        {showSuggestions && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 max-h-96 overflow-y-auto">
                                {loading ? (
                                    <div className="p-4 text-gray-700 flex justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                                    </div>
                                ) : suggestions.length > 0 ? (
                                    <ul>
                                        {suggestions?.map((suggestion, index) => (
                                            <li 
                                                key={index} 
                                                className="border-b border-gray-100 last:border-b-0 hover:bg-green-50 cursor-pointer"
                                                onClick={() => handleSuggestionClick(suggestion)}
                                            >
                                                <div className="px-4 py-3 text-gray-800 flex items-center">
                                                    <Search className="h-4 w-4 mr-3 text-gray-400" />
                                                    {suggestion}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-gray-700">
                                        {searchQuery.trim().length >= 2 
                                            ? "No suggestions found" 
                                            : "Type at least 2 characters"}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right side navigation */}
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

                        <Link to="/orders">
                            <div className="hidden md:block cursor-pointer">
                                <div className="text-xs text-gray-300">Returns</div>
                                <div className="text-sm font-bold">& Orders</div>
                            </div>
                        </Link>

                        <Link to="/cart">
                            <div className="relative cursor-pointer" onClick={onCartClick}>
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
                    <Link to="/impact" className="text-white hover:text-green-300">Impact & B2B</Link>
                    <Link to="/edu" className="text-white hover:text-green-300">Education</Link>
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