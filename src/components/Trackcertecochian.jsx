
import { ExternalLink, Zap } from 'lucide-react';

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

const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

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

const Progress = ({ value = 0, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div
      className="bg-blue-600 h-2 rounded-full transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
);

// Track Certification Component
const TrackCertification = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        🔍 Track Certification
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src="https://res.cloudinary.com/dha6uxjvn/image/upload/v1750272151/tshirt_ynusun.webp"
              alt="Organic Cotton Polo Shirt"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Organic Cotton Polo Shirt</h3>
            <p className="text-gray-600">ECT ID: ECT-2024-001234</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Certification Progress</span>
              <span>85%</span>
            </div>
            <Progress value={85} />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Pending</span>
              <span>Verified</span>
              <span>On-Chain</span>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-600" />
              <span className="font-medium">Saved 14.2kg CO₂</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Compared to conventional production
            </p>
          </div>

          <Badge variant="success">✅ Blockchain Verified</Badge>

          <div className="space-y-2">
            <Button className="w-full">Track Supply Chain</Button>
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Explorer
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrackCertification