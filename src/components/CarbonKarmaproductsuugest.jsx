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


// Inline Card Components
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

// Inline Badge Component
const Badge = ({ children, className = "" }) => (
  <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </div>
);

 // Product Suggestions Component
  const ProductSuggestions = () => {
    const ecoProducts = [
      {
        id: 1,
        name: "Bamboo Phone Case",
        co2Saved: "300g",
        price: "$24.99",
        image: "📱",
        tag: "Low Emission Certified"
      },
      {
        id: 2,
        name: "Organic Cotton T-Shirt",
        co2Saved: "450g",
        price: "$32.00",
        image: "👕",
        tag: "Sustainable Fashion"
      },
      {
        id: 3,
        name: "Solar Power Bank",
        co2Saved: "1.2kg",
        price: "$89.99",
        image: "🔋",
        tag: "Renewable Energy"
      },
      {
        id: 4,
        name: "Reusable Water Bottle",
        co2Saved: "200g",
        price: "$18.50",
        image: "🍶",
        tag: "Zero Waste"
      },
      {
        id: 4,
        name: "Reusable Water Bottle",
        co2Saved: "200g",
        price: "$18.50",
        image: "🍶",
        tag: "Zero Waste"
      },
      {
        id: 4,
        name: "Reusable Water Bottle",
        co2Saved: "200g",
        price: "$18.50",
        image: "🍶",
        tag: "Zero Waste"
      }
    ];

    return (
      <Card className="bg-white shadow-lg border-0 ">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-800">🔎 Suggested Products (Based on Green Gather AI)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {ecoProducts.map((product) => (
              <div 
                key={product.id}
                className="min-w-[250px] bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 hover:shadow-md transition-all"
              >
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <Badge className="bg-green-100 text-green-800 text-xs hover:bg-green-100">
                    {product.tag}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">{product.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Saves {product.co2Saved} CO₂</span>
                    <span className="font-bold text-green-700">{product.price}</span>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm">
                    Buy Eco-Friendly
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