import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/impact/CustomCard';
import { Badge } from '../components/impact/CustomBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/impact/CustomTabs';
import { Earth, ArrowUp, Mail, Building2, MessageCircle } from 'lucide-react';
import ImpactCharts from '../components/impact/ImpactCharts';
import LiveCounters from '../components/impact/LiveCounters';
import StorySection from '../components/impact/StorySection';

const Impact = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [isVisible, setIsVisible] = useState(false);

  const scrollToLiveSection = () => {
  const liveSection = document.getElementById("live-section");
  if (liveSection) {
    liveSection.scrollIntoView({ behavior: "smooth",
      duration: 1000
    });
  }
};


  useEffect(() => {
    setIsVisible(true);
  }, []);

  const yearlyData = {
    '2025': {
      plasticProducts: '284,000+',
      plasticPrevented: '12,500',
      carbonPrevented: '19,847',
      treesPlanted: '8,500'
    },
    '2024': {
      plasticProducts: '234,000+',
      plasticPrevented: '10,000',
      carbonPrevented: '17,936',
      treesPlanted: '7,200'
    },
    '2023': {
      plasticProducts: '186,000+',
      plasticPrevented: '8,200',
      carbonPrevented: '14,567',
      treesPlanted: '5,800'
    }
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(31, 70, 44, 0.2), rgba(31, 59, 44, 0.8)), url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        
        <div className={`relative z-20 text-center text-white px-6`}>
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Our Impact
          </h1>
          <p className=" text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Every choice you make leaves a mark. Here's how we're making sure it's a green one.
          </p>
          
          <div className="mt-12 flex justify-center">
  <button onClick={scrollToLiveSection} className="animate-bounce hover:bg-white/10 rounded-full p-4">
    <ArrowUp className="w-8 h-8 text-mint rotate-180" />
  </button>
</div>

        </div>
      </section>

      {/* Live Counters */}
      {/* Live Counters */}
<section id="live-section">
  <LiveCounters />
</section>


      {/* Reports Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1F3B2C] mb-6">
              Sustainability Reports
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Track our yearly progress in reducing environmental impact and promoting sustainable practices.
            </p>
          </div>

          <Tabs value={selectedYear} onValueChange={setSelectedYear} className="w-full flex flex-col items-center">
            <TabsList className=" max-w-md mb-12 gap-8  bg-[#1B2215]/20">
              {['2025', '2024', '2023'].map((year) => (
                <TabsTrigger
                  key={year}
                  value={year}
                  className="text-lg font-medium"
                >
                  {year}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(yearlyData).map(([year, data]) => (
              <TabsContent key={year} value={year}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in transition-all duration-500">
                  {[
                    {
                      label: 'Zero Plastic Products',
                      value: data.plasticProducts,
                      unit: '',
                      border: 'border-[#A8E6A3]',
                      badge: 'Products Sold',
                      textColor: 'text-[#A8E6A3]',
                      badgeColor: 'bg-[#A8E6A3] text-forest-green'
                    },
                    {
                      label: 'Plastic Waste',
                      value: `${data.plasticPrevented} Kg`,
                      unit: '',
                      border: 'border-[#87A96B]',
                      badge: 'Prevented',
                      textColor: 'text-[#87A96B]',
                      badgeColor: 'bg-[#87A96B]/20 text-sky-green'
                    },
                    {
                      label: 'Carbon Emissions',
                      value: `${data.carbonPrevented} Tons`,
                      unit: '',
                      border: 'border-[#1F3B2C]',
                      badge: 'Prevented',
                      textColor: 'text-[#1F3B2C]',
                      badgeColor: 'bg-sage/20 text-sage'
                    },
                    {
                      label: 'Trees Planted',
                      value: data.treesPlanted,
                      unit: '',
                      border: 'border-green-700',
                      badge: 'This Year',
                      textColor: 'text-forest-green',
                      badgeColor: 'bg-mint text-forest-green'
                    }
                  ].map((item, idx) => (
                    <Card key={idx} className={`bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-6 ${item.border} `}>
                      <div className="p-6 pb-3">
                        <h3 className=" text-base text-gray-600 uppercase tracking-wide">
                          {item.label}
                        </h3>
                      </div>
                      <CardContent className="p-6 pt-0">
                        <div className={`text-3xl font-playfair font-bold ${item.textColor} mb-2`}>
                          {item.value}
                        </div>
                        <Badge variant="secondary" className={item.badgeColor}>{item.badge}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-6 bg-[#CFFFD3]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3 flex justify-center">
              <div className="bg-forest-green p-1 border-32 border-[#1F3B2C] rounded-full shadow-2xl">
                <Earth className="w-24 h-24 text-[#1F3B2C]" />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="font-serif text-4xl md:text-6xl font-semibold text-[#1F3B2C]  mb-8">
                Why Our Impact Matters
              </h2>
              <div className="space-y-6 font-inter text-lg leading-relaxed text-gray-700">
                <p>
                  <strong className="text-forest-green">Transparency drives change.</strong> Our sustainability reports aren't just numbers—they're a commitment to accountability and continuous improvement in environmental stewardship.
                </p>
                <p>
                  Green Store's mission extends beyond commerce. We're dedicated to reducing plastic waste, preventing carbon emissions, and promoting a circular economy that benefits both people and planet.
                </p>
                <p>
                  Every purchase you make contributes to a larger movement toward sustainable living. Together, we're proving that business success and environmental responsibility go hand in hand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graphs Section */}
      <ImpactCharts />

      {/* Stories Section */}
      <StorySection />
      <div className=" bg-white max-w-screen-xl mb-10 mx-auto rounded-3xl shadow-2xl py-20 px-6 border-t border-green-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1F3B2C] mb-6 flex items-center justify-center gap-2">
            <Building2 className="w-8 h-8 text-green-700" />
            Partner with Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Are you a small business, sustainable startup, or eco-conscious brand? Let's collaborate to amplify impact and grow together.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-700 font-medium">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Jane Doe" className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm text-gray-700 font-medium">Email</label>
              <input type="email" id="email" name="email" placeholder="jane@example.com" className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="company" className="text-sm text-gray-700 font-medium">Company Name</label>
              <input type="text" id="company" name="company" placeholder="EcoWave Pvt Ltd" className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="message" className="text-sm text-gray-700 font-medium">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Tell us about your sustainability journey or how you'd like to collaborate..." className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md flex items-center gap-2 transition"
              >
                <Mail className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            We typically respond within 2–3 business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impact;
