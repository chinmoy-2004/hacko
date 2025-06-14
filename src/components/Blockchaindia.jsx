import { CheckCircle,FileText, Link, QrCode, ArrowRight} from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Blockchain Diagram
const BlockchainDiagram = () => {
  const steps = [
    { icon: <FileText className="h-8 w-8 text-blue-600" />, title: 'User Applies', description: 'Submit product documentation and sustainability data', status: 'Complete' },
    { icon: <CheckCircle className="h-8 w-8 text-green-600" />, title: 'Certification Body Validates', description: 'Third-party verification of claims and documentation', status: 'In Progress' },
    { icon: <Link className="h-8 w-8 text-purple-600" />, title: 'Data Uploaded to Blockchain', description: 'Immutable record created on distributed ledger', status: 'Pending' },
    { icon: <QrCode className="h-8 w-8 text-orange-600" />, title: 'Publicly Verifiable', description: 'QR code and hash enable instant verification', status: 'Pending' }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-2">🧬 Blockchain Certification Process</h2>
      <p className="text-gray-600 mb-6">End-to-end transparency powered by distributed ledger technology</p>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-6 min-w-0">
            <div className="flex-shrink-0 w-64 p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-center space-y-4">
                <div className="flex justify-center">{step.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{step.description}</p>
                </div>
                <Badge
                  variant={step.status === 'Complete' ? 'success' : step.status === 'In Progress' ? 'secondary' : 'default'}
                  className="w-full justify-center"
                >
                  {step.status}
                </Badge>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-shrink-0">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Powered by Ethereum Blockchain</span>
          </span>
          <span className="text-gray-600">Average processing time: 3-5 business days</span>
        </div>
      </div>
    </Card>
  );
};

export default BlockchainDiagram