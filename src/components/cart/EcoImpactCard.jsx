import { Droplets, Leaf, Users } from "lucide-react";

const EcoImpactCard = ({ totalCarbonSaved, totalWaterSaved, supportedArtisans }) => {
  return (
    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
      <h4 className="font-semibold text-green-800 mb-3">🌱 Your Eco Impact</h4>
      <div className="space-y-2 text-sm text-green-700">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Droplets className="h-3 w-3" />
            Water Saved
          </span>
          <span className="font-medium">{totalWaterSaved}L</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Leaf className="h-3 w-3" />
            CO₂ Prevented
          </span>
          <span className="font-medium">{totalCarbonSaved.toFixed(1)}kg</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            Artisans Supported
          </span>
          <span className="font-medium">{supportedArtisans}</span>
        </div>
      </div>
    </div>
  );
};

export default EcoImpactCard;
