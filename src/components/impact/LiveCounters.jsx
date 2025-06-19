import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './CustomCard';

const LiveCounters = () => {
  const [counters, setCounters] = useState({
    plasticToday: 847,
    carbonMonth: 2156,
    treesYear: 8724,
  });

  const hasAnimated = useRef(false);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    let step = 0;

    // 👇 Add random offset to simulate growth
    const randomOffsets = {
      plasticToday: Math.floor(Math.random() * 5 + 5), 
      carbonMonth: Math.floor(Math.random() * 7 + 5),
      treesYear: Math.floor(Math.random() * 6 + 5),
    };

    const start = { ...counters };
    const target = {
      plasticToday: start.plasticToday + randomOffsets.plasticToday,
      carbonMonth: start.carbonMonth + randomOffsets.carbonMonth,
      treesYear: start.treesYear + randomOffsets.treesYear,
    };

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      const updated = {
        plasticToday: Math.floor(start.plasticToday + (target.plasticToday - start.plasticToday) * progress),
        carbonMonth: Math.floor(start.carbonMonth + (target.carbonMonth - start.carbonMonth) * progress),
        treesYear: Math.floor(start.treesYear + (target.treesYear - start.treesYear) * progress),
      };

      setCounters(updated);

      if (step >= steps) {
        clearInterval(timer);
        setCounters(target); // Set exact final values
      }
    }, increment);
  };

  useEffect(() => {
    const section = document.getElementById('live-section');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          animateCounters();
          hasAnimated.current = true;
        } else if (!entry.isIntersecting) {
          // ✅ Allow reanimation on next scroll
          hasAnimated.current = false;
        }
      },
      { threshold: 0.4 }
    );

    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, [counters]); // 🔁 Update on counters change

  return (
    <section id="live-section" className="py-16 px-6 bg-gradient-to-b from-[#053101] to-[#17b71acb]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-5xl font-semibold text-white mb-4">Live Impact Counter</h2>
          <p className="font-inter text-lg text-[#CFFFD3]">Real-time tracking of our environmental contributions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plastic */}
          <Card className="bg-white/10 backdrop-blur-sm border-[#CFFFD3] shadow-3xl hover:bg-white/20 transition-all duration-300 flex flex-col items-center justify-center">
            <CardContent className="text-center px-8">
              <div className="text-4xl md:text-5xl font-playfair font-bold text-[#57d968] mb-2">
                {counters.plasticToday.toLocaleString()}
              </div>
              <div className="text-xl font-inter font-medium text-white mb-2">Kg Plastic</div>
              <div className="text-sm font-inter text-gray-300 uppercase tracking-wide">Prevented Today</div>
            </CardContent>
          </Card>

          {/* Carbon */}
          <Card className="bg-white/10 backdrop-blur-sm border-mint/20 hover:bg-white/20 transition-all duration-300 flex flex-col items-center justify-center">
            <CardContent className="px-8 text-center">
              <div className="text-4xl md:text-5xl font-playfair font-bold text-[#57d968] mb-2">
                {counters.carbonMonth.toLocaleString()}
              </div>
              <div className="text-xl font-inter font-medium text-white mb-2">Tons CO₂</div>
              <div className="text-sm font-inter text-gray-300 uppercase tracking-wide">Offset This Month</div>
            </CardContent>
          </Card>

          {/* Trees */}
          <Card className="bg-white/10 backdrop-blur-sm border-mint/20 hover:bg-white/20 transition-all duration-300">
            <CardContent className="px-8 text-center">
              <div className="text-4xl md:text-5xl font-playfair font-bold text-[#57d968] mb-2">
                {counters.treesYear.toLocaleString()}
              </div>
              <div className="text-xl font-inter font-medium text-white mb-2">Trees</div>
              <div className="text-sm font-inter text-gray-300 uppercase tracking-wide">Planted This Year</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LiveCounters;
