import AllInOneVerification from '../components/Allinoneverification.jsx';

const Ecosense = () => {
  return (
    <div className="min-h-screen bg-green-50">
     

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12 bg-gradient-to-r from-eco-green/10 to-verification-blue/10 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-eco-green">EcoSense AI</span> Seller Trust Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI-powered verification system ensuring authentic sellers and trusted transactions 
            through blockchain technology and real-time validation.
          </p>
        </div>

        {/* 3-Tier Verification Pipeline */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">🧱 3-Tier Verification Pipeline</h2>
            <p className="text-lg text-muted-foreground">
              Complete seller verification process with AI validation and blockchain certification
            </p>
          </div>

          <AllInOneVerification />
        </div>
      </div>
    </div>
  );
};

export default Ecosense;
