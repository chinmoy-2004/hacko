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

// Inline Progress Component
const Progress = ({ value = 0, className = "", children }) => (
  <div className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
    {children || (
      <div 
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    )}
  </div>
);

const DashboardOverview = () => (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800">Your Carbon Rank</span>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            🥉 Bronze Eco Contributor
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
          <div className="text-4xl font-bold text-green-700 mb-2">1.2 kg CO₂</div>
          <div className="text-lg text-gray-600 flex items-center justify-center space-x-2">
            <span>You saved</span>
            <span className="text-2xl">🌳</span>
            <span className="font-semibold text-green-700">3 trees worth</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Progress to Silver</span>
            <span className="text-sm text-gray-500">2.1 / 5.0 kg CO₂</span>
          </div>
          <Progress value={42} className="h-3 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500" 
                 style={{ width: '42%' }} />
          </Progress>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl mb-1">☁️</div>
            <div className="text-sm text-gray-500">Weekly</div>
            <div className="font-semibold text-gray-800">+12%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🌱</div>
            <div className="text-sm text-gray-500">Streak</div>
            <div className="font-semibold text-gray-800">7 days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-sm text-gray-500">Rank</div>
            <div className="font-semibold text-gray-800">#47</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

export default DashboardOverview;