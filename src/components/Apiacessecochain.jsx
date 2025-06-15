import React, { useState } from 'react';

import { Copy, Key } from 'lucide-react';

// Simple reusable components
const Button = ({ children, className = '', variant = 'default', size = 'default', onClick, ...props }) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';
    const variants = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-gray-300 bg-white hover:bg-gray-50',
        ghost: 'hover:bg-gray-100',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
    };
    const sizes = {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-8 px-3 text-sm',
        icon: 'h-10 w-10'
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};


const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        {children}
    </div>
);

const Badge = ({ children, className = '', variant = 'default' }) => {
    const variants = {
        default: 'bg-blue-100 text-blue-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};
// API Access Component
const APIAccess = () => {
    const [activeTab, setActiveTab] = useState('keys');

    return (
        <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
                <Key className="h-5 w-5" />
                <h2 className="text-xl font-semibold">🧑‍💻 API Access</h2>
            </div>

            <div className="space-y-4">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    {['keys', 'limits', 'docs'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${activeTab === tab ? 'bg-white shadow-sm' : 'text-gray-600'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {activeTab === 'keys' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Your API Key</label>
                            <div className="flex space-x-2">
                                <code className="flex-1 p-2 bg-gray-100 rounded text-xs">
                                    ect_live_ak_••••••••••••••••••••••••••••
                                </code>
                                <Button size="sm" variant="outline">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <Button className="w-full">Generate New API Key</Button>
                    </div>
                )}

                {activeTab === 'limits' && (
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm">Requests Today</span>
                            <Badge>847 / 1,000</Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Rate Limit</span>
                            <Badge>100/min</Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Plan</span>
                            <Badge variant="secondary">Developer</Badge>
                        </div>
                    </div>
                )}

                {activeTab === 'docs' && (
                    <div>
                        <label className="block text-sm font-medium mb-2">Sample Request</label>
                        <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                            {`curl -X GET "https://api.ecochain.trace/v1/verify" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"ect_id": "ECT-2024-001234"}'`}
                        </pre>
                        <Button size="sm" variant="outline" className="mt-2">
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default APIAccess;