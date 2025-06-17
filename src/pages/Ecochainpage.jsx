import { Link } from "react-router-dom";
import APIAccess from "../components/Apiacessecochain.jsx";
import ApplyCertification from "../components/Applycertificationchain.jsx";
import BlockchainDiagram from "../components/Blockchaindia.jsx";
import CertificatesPanel from "../components/Certificatepanel.jsx";
import TrackCertification from "../components/Trackcertecochian.jsx";
import VerifyECT from "../components/Verifyectecochain.jsx";

const Box = ({ children, className = '', variant = 'default', size = 'default', onClick, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    ghost: 'hover:bg-gray-100',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
  };
  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-7 px-3 text-sm',
    icon: 'h-10 w-10'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  return (
    <div className="min-h-screen m-3 p-2">


      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CertificatesPanel />
            <TrackCertification />
            {/* <ApplyCertification /> */}
          </div>

          <div className="space-y-6">
            <VerifyECT />
            <Link to="/applyforcertification">
              <Box className="w-full cursor-pointer">
                Apply for Certification
              </Box>
            </Link>
          </div>
        </div>

        {/* <div className="mt-8">
          <CertificatesPanel />
        </div> */}

        {/* <div className="mt-12">
          <BlockchainDiagram />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
