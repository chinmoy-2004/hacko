import APIAccess from "../components/Apiacessecochain.jsx";
import ApplyCertification from "../components/Applycertificationchain.jsx";
import BlockchainDiagram from "../components/Blockchaindia.jsx";
import CertificatesPanel from "../components/Certificatepanel.jsx";
import TrackCertification from "../components/Trackcertecochian.jsx";
import VerifyECT from "../components/Verifyectecochain.jsx";

// Main Dashboard Component
const Dashboard = () => {
  return (
    <div className="min-h-screen m-3 p-2">


      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TrackCertification />
            <ApplyCertification />
          </div>

          <div className="space-y-6">
            <VerifyECT />
            <APIAccess />
          </div>
        </div>

        <div className="mt-8">
          <CertificatesPanel />
        </div>

        <div className="mt-12">
          <BlockchainDiagram />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
