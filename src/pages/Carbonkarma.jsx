import DashboardOverview from "../components/CarboKrmadashboard.jsx";
import ProductSuggestions from "../components/CarbonKarmaproductsuugest.jsx";
import TopPerformers from "../components/Carbonkarmtopprfrmer.jsx";
import EmissionChecker from "../components/CarbonKrmaemmissioncheker";
import ImpactMetrics from "../components/Carbonkrmaimpactmtrics.jsx";
import Leaderboard from "../components/LeaderBoard.jsx";

const CarbonKarma = () => {
  return (
    <div className="min-h-screen bg-green-50">
    
      
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <DashboardOverview />
            <Leaderboard />
            <EmissionChecker />
            {/* <ProductSuggestions /> */}
            {/* <ImpactMetrics /> */}
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* <EmissionChecker /> */}
            <TopPerformers />
            <ImpactMetrics />
          </div>
        </div>
         <ProductSuggestions />
      </main>
    </div>
  );
};

export default CarbonKarma;
