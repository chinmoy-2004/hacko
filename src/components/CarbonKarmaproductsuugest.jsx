import React from 'react';
import useRecommendStore from '../store/recommend.store.js';
import { Loader } from 'lucide-react';

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className = "" }) => (
  <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </div>
);

const ProductImage = ({ src, alt, className = "" }) => (
  <div className={`w-full h-40 overflow-hidden rounded-md bg-gray-100 ${className}`}>
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover object-center"
      onError={(e) => {
        e.target.onerror = null; 
        e.target.src = 'https://via.placeholder.com/200?text=Product+Image';
      }}
    />
  </div>
);

const ProductSuggestions = () => {
  const { personalized, isrecommendationsLoading } = useRecommendStore();
  
  // Get the first 5 personalized recommendations or empty array if none
  const suggestedProducts = personalized?.slice(0, 5) || [];

  // Map the product data to match the expected format
  const ecoProducts = suggestedProducts.map(product => ({
    id: product.product_id,
    name: product.name,
    co2Saved: `${product.eco_score}g CO₂`,
    price: `$${product.price.toFixed(2)}`,
    imageUrl: product.image_url || 'https://via.placeholder.com/200?text=Product+Image',
    tag: getProductTag(product.category)
  }));

  // Helper function to get tag based on category
  function getProductTag(category) {
    const tags = {
      'electronics': 'E-Tech',
      'clothing': 'Eco Fashion',
      'accessories': 'Sustainable',
      'home': 'Green Home',
      'food': 'Organic',
      'beverages': 'Zero Waste',
      'health': 'Natural',
      'beauty': 'Clean Beauty'
    };
    return tags[category?.toLowerCase()] || 'Eco Friendly';
  }

  // Fallback data if no recommendations
  const fallbackProducts = [
    {
      id: 1,
      name: "Bamboo Phone Case",
      co2Saved: "300g CO₂",
      price: "$24.99",
      imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      tag: "E-Tech"
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      co2Saved: "450g CO₂",
      price: "$32.00",
      imageUrl: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      tag: "Eco Fashion"
    },
    {
      id: 3,
      name: "Solar Power Bank",
      co2Saved: "1.2kg CO₂",
      price: "$89.99",
      imageUrl: "https://images.unsplash.com/photo-1558322456-046738c3e1a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      tag: "Renewable"
    },
    {
      id: 4,
      name: "Reusable Water Bottle",
      co2Saved: "200g CO₂",
      price: "$18.50",
      imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      tag: "Zero Waste"
    },
    {
      id: 5,
      name: "Bamboo Toothbrush",
      co2Saved: "150g CO₂",
      price: "$5.99",
      imageUrl: "https://images.unsplash.com/photo-1593998066526-65fcab3021a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      tag: "Eco Essentials"
    }
  ];

  // Use actual products if available, otherwise fallback
  const displayProducts = ecoProducts.length > 0 ? ecoProducts : fallbackProducts;

  if (isrecommendationsLoading) {
    return (
      <Card className="bg-white shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-800">
            🔎 Loading Recommended Products...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader className="animate-spin h-8 w-8 text-gray-500" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-800">
          🔎 Suggested Products (Based on Your Preferences)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {displayProducts.map((product) => (
            <div 
              key={product.id}
              className="min-w-[250px] bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 hover:shadow-md transition-all"
            >
              <div className="mb-3">
                <ProductImage 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="mb-2"
                />
                <Badge className="bg-green-100 text-green-800 text-xs hover:bg-green-100">
                  {product.tag}
                </Badge>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">{product.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{product.co2Saved}</span>
                  <span className="font-bold text-green-700">{product.price}</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm">
                  View Product
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSuggestions;