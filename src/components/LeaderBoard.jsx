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

//inline Card Components
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


// Leaderboard Component
  const Leaderboard = () => {
    const leaderboardData = [
      { rank: 1, name: "EcoWarrior Sarah", co2Saved: "15.2 kg", score: 1520, badge: "🥇" },
      { rank: 2, name: "GreenThumb Mike", co2Saved: "12.8 kg", score: 1280, badge: "🥈" },
      { rank: 3, name: "CarbonCrusher Alex", co2Saved: "10.5 kg", score: 1050, badge: "🥉" },
      { rank: 4, name: "EcoHero Jessica", co2Saved: "9.2 kg", score: 920, badge: "" },
      { rank: 5, name: "PlanetSaver Tom", co2Saved: "8.7 kg", score: 870, badge: "" },
    ];

    return (
      <Card className="bg-white shadow-lg border-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">🏆 Leaderboard</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Weekly</Button>
              <Button variant="outline" size="sm">Monthly</Button>
              <Button variant="outline" size="sm" className="bg-green-50 border-green-200">All-time</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardData.map((user) => (
              <div 
                key={user.rank}
                className={`flex items-center justify-between p-4 rounded-lg transition-all hover:bg-gray-50 ${
                  user.rank <= 3 ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-600">#{user.rank}</span>
                    {user.badge && <span className="text-xl">{user.badge}</span>}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">CO₂ Saved: {user.co2Saved}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {user.score} pts
                  </Badge>
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold text-blue-600">#47</span>
                  <div>
                    <div className="font-semibold text-gray-800">You</div>
                    <div className="text-sm text-gray-500">CO₂ Saved: 1.2 kg</div>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  120 pts
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };


export default Leaderboard;