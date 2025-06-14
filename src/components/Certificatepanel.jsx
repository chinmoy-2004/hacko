

import {Zap, Star } from 'lucide-react';

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



// Certificates Panel
const CertificatesPanel = () => {
  const certificates = [
    { company: 'GreenThread Co.', product: 'Organic Cotton Jeans', emission: '18.5kg CO₂', rating: 4.9, icon: '🌱' },
    { company: 'EcoTech Solutions', product: 'Solar Panel Kit', emission: '2,340kg CO₂', rating: 4.8, icon: '☀️' },
    { company: 'Pure Foods Ltd.', product: 'Organic Quinoa', emission: '5.2kg CO₂', rating: 4.7, icon: '🌾' },
    { company: 'CleanBeauty Co.', product: 'Natural Skincare Set', emission: '3.1kg CO₂', rating: 4.6, icon: '🧴' }
  ];

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">📊 Top Certified Products</h2>
        <select className="px-3 py-2 border border-gray-300 rounded-md">
          <option>Most Recent</option>
          <option>Highest Impact</option>
          <option>Best Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {certificates.map((cert, index) => (
          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">{cert.icon}</div>
              <h4 className="font-medium text-sm">{cert.company}</h4>
              <p className="text-xs text-gray-600">{cert.product}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center">
                  <Zap className="h-3 w-3 text-green-600 mr-1" />
                  {cert.emission}
                </span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  {cert.rating}
                </div>
              </div>
              <Badge variant="secondary" className="text-xs w-full justify-center">
                Blockchain Certified
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Button variant="outline">View All Certificates</Button>
      </div>
    </Card>
  );
};

export default CertificatesPanel;