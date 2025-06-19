import React, { useState } from 'react';
import { Leaf, X, Droplets, Sun, Sprout, Building2, TreePine, PackageCheck, ScanBarcode, CloudCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Education = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const openModal = (index) => {
    setActiveModal(index);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const greenScoreParams = [
    { name: 'Energy Efficiency', score: 'A+', percentage: 92 },
    { name: 'Materials Used', score: 'A', percentage: 88 },
    { name: 'Manufacturing', score: 'A++', percentage: 96 },
    { name: 'Packaging', score: 'B+', percentage: 82 },
    { name: 'Eco Certification', score: 'A+', percentage: 94 },
    { name: 'Carbon Emission', score: 'A', percentage: 85 },
    { name: 'Product Lifespan', score: 'A++', percentage: 98 },
    { name: 'Recyclability', score: 'A+', percentage: 90 }
  ];

  const aiTools = [
    {
      name: 'EcoSense AI',
      description: 'AI for Seller Validation & Local Seller Upliftment',
      icon: <Building2 className="h-10 w-10"/>,
      color: 'bg-emerald-100 text-emerald-800',
      modalContent: <div className="text-gray-700  leading-relaxed font-semibold text-xl">AI for Seller Validation & Local Seller Upliftment
<br/><li>Verifies sellers and maps genuine ecoproducts to right categories.</li><li>Empowers small/local eco-friendly
sellers
to access Amazon without paperwork
overload.</li></div>
    },
    {
      name: 'GreenGather AI',
      description: 'Personalized eco-friendly product recommendations',
      icon: <TreePine className="h-10 w-10" /> ,
      color: 'bg-green-100 text-green-800',
      modalContent: <div className="text-gray-700  leading-relaxed font-semibold text-xl">Your AI Green Assistant for Daily Shopping
<br/><li>Compares eco products on price, quality, availability in real-time.</li><li>Promotes Group Buying: Clusters orders by location/interest to cut emissions 35%.</li><li>Offers subscription boxes for groceries
from local vendors — with minimal
packaging waste.</li></div>
    },
    {
      name: 'Repack AI',
      description: 'Intelligent sustainable packaging solutions',
      icon: <PackageCheck className='h-10 w-10'/>,
      color: 'bg-teal-100 text-teal-800',
      modalContent: <div className="text-gray-700  leading-relaxed font-semibold text-xl">AI That Rethinks Packaging to Cut Plastic Waste
<br/><li>Uses 3D vision + LLMs to suggest optimized box
sizes.</li><li>Auto-generates disposal instructions via QR
codes.</li><li>Helps Amazon save money, and the planet, on
packaging.</li><li>Packaging Intelligence Portal: Sellers get AI
suggestions (e.g.,
"Switch to seed paper: save
₹3/unit").</li></div>
    },
    {
      name: 'CarbonKarma AI',
      description: 'Real-time carbon tracking and offset recommendations',
      icon: <CloudCheck className='h-10 w-10'/>,
      color: 'bg-lime-100 text-lime-800',
      modalContent: <div className="text-gray-700  leading-relaxed font-semibold text-xl">AI That Tracks Your Carbon Footprint, Product
by Product.
<br/><li>Checks carbon emission of products via LLM +
photo input.</li><li>Adds emotional motivation for users to choose
wisely.</li><li>Impact Dashboard: Real-time CO₂/waste
reduction metrics (e.g.,
"You saved 12kg CO₂ = 3
tree seedlings").</li></div>
    },
    {
      name: 'EcoChain Trace',
      description: 'AI-powered supply chain transparency and sustainability',
      icon: <ScanBarcode className='h-10 w-10'/>,
      color: 'bg-cyan-100 text-cyan-800',
      modalContent: <div className="text-gray-700  leading-relaxed font-semibold text-xl">Blockchain for Trust in Green Products<br/><li>Blockchain-based eco product certification &
rating.</li><li>Transparent product history (how, where,
what it’s made of).
</li><li>Brands can’t fake green anymore — buyers
know what's real.</li><li>GreenScore™: Blockchain-backed product
grading (A++ to D)
analyzing materials, supply chain, and
certifications.
</li></div>
    }
  ];

  const sustainabilityTips = [
    'Switch to LED light bulbs to reduce energy consumption by 75%',
    'Use reusable water bottles and shopping bags',
    'Choose local and seasonal produce to reduce transportation emissions',
    'Unplug electronics when not in use to eliminate phantom energy draw',
    'Opt for digital receipts and bills to reduce paper waste',
    'Wash clothes in cold water to save energy and preserve fabrics'
  ];

  const faqData = [
    {
      question: 'What is sustainable living?',
      answer: 'Sustainable living involves making choices that reduce your environmental impact by using fewer natural resources and minimizing waste. It encompasses everything from energy consumption to food choices and transportation methods.'
    },
    {
      question: 'How does the Green Score Badge System work?',
      answer: 'Our Green Score system evaluates products across 8 key sustainability parameters, assigning grades from A++ (excellent) to D (poor). This helps consumers make informed decisions about the environmental impact of their purchases.'
    },
    {
      question: 'Can I integrate your AI tools into my business?',
      answer: 'Yes! Our AI sustainability tools offer API integrations and enterprise solutions. Contact our business development team to discuss custom implementations for your specific industry needs.'
    },
    {
      question: 'How does the Return Box System reduce waste?',
      answer: 'Our smart threshold-based system tracks your packaging accumulation and notifies you when you have enough items to make a return shipment worthwhile, reducing transportation emissions and maximizing recycling efficiency.'
    },
    {
      question: 'Are these AI tools accessible to individual consumers?',
      answer: 'Absolutely! While we offer enterprise solutions, most of our AI tools have consumer-friendly versions available through mobile apps and web platforms, making sustainable living accessible to everyone.'
    }
  ];

  const getScoreColor = (score) => {
    if (score.includes('A++')) return 'bg-emerald-500';
    if (score.includes('A+')) return 'bg-green-500';
    if (score.includes('A')) return 'bg-lime-500';
    if (score.includes('B')) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const plantableSteps = [
    {
      icon: <Droplets className="h-6 w-6" />,
      title: "Unpack & Soak",
      description: "Remove your product and soak the plantable packaging in water for 2-3 minutes."
    },
    {
      icon: <Sprout className="h-6 w-6" />,
      title: "Plant It",
      description: "Place the soaked packaging in a pot with soil or directly in your garden."
    },
    {
      icon: <Sun className="h-6 w-6" />,
      title: "Water & Sunlight",
      description: "Water regularly and ensure it gets plenty of sunlight for optimal growth."
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Watch It Grow",
      description: "In 7-14 days, watch as your packaging transforms into beautiful plants!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-green-700 text-white py-20 px-4"
      style={{
          backgroundImage: `linear-gradient(to right, rgba(21, 128, 61, 0.8), rgba(21, 128, 61, 0.8)), url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom 20%",
        }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="h-16 w-16 text-green-200" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Embrace Sustainable Living with 
            <span className="text-green-200"> Smart AI</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
            Discover how everyday choices shape our planet's future. Join the movement towards eco-friendly living 
            powered by innovative green technologies that make sustainability simple and rewarding.
          </p>
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-lg font-medium">
              🌍 Every small action creates a ripple effect for positive change
            </p>
          </div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Why Sustainability Matters Now More Than Ever
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our planet is at a critical juncture. The choices we make today determine the world we leave for future generations. 
              Understanding the impact of our daily decisions is the first step toward meaningful change.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border-green-200 border-4 hover:shadow-2xl transition-all duration-300">
              <div className="text-4xl mb-4">🌡️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Climate Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Individual actions collectively drive 60% of global emissions. Small changes in consumption patterns 
                can significantly reduce your carbon footprint and inspire others to follow suit.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border-green-200 border-4 hover:shadow-2xl transition-all duration-300">
              <div className="text-4xl mb-4">♻️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Resource Conservation</h3>
              <p className="text-gray-600 leading-relaxed">
                By choosing sustainable products and practices, we preserve natural resources for future generations 
                while supporting circular economy principles that minimize waste.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border-green-200 border-4 hover:shadow-2xl transition-all duration-300">
              <div className="text-4xl mb-4">💚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Health & Wellbeing</h3>
              <p className="text-gray-600 leading-relaxed">
                Sustainable living promotes cleaner air, water, and food systems, directly benefiting personal health 
                while creating healthier communities for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Green Score Badge System */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Green Score Badge System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive sustainability rating system evaluates products across 8 critical parameters, 
              helping you make informed eco-friendly choices with confidence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-lg shadow-md border p-4 w-[20vw] flex flex-col justify-between mx-4 scale-160">
      <div className="relative">
        <img src="" alt="" className="rounded-md h-44 w-full object-cover" />
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            10% discount
          </div>
        <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
          🌿 Eco-Friendly
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-gray-800">Bamboo Fiber Dinnerware Set</h3>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <div className="flex text-yellow-400 mr-1">
            {"★".repeat(4)}
            {"☆".repeat(1)}
          </div>
          <span>(39)</span>
        </div>
      </div>

      <div className="bg-green-50 p-3 mt-3 rounded-lg border border-green-100 text-sm text-gray-700">
        <div className="flex items-center mb-2">
          <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
            A++
          </div>
          ECO BADGE
        </div>
        <div className="mb-1">This badge certifies the product's eco-friendly and sustainable attributes.</div>
        <div className="mt-2">
          <div className="flex justify-between">
            <span>Plastic Reduced</span>
            <span className="font-semibold">91%</span>
          </div>
          <div className="h-2 bg-green-100 rounded-full mb-2">
            <div className="h-2 bg-green-500 rounded-full" style={{ width: `91%` }}></div>
          </div>

          <div className="flex justify-between">
            <span>Chemical Reduced</span>
            <span className="font-semibold">8%</span>
          </div>
          <div className="h-2 bg-green-100 rounded-full mb-2">
            <div className="h-2 bg-green-500 rounded-full" style={{ width: `8%` }}></div>
          </div>
          <div>♻️ Recyclable</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
          <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
             <span className="ml-1">🌿100% Organic</span>
          </div>
          <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
             <span className="ml-1">♻️ Recyclable</span>
          </div>
      </div>
      

      <div className="mt-3 flex items-center gap-2">
        <div className="text-lg font-bold text-gray-800"></div>
          <div className="text-sm line-through text-gray-400"></div>
      </div>

      <button className="mt-4 bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700">
        Add to Cart
      </button>
    </div>

            {/* Scoring Parameters */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                8 Sustainability Parameters
              </h3>
              <div className="space-y-4">
                {greenScoreParams.map((param, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">{param.name}</span>
                      <div className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getScoreColor(param.score)}`}>
                        {param.score}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getScoreColor(param.score)}`}
                        style={{ width: `${param.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{param.percentage}% sustainable</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plantable Packaging Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Plantable Packaging: From Waste to Wildflowers
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the revolutionary world of plantable packaging - biodegradable materials embedded with seeds 
              that transform from protective packaging into thriving herbs, vegetables, and flowers. Turn every unboxing 
              into an opportunity to grow something beautiful and contribute to a greener planet.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Visual Element */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌱</div>
                    <p className="text-gray-600 font-medium">Plantable Packaging Example</p>
                    <p className="text-sm text-gray-500 mt-2">Eco-friendly box with embedded seeds</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-2">📦</div>
                    <p className="text-xs text-gray-600 font-medium">Before</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-2">💧</div>
                    <p className="text-xs text-gray-600 font-medium">Soak</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-2">🌿</div>
                    <p className="text-xs text-gray-600 font-medium">After</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Innovation Meets Nature
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      ♻️
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">100% Biodegradable</h4>
                      <p className="text-gray-600 text-sm">Made from recycled paper and organic materials that break down naturally in soil.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      🌱
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Embedded Seeds</h4>
                      <p className="text-gray-600 text-sm">Contains non-GMO seeds for herbs like basil, flowers like wildflowers, or vegetables.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      🌍
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Zero Waste Impact</h4>
                      <p className="text-gray-600 text-sm">Eliminates packaging waste while contributing to local ecosystems and biodiversity.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              How Plantable Packaging Works
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plantableSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-green-600">
                    {step.icon}
                  </div>
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mx-auto mb-3">
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Did You Know Section */}
            <div className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Did You Know?</h4>
                  <p className="leading-relaxed">
                    One plantable mailer can grow into enough basil for 10 pesto servings! Some plantable packaging 
                    can even grow into flowers that support local bee populations, helping to restore pollinator habitats 
                    one package at a time.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <Link to="/check-out"><div className="mt-8 text-center">
              <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors">
                Explore Plantable Packaging
              </button>
            </div></Link>
          </div>
        </div>
      </section>

      {/* Return Box System */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Smart Return Box System
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Revolutionizing packaging return with AI-powered threshold detection. Our system tracks your 
                packaging accumulation and optimizes return shipments for maximum environmental efficiency.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Accumulate Packaging</h4>
                    <p className="text-gray-600">Collect boxes, containers, and packaging materials from your purchases.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Smart Threshold Alert</h4>
                    <p className="text-gray-600">Receive notifications when you've reached the optimal return quantity.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Schedule Pickup</h4>
                    <p className="text-gray-600">Book convenient pickup times through our mobile app interface.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile App Mockup */}
            <div className="flex justify-center">
              <div className="bg-gray-800 rounded-3xl p-4 w-72">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-teal-500 text-white p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Return Box Status</h3>
                    <div className="text-3xl mb-2">📦</div>
                    <p className="text-sm opacity-90">Ready for pickup!</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Collection Progress</span>
                        <span className="text-sm font-bold text-teal-600">12/15 items</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-teal-500 h-3 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Cardboard boxes</span>
                        <span className="font-semibold">8 items</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Plastic containers</span>
                        <span className="font-semibold">3 items</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Paper packaging</span>
                        <span className="font-semibold">1 item</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-teal-500 text-white rounded-xl py-3 font-bold hover:bg-teal-600 transition-colors">
                      Schedule Pickup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technologies Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Innovative Green AI Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to make sustainable living effortless, 
              intelligent, and impactful. Our AI tools work behind the scenes to optimize your eco-friendly journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiTools.map((tool, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{tool.name}</h3>
                <p className="text-gray-600 leading-relaxed">{tool.description}</p>
                <div className="mt-6">
                  <button 
                    onClick={() => openModal(index)}
                    className="text-green-600 font-semibold hover:text-green-700 transition-colors cursor-pointer"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Tips */}
      <section className="py-16 px-4 bg-gradient-to-r from-lime-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Simple Steps, Big Impact . . .
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {sustainabilityTips.map((tip, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Did You Know Card */}
            <div>
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl p-8 sticky top-8">
                <h3 className="text-2xl font-bold mb-6">Did You Know? 🌍</h3>
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    If every household in the US replaced just one regular light bulb with an LED, 
                    we would save enough energy to light 3 million homes for a year and prevent 
                    greenhouse gas emissions equivalent to those from 800,000 cars.
                  </p>
                  <div className="bg-white/20 rounded-xl p-4">
                    <p className="text-sm font-semibold mb-2">💡 Quick Fact:</p>
                    <p className="text-sm">
                      LEDs use 75% less energy and last 25 times longer than traditional incandescent bulbs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about sustainable living and our green AI technologies.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-all duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                  <div className={`text-green-600 transform transition-transform duration-300 ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Sustainable Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Join thousands of individuals and businesses who are making a positive impact on our planet. 
            Every sustainable choice matters, and together we can create a greener future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Explore Our Impact
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-colors">
              Download Guide
            </button>
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {activeModal !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-green-800">
                  {aiTools[activeModal].name}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className={`w-20 h-20 ${aiTools[activeModal].color} rounded-2xl flex items-center justify-center text-3xl`}>
                  {aiTools[activeModal].icon}
                </div>
                
                
                  {aiTools[activeModal].modalContent}
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
