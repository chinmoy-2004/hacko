import { useState, useEffect,useRef } from 'react';
import {
  ChevronDown, MapPin, Upload, Building2, Camera, Link, Brain,
  RefreshCw, CheckCircle, AlertCircle, Clock, Hash, Shield,
  Lock, Eye, Settings, Database, UserCheck, Copy, ExternalLink
} from 'lucide-react';

// UI Components with semantic design tokens
const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-lg border border-[hsl(var(--card-border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] shadow-[var(--card-shadow)] ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight text-[hsl(var(--text-primary))] ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-sm text-[hsl(var(--text-secondary))] ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({
  className = "",
  variant = "default",
  size = "default",
  children,
  disabled = false,
  onClick = () => { },
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--input-focus))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-[hsl(var(--button-primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--button-primary-hover))]",
    outline: "border border-[hsl(var(--input-border))] bg-[hsl(var(--button-outline))] hover:bg-[hsl(var(--button-outline-hover))] hover:text-[hsl(var(--text-primary))]",
    secondary: "bg-[hsl(var(--button-secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--button-secondary-hover))]",
    ghost: "hover:bg-[hsl(var(--button-ghost-hover))] hover:text-[hsl(var(--text-primary))]"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-[hsl(var(--input-border))] bg-[hsl(var(--input-bg))] px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--input-placeholder))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--input-focus))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
    {...props}
  />
);

const Label = ({ className = "", children, ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[hsl(var(--text-primary))] ${className}`} {...props}>
    {children}
  </label>
);

const Badge = ({ className = "", variant = "default", children, ...props }) => {
  const variants = {
    default: "border-transparent bg-[hsl(var(--badge-success))] text-[hsl(var(--badge-success-text))] hover:bg-[hsl(var(--badge-success))]/80",
    secondary: "border-transparent bg-[hsl(var(--button-secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--button-secondary-hover))]",
    outline: "border border-[hsl(var(--input-border))] bg-[hsl(var(--badge-outline))] text-[hsl(var(--badge-outline-text))]",
    success: "border-transparent bg-[hsl(var(--badge-success))] text-[hsl(var(--badge-success-text))]",
    warning: "border-transparent bg-[hsl(var(--badge-warning))] text-[hsl(var(--badge-warning-text))]",
    error: "border-transparent bg-[hsl(var(--badge-error))] text-[hsl(var(--badge-error-text))]",
    info: "border-transparent bg-[hsl(var(--badge-info))] text-[hsl(var(--badge-info-text))]"
  };

  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--input-focus))] focus:ring-offset-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Progress = ({ value = 0, className = "", ...props }) => (
  <div className={`relative h-4 w-full overflow-hidden rounded-full bg-[hsl(var(--progress-bg))] ${className}`} {...props}>
    <div
      className="h-full w-full flex-1 bg-[hsl(var(--progress-fill))] transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
);

// Toast hook
const useToast = () => {
  const toast = ({ title, description }) => {
    console.log(`Toast: ${title} - ${description}`);
    // Simple fallback notification
    if (window.alert) {
      window.alert(`${title}: ${description}`);
    }
  };

  return { toast };
};

const AllInOneVerification = () => {
  const [isOpenmodal, setIsOpenmodal] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [formData, setFormData] = useState({
    businessName: '',
    gstin: '',
    pan: '',
    aadhaar: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: ''
  });

  const [verificationSteps, setVerificationSteps] = useState([
    {
      id: 'image',
      title: '📷 Image Processing',
      status: 'pending',
      progress: 0,
      details: 'Auto-enhancement of uploaded shop photo',
      timestamp: ''
    },
    {
      id: 'api',
      title: '🔗 API Validation',
      status: 'pending',
      progress: 0,
      details: 'UIDAI & NSDL real-time validation',
      timestamp: ''
    },
    {
      id: 'brand',
      title: '🧠 AI Brand Detection',
      status: 'pending',
      progress: 0,
      details: 'AWS Rekognition & PhotoDNA analysis',
      timestamp: ''
    },
    {
      id: 'path',
      title: '📊 Eco Zone Assignment',
      status: 'pending',
      progress: 0,
      details: 'Shortest path algorithm for optimal hub assignment',
      timestamp: ''
    }
  ]);

  const [sellerId, setSellerId] = useState('ECO-AI-2024-IN-7849A2B1');
  const [blockchainHash, setBlockchainHash] = useState('0x8f7a2e9d3c4b5a1f6e8d9c2b4a7f3e6d5c8b1a4f7e9d2c5b8a1f4e7d0c3b6a9f2e5d8c1b4a7f0e3d6c9b2a5f8e1d4c7b0a3f6e9d2c5b8a1f4e7d0c3b6a9f2e5d8c1');
  const [trustLevel, setTrustLevel] = useState('High');
  const [isGenerating, setIsGenerating] = useState(false);

  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    toast({
      title: "Registration Submitted",
      description: "Your shop registration has been submitted for verification.",
    });
    setIsOpenmodal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-[hsl(var(--verification-success))]" />;
      case 'processing':
        return <RefreshCw className="h-5 w-5 text-[hsl(var(--verification-processing))] animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-[hsl(var(--verification-failed))]" />;
      default:
        return <Clock className="h-5 w-5 text-[hsl(var(--verification-pending))]" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[hsl(var(--verification-success))]';
      case 'processing':
        return 'bg-[hsl(var(--verification-processing))]';
      case 'failed':
        return 'bg-[hsl(var(--verification-failed))]';
      default:
        return 'bg-[hsl(var(--verification-pending))]';
    }
  };

  const runVerification = () => {
    setVerificationSteps(prev => prev.map(step => ({ ...step, status: 'pending', progress: 0 })));

    let currentStepIndex = 0;
    const processStep = () => {
      if (currentStepIndex >= verificationSteps.length) return;

      setVerificationSteps(prev => prev.map((step, index) => {
        if (index === currentStepIndex) {
          return {
            ...step,
            status: 'processing',
            timestamp: new Date().toLocaleTimeString()
          };
        }
        return step;
      }));

      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);

          setVerificationSteps(prev => prev.map((step, index) => {
            if (index === currentStepIndex) {
              return {
                ...step,
                status: Math.random() > 0.2 ? 'completed' : 'failed',
                progress: 100
              };
            }
            return step;
          }));

          currentStepIndex++;
          setTimeout(processStep, 1000);
        } else {
          setVerificationSteps(prev => prev.map((step, index) => {
            if (index === currentStepIndex) {
              return { ...step, progress };
            }
            return step;
          }));
        }
      }, 500);
    };

    processStep();

    toast({
      title: "Verification Started",
      description: "AI verification pipeline has been initiated.",
    });
  };

  const generateNewId = async () => {
    setIsGenerating(true);

    setTimeout(() => {
      const newId = `ECO-AI-2024-IN-${Math.random().toString(16).substr(2, 8).toUpperCase()}`;
      const newHash = `0x${Math.random().toString(16).substr(2, 128)}`;

      setSellerId(newId);
      setBlockchainHash(newHash);
      setTrustLevel(['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]);
      setIsGenerating(false);

      toast({
        title: "New Seller ID Generated",
        description: "Your unique seller ID has been created and recorded on blockchain.",
      });
    }, 3000);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} Copied`,
      description: `${type} has been copied to clipboard.`,
    });
  };

  const getTrustLevelColor = (level) => {
    switch (level) {
      case 'High':
        return 'bg-[hsl(var(--badge-success))] text-[hsl(var(--badge-success-text))]';
      case 'Medium':
        return 'bg-[hsl(var(--badge-warning))] text-[hsl(var(--badge-warning-text))]';
      case 'Low':
        return 'bg-[hsl(var(--badge-error))] text-[hsl(var(--badge-error-text))]';
      default:
        return 'bg-[hsl(var(--button-secondary))] text-[hsl(var(--text-secondary))]';
    }
  };

  const getTrustScore = (level) => {
    switch (level) {
      case 'High':
        return 85;
      case 'Medium':
        return 60;
      case 'Low':
        return 35;
      default:
        return 0;
    }
  };


  const shopImageInputRef = useRef(null);
  const licenseDocInputRef = useRef(null);

  const handleFileClick = (ref) => {
    ref.current?.click();
  };

  const handleFileChange = (label, e) => {
    const files = e.target.files;
    if (files.length > 0) {
      console.log(`${label} selected:`, files);
    }
  };


  return (
    <div className="space-y-8">
      {/* Seller Registration */}
      <Card className="w-full">
        <div className="cursor-pointer hover:bg-[hsl(var(--card-hover))] transition-colors" onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[hsl(var(--eco-green))]/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-[hsl(var(--eco-green))]" />
                </div>
                <div>
                  <CardTitle className="text-xl">🏪 Seller/Shop Registration</CardTitle>
                  <CardDescription>Complete your business registration for verification</CardDescription>
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isRegistrationOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </div>

        {isRegistrationOpen && (
          <CardContent className="space-y-6">
            {/* Location Detection */}
            <div className="p-4 bg-[hsl(var(--eco-green-light))]/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="h-5 w-5 text-[hsl(var(--eco-green))]" />
                <h3 className="font-semibold">📍 Location Detection</h3>
              </div>
              <Button variant="outline" className="w-full">
                Auto-detect Current Location
              </Button>
            </div>

            {/* Business Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Enter your business name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gstin">🧾 GST Number</Label>
                <Input
                  id="gstin"
                  value={formData.gstin}
                  onChange={(e) => handleInputChange('gstin', e.target.value)}
                  placeholder="Enter GST number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input
                  id="pan"
                  value={formData.pan}
                  onChange={(e) => handleInputChange('pan', e.target.value)}
                  placeholder="Enter PAN number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  value={formData.aadhaar}
                  onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                  placeholder="Enter Aadhaar number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    placeholder="PIN Code"
                  />
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center space-x-2">
                <Upload className="h-5 w-5 text-[hsl(var(--eco-green))]" />
                <span>📤 Upload Documents</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-dashed border-[hsl(var(--text-secondary))]/25 rounded-lg text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-[hsl(var(--text-secondary))]" />
                  <p className="text-sm text-[hsl(var(--text-secondary))]">Shop Images</p>
                  <Button variant="outline" size="sm" className="mt-2 cursor-pointer" onClick={() => handleFileClick(shopImageInputRef)}>
                    Choose Files
                  </Button>
                  <input
                    type="file"
                    ref={shopImageInputRef}
                    onChange={(e) => handleFileChange("Shop Images", e)}
                    className="hidden"
                    accept=".png,.jpg,.jpeg"
                    multiple
                  />
                </div>

                <div className="p-4 border-2 border-dashed border-[hsl(var(--text-secondary))]/25 rounded-lg text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-[hsl(var(--text-secondary))]" />
                  <p className="text-sm text-[hsl(var(--text-secondary))]">License Documents</p>
                  <Button variant="outline" size="sm" className="mt-2 cursor-pointer"  onClick={() => handleFileClick(licenseDocInputRef)}>
                    Choose Files
                  </Button>
                   <input
                    type="file"
                    ref={licenseDocInputRef}
                    onChange={(e) => handleFileChange("Shop license", e)}
                    className="hidden"
                    accept=".png,.jpg,.jpeg"
                    multiple
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-[hsl(var(--eco-green))] cursor-pointer hover:bg-[hsl(var(--eco-green))]/90 text-[hsl(var(--primary-foreground))]"
              size="lg"
            >
              🔍 Submit for Verification
            </Button>
          </CardContent>
        )}
      </Card>
  
       {/* AI Verification  */}
    {isOpenmodal && (   
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[hsl(var(--verification-blue))]/10 rounded-lg">
                <Brain className="h-6 w-6 text-[hsl(var(--verification-blue))]" />
              </div>
              <div>
                <CardTitle className="text-xl">✅ AI Verification + API Layer</CardTitle>
                <CardDescription>Real-time verification pipeline with AI-powered validation</CardDescription>
              </div>
            </div>
            <Button onClick={runVerification} className="bg-[hsl(var(--verification-blue))] hover:bg-[hsl(var(--verification-blue))]/90 text-[hsl(var(--primary-foreground))]">
              <RefreshCw className="h-4 w-4 mr-2" />
              Re-run Verification
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Breadcrumb Pipeline */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {verificationSteps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-2 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                    {getStatusIcon(step.status)}
                  </div>
                  {index < verificationSteps.length - 1 && (
                    <div className="w-8 h-0.5 bg-[hsl(var(--button-secondary))]"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Detailed Steps */}
            <div className="space-y-4">
              {verificationSteps.map((step) => (
                <div key={step.id} className="p-4 border border-[hsl(var(--card-border))] rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(step.status)}
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-[hsl(var(--text-secondary))]">{step.details}</p>
                      </div>
                    </div>
                    <Badge variant={step.status === 'completed' ? 'success' : 'secondary'}>
                      {step.status}
                    </Badge>
                  </div>

                  {step.status === 'processing' && (
                    <Progress value={step.progress} className="w-full" />
                  )}

                  {step.status === 'completed' && step.id === 'brand' && (
                    <div className="mt-3 p-3 bg-[hsl(var(--button-secondary))] rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Brand Detection Results:</h4>
                      <div className="space-y-1">
                        <Badge variant="success">Verified Brand: Nike</Badge>
                        <Badge variant="outline">Image Authenticity: 94%</Badge>
                        <Badge variant="outline">Brand Match Confidence: 98%</Badge>
                      </div>
                    </div>
                  )}

                  {step.status === 'completed' && step.id === 'api' && (
                    <div className="mt-3 p-3 bg-[hsl(var(--button-secondary))] rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">API Validation Results:</h4>
                      <div className="space-y-1">
                        <Badge variant="success">UIDAI: Verified</Badge>
                        <Badge variant="success">NSDL: Validated</Badge>
                        <Badge variant="outline">Response Time: 1.2s</Badge>
                      </div>
                    </div>
                  )}

                  {step.timestamp && (
                    <p className="text-xs text-[hsl(var(--text-secondary))]">
                      Last updated: {step.timestamp}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>)}

      {/* Seller ID Generator */}
      {isOpenmodal && (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[hsl(var(--success-green))]/10 rounded-lg">
              <Hash className="h-6 w-6 text-[hsl(var(--success-green))]" />
            </div>
            <div>
              <CardTitle className="text-xl">🆔 Seller Unique ID Generator</CardTitle>
              <CardDescription>Your verified seller identification and blockchain certificate</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Seller ID Display */}
          <div className="p-6 bg-gradient-to-r from-[hsl(var(--eco-green))]/10 to-[hsl(var(--verification-blue))]/10 rounded-lg border border-[hsl(var(--card-border))]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Your Seller Unique ID</span>
                </h3>
                <Button
                  onClick={generateNewId}
                  disabled={isGenerating}
                  variant="outline"
                  size="sm"
                >
                  {isGenerating ? 'Generating...' : 'Regenerate'}
                </Button>
              </div>

              <div className="bg-[hsl(var(--card-bg))] p-4 rounded-lg border border-[hsl(var(--card-border))]">
                <div className="flex items-center justify-between">
                  <code className="text-xl font-mono bg-[hsl(var(--button-secondary))] px-3 py-2 rounded">
                    {sellerId}
                  </code>
                  <Button
                    onClick={() => copyToClipboard(sellerId, 'Seller ID')}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <p className="text-sm text-[hsl(var(--text-secondary))]">Generating unique identifier...</p>
                  <Progress value={67} className="w-full" />
                </div>
              )}
            </div>
          </div>

          {/* Blockchain Status */}
          <div className="p-4 border border-[hsl(var(--card-border))] rounded-lg space-y-4">
            <h3 className="font-semibold flex items-center space-x-2">
              <Link className="h-5 w-5 text-[hsl(var(--verification-blue))]" />
              <span>🔁 Blockchain Hash Status</span>
            </h3>

            <div className="space-y-3">
              <div className="bg-[hsl(var(--button-secondary))] p-3 rounded-lg">
                <p className="text-sm text-[hsl(var(--text-secondary))] mb-2">Blockchain Hash:</p>
                <div className="flex items-center justify-between">
                  <code className="text-xs font-mono bg-[hsl(var(--card-bg))] px-2 py-1 rounded break-all">
                    {blockchainHash.substring(0, 40)}...
                  </code>
                  <Button
                    onClick={() => copyToClipboard(blockchainHash, 'Blockchain Hash')}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="success">Confirmed</Badge>
                <Badge variant="outline">Block: #9,847,523</Badge>
                <Badge variant="outline">Gas Used: 21,000</Badge>
              </div>
            </div>
          </div>

          {/* Trust Level */}
          <div className="p-4 border border-[hsl(var(--card-border))] rounded-lg space-y-4">
            <h3 className="font-semibold flex items-center space-x-2">
              <Shield className="h-5 w-5 text-[hsl(var(--success-green))]" />
              <span>🔒 Trust Level Assessment</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[hsl(var(--text-secondary))]">Current Trust Level:</span>
                <Badge className={getTrustLevelColor(trustLevel)}>
                  {trustLevel}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trust Score</span>
                  <span className="text-sm font-semibold">{getTrustScore(trustLevel)}/100</span>
                </div>
                <Progress value={getTrustScore(trustLevel)} className="w-full" />
              </div>

              <div className="text-sm text-[hsl(var(--text-secondary))] space-y-1">
                <p>• Based on verification history</p>
                <p>• Document authenticity score</p>
                <p>• API validation results</p>
                <p>• Blockchain transaction integrity</p>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-[hsl(var(--eco-green))] hover:bg-[hsl(var(--eco-green))]/90 text-[hsl(var(--primary-foreground))]"
            size="lg"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Link to EcoChain Trace
          </Button>
        </CardContent>
      </Card>)}

      {/* Security Panel */}
      {isOpenmodal && (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Fraud Detection */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[hsl(var(--warning-orange))]/10 rounded-lg">
                <Eye className="h-6 w-6 text-[hsl(var(--warning-orange))]" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Fraud Detection Tools</CardTitle>
                <CardDescription>Advanced AI-powered security monitoring</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="p-4 border border-[hsl(var(--card-border))] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Powered by AWS Rekognition</h3>
                <Badge variant="warning">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">Real-time Analysis</span>
                  <span className="text-sm font-semibold">✓ Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">Face Detection</span>
                  <span className="text-sm font-semibold">✓ Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">Object Recognition</span>
                  <span className="text-sm font-semibold">✓ Running</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-[hsl(var(--card-border))] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Cross-matches Image DNA</h3>
                <Badge variant="outline">Scanning</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">Database Entries</span>
                  <span className="text-sm font-semibold">2.3M Images</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">Match Speed</span>
                  <span className="text-sm font-semibold">&lt; 0.5s</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[hsl(var(--success-green))]/10 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Image Authenticity Assessment</h3>
                <Badge variant="success">94%</Badge>
              </div>
              <Progress value={94} className="w-full mb-2" />
              <div className="text-sm text-[hsl(var(--text-secondary))] space-y-1">
                <p>• Metadata integrity: ✓ Verified</p>
                <p>• Pixel-level analysis: ✓ Authentic</p>
                <p>• Manipulation detection: ✗ None found</p>
                <p>• Timestamp validation: ✓ Consistent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[hsl(var(--verification-blue))]/10 rounded-lg">
                <Lock className="h-6 w-6 text-[hsl(var(--verification-blue))]" />
              </div>
              <div>
                <CardTitle className="text-lg">Data Security Overview</CardTitle>
                <CardDescription>Enterprise-grade security and compliance</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="p-4 border border-[hsl(var(--card-border))] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-[hsl(var(--verification-blue))]" />
                  <span>🔐 AES-256 Encryption</span>
                </h3>
                <Badge variant="info">Enabled</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">Data at Rest</span>
                  <span className="text-sm font-semibold">✓ Encrypted</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">Data in Transit</span>
                  <span className="text-sm font-semibold">✓ TLS 1.3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">Key Management</span>
                  <span className="text-sm font-semibold">✓ HSM Protected</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-[hsl(var(--card-border))] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center space-x-2">
                  <UserCheck className="h-5 w-5 text-[hsl(var(--verification-blue))]" />
                  <span>🔐 Role-Based Access Control</span>
                </h3>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">Admin Users</span>
                  <span className="text-sm font-semibold">3 Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">Verifier Agents</span>
                  <span className="text-sm font-semibold">12 Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--text-secondary))]">System Access</span>
                  <span className="text-sm font-semibold">Restricted</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[hsl(var(--verification-blue))]/10 rounded-lg">
              <h3 className="font-semibold mb-3">Compliance Standards</h3>
              <div className="grid grid-cols-2 gap-3">
                <Badge variant="outline">ISO 27001</Badge>
                <Badge variant="outline">SOC 2 Type II</Badge>
                <Badge variant="outline">GDPR</Badge>
                <Badge variant="outline">PCI DSS</Badge>
              </div>
            </div>

            <Button
              className="w-full bg-[hsl(var(--verification-blue))] hover:bg-[hsl(var(--verification-blue))]/90 text-[hsl(var(--primary-foreground))]"
              size="lg"
            >
              <Settings className="h-4 w-4 mr-2" />
              Manage Data Permissions
            </Button>
          </CardContent>
        </Card>
      </div>)}

      {/* Visual Flow */}
      {isOpenmodal && (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">🧬 Verification Journey</CardTitle>
          <CardDescription>Track your verification progress in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[hsl(var(--eco-green))] rounded-full flex items-center justify-center text-[hsl(var(--primary-foreground))] font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">🏪 Seller Registration</h3>
                  <p className="text-sm text-[hsl(var(--text-secondary))]">Business details & documents</p>
                </div>
              </div>
              <Badge variant="success">Completed</Badge>
            </div>

            <div className="flex items-center">
              <div className="w-1 h-12 bg-[hsl(var(--eco-green))]/30 ml-6"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[hsl(var(--verification-blue))] rounded-full flex items-center justify-center text-[hsl(var(--primary-foreground))] font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">✅ AI Verification</h3>
                  <p className="text-sm text-[hsl(var(--text-secondary))]">UIDAI, NSDL & brand validation</p>
                </div>
              </div>
              <Badge variant="info">Processing</Badge>
            </div>

            <div className="flex items-center">
              <div className="w-1 h-12 bg-[hsl(var(--button-secondary))] ml-6"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[hsl(var(--button-secondary))] rounded-full flex items-center justify-center text-[hsl(var(--text-secondary))] font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-[hsl(var(--text-secondary))]">🆔 ID Generation</h3>
                  <p className="text-sm text-[hsl(var(--text-secondary))]">Unique seller ID & blockchain</p>
                </div>
              </div>
              <Badge variant="outline">Pending</Badge>
            </div>

            <div className="flex items-center">
              <div className="w-1 h-12 bg-[hsl(var(--button-secondary))] ml-6"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[hsl(var(--button-secondary))] rounded-full flex items-center justify-center text-[hsl(var(--text-secondary))] font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-[hsl(var(--text-secondary))]">🔗 EcoChain Link</h3>
                  <p className="text-sm text-[hsl(var(--text-secondary))]">Final blockchain verification</p>
                </div>
              </div>
              <Badge variant="outline">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>)}
    </div>
  );
};

 

export default AllInOneVerification;