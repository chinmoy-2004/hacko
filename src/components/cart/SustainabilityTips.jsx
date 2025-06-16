import { Leaf } from "lucide-react";

const SustainabilityTips = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg">
      <div className="p-6 border-b border-green-200">
        <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          Did You Know?
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-3 text-sm text-green-700">
          <p>• Bamboo products help reduce deforestation by providing a sustainable alternative to wood.</p>
          <p>• Organic cotton uses 88% less water and 62% less energy than conventional cotton.</p>
          <p>• Your eco-friendly choices help support over 10,000 sustainable farmers worldwide.</p>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityTips;