import {  Camera, FileText } from "lucide-react";

// Inline Button Component
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

  // Top Performers Component
  const TopPerformers = () => {
    const topPerformers = [
      {
        id: 1,
        name: "EcoWarrior Sarah",
        avatar: "👩‍🌾",
        product: "Solar Charger",
        reduction: "2.3 kg",
        image: "🔋"
      },
      {
        id: 2,
        name: "GreenThumb Mike",
        avatar: "👨‍🌱",
        product: "Bamboo Toothbrush",
        reduction: "1.8 kg",
        image: "🪥"
      },
      {
        id: 3,
        name: "CarbonCrusher Alex",
        avatar: "🧑‍🔬",
        product: "Reusable Bags",
        reduction: "1.5 kg",
        image: "🛍️"
      }
    ];

    return (
      <Card className="bg-white shadow-lg border-0 max-h-screen">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-800">🏅 Top Performers Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((performer) => (
              <div 
                key={performer.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{performer.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-800">{performer.name}</div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      <span>{performer.image}</span>
                      <span>{performer.product}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-700">{performer.reduction}</div>
                  <div className="text-xs text-gray-500">CO₂ Reduced</div>
                </div>
              </div>
            ))}
            
            <div className="mt-6 flex space-x-4 justify-center">
              <Button variant="outline" className="flex items-center space-x-2">
                <Camera className="h-4 w-4" />
                <span>📷 Camera</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>🧾 Form</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

export default TopPerformers