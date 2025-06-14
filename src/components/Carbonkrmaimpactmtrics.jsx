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

 // Impact Metrics Component
  const ImpactMetrics = () => (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-800">📊 Impact Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <div className="text-3xl mb-2">🌿</div>
            <div className="text-2xl font-bold text-green-700">12.5 kg</div>
            <div className="text-sm text-gray-600">Lifetime CO₂ Saved</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
            <div className="text-3xl mb-2">🚀</div>
            <div className="text-2xl font-bold text-blue-700">+15%</div>
            <div className="text-sm text-gray-600">Weekly Growth</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-purple-700">+12%</div>
            <div className="text-sm text-gray-600">Trend This Week</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">Monthly Progress</span>
            <span className="text-sm text-gray-500">8.2 / 15.0 kg CO₂</span>
          </div>
          <Progress value={55} className="h-4 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2" 
                 style={{ width: '55%' }}>
              <span className="text-xs text-white font-medium">🌳</span>
            </div>
          </Progress>
        </div>
      </CardContent>
    </Card>
  );


export default ImpactMetrics;