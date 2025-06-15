import { Package, QrCode, MessageCircle, Search, ShoppingCart, Menu, Coins, Scan, Camera, Bot, Recycle, Box } from "lucide-react";
import PackageDimensionModal from "../components/PackageDimensionModal";
import { useState } from "react";
import OCRResultsModal from "../components/OCRResultsModal";
import QRCodeModal from "../components/QRCodeModal";
import AIAssistantModal from "../components/AIAssistantModal";
import MLRecognitionModal from '../components/MLRecognitionModal';

const RepackAI = () => {
    const [isDimensionsModalOpen, setIsDimensionsModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isMLModalOpen, setIsMLModalOpen] = useState(false);
  const [isOCRModalOpen, setIsOCRModalOpen] = useState(false);

  const handleStartOCRScan = () => {
    // Open the OCR modal directly
    console.log('Starting OCR scan...');
    setTimeout(() => {
      setIsOCRModalOpen(true);
    }, 0);
  };

const handleEnableMLRecognition = () => {
    // Simulate ML recognition process
    console.log('Starting ML recognition...');
    setTimeout(() => {
      setIsMLModalOpen(true);
    }, 0);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section - Package Scanning */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Repack AI Scanner</h1>
            <p className="text-xl text-gray-600">Scan, measure, and get disposal guidance for any package</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Package Dimension Scanner */}
            <div className="bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-colors shadow-sm">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Box className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Package Dimensions</h3>
                <p className="text-gray-600 mb-4">AI-powered dimension scanning using your camera</p>
                <button 
                  onClick={() => setIsDimensionsModalOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>Scan Dimensions</span>
                </button>
              </div>
            </div>

            {/* QR Code Scanner */}
            <div className="bg-white rounded-lg border-2 border-green-200 hover:border-green-400 transition-colors shadow-sm">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">QR Code Scanner</h3>
                <p className="text-gray-600 mb-4">Get instant disposal guides from package QR codes</p>
                <button 
                  onClick={() => setIsQRModalOpen(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <QrCode className="h-4 w-4" />
                  <span>Scan QR Code</span>
                </button>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-colors shadow-sm">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
                <p className="text-gray-600 mb-4">Ask questions about package disposal and recycling</p>
                <button 
                  onClick={() => setIsAIModalOpen(true)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat with AI</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Scans */}
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
                  
                  <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OCR and ML Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Smart Recognition Features</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* OCR Scanner */}
            <div className="bg-white rounded-lg border-2 border-orange-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Scan className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">OCR Text Scanner</h3>
                    <p className="text-gray-600">Extract text from package labels</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Last scan detected:</div>
                    <div className="font-medium">"Recyclable Material - Code #2 HDPE"</div>
                  </div>
                </div>
                
                <button 
                onClick={handleStartOCRScan}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                  Start OCR Scan
                </button>
              </div>
            </div>

            {/* ML Recognition */}
            <div className="bg-white rounded-lg border-2 border-indigo-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Bot className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">ML Package Recognition</h3>
                    <p className="text-gray-600">AI identifies package materials automatically</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">94%</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">1.2s</div>
                    <div className="text-sm text-gray-600">Scan Time</div>
                  </div>
                </div>
                
                <button 
                onClick={handleEnableMLRecognition}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                  Enable ML Recognition
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Disposal Guide */}
        <section className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300 rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900">AI Disposal Assistant</h3>
                  <p className="text-gray-600">Get personalized guidance for proper package disposal</p>
                </div>
                <button 
                  onClick={() => setIsAIModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
                >
                  Ask AI for Help
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    {/* Modals */}
      <PackageDimensionModal 
        isOpen={isDimensionsModalOpen}
        onClose={() => setIsDimensionsModalOpen(false)}
      />
      <QRCodeModal 
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
      <AIAssistantModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />
      <MLRecognitionModal
        isOpen={isMLModalOpen}
        onClose={() => setIsMLModalOpen(false)}
      />
      <OCRResultsModal 
        isOpen={isOCRModalOpen}
        onClose={() => setIsOCRModalOpen(false)} /> 
    </div>
  );
};

export default RepackAI;
