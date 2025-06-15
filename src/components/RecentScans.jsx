import { useState } from 'react';
import { Scan, Recycle } from "lucide-react";
import PackageDetailsModal from './PackageDetailsModal';

const RecentScans = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const recentScans = [
    {
      id: 1,
      packageType: "Cardboard Box",
      dimensions: "20x15x10 cm",
      disposal: "Recyclable",
      scanTime: "2 mins ago",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      packageType: "Plastic Container",
      dimensions: "12x8x5 cm",
      disposal: "Check local recycling",
      scanTime: "5 mins ago",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      packageType: "Glass Jar",
      dimensions: "8x8x12 cm",
      disposal: "Fully recyclable",
      scanTime: "10 mins ago",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop"
    }
  ];

  const handleViewDetails = (scan) => {
    setSelectedPackage(scan);
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Recent Scans</h2>
          <div className="flex items-center text-blue-600">
            <Scan className="h-5 w-5 mr-2" />
            <span className="text-sm">ML Recognition Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentScans.map((scan) => (
            <div key={scan.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200">
              <div className="p-4">
                <div className="relative mb-4">
                  <img 
                    src={scan.image} 
                    alt={scan.packageType}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {scan.scanTime}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{scan.packageType}</h3>
                <p className="text-gray-600 text-sm mb-2">Dimensions: {scan.dimensions}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Recycle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">{scan.disposal}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleViewDetails(scan)}
                  className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PackageDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        packageData={selectedPackage}
      />
    </>
  );
};

export default RecentScans;