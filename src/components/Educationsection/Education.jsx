import React, { useState } from "react";
import { motion } from "framer-motion";

const modules = [
  {
    title: "EcoChain Trace",
    description: "It is basically a Blockchain-based certification and grading system. EcoChain Trace is like a report card for eco-friendly products — powered by blockchain. It checks everything: how the product is made, what materials are used, how it's packed, and even how long it lasts.Each product gets a GreenScore™ — from A++ (best) to D (worst) — based on 8 key factors like carbon footprint, recyclability, and energy use.Because it's on blockchain, sellers can't fake it. Everything is transparent and verified.Buyers can finally trust what they’re buying. Sellers get a fair way to prove they’re truly green. When seller apply a product for verification they get a ectid that id is store against their product in amazon website, Our consumer can chaeck authenicity of product in verifyect secction of our website.",
    image:"ecochainmain.png",
  },
  {
    title: "EcoSense AI",
    description: "Empowers local sellers with fraud detection, document validation using NSDL/UIDAI APIs, and AES-256 encrypted verification. Makes going green accessible.",
    image:"ecosense.png"
  },
  {
    title: "CarbonKarma AI",
    description: "Tracks carbon footprint per purchase. Offers impact dashboards, shows your CO₂ savings and gamifies eco-friendly habits.",
    image:"carbonKarma1.png"
  },
  {
    title: "RePack AI",
    description: "Uses 3D vision to optimize packaging and reduce waste. Suggests compostable materials and prints disposal instructions via QR codes.",
    image:"repack.png"
  },
  {
    title: "GreenGather AI",
    description: "Compares products in real time. Suggests group buying & subscriptions. Promotes eco-groceries with the best impact-to-cost ratio.",
    image:"greengather1.png"
  },
];

const EducationSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="bg-white py-16 px-6 md:px-24">
      <h2 className="text-4xl font-bold text-green-900 text-center mb-4">
        How GreenX Works
      </h2>
      <div className="grid grid-cols-2 justify-center items-center">
        <p className="text-center text-2xl text-green-900 font-bold max-w-2xl mx-auto mb-12">
          GreenX is a full-stack sustainability engine integrated into Amazon — powered by 4 AI agents and one blockchain-based certifier. Here’s how each piece fits.
        </p>

        <img  src="edumain.png" className="object-cover" alt="" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-4 lg:w-1/3">
          {modules.map((module, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 ${selectedIndex === idx
                  ? "bg-green-100 border-green-400 text-green-800"
                  : "bg-white border-gray-300 text-gray-700 hover:border-green-300 hover:bg-green-50"
                }`}
            >
              <h3 className="text-lg font-semibold">{module.title}</h3>
            </button>
          ))}
        </div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg lg:w-2/3"
          key={selectedIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-2xl font-semibold text-green-800 mb-3">
            {modules[selectedIndex].title}
          </h4>
          <img src={modules[selectedIndex].image} className="object-cover mt-5" alt="" />
          <p className="text-base md:text-lg mt-5 text-gray-700 leading-relaxed font-inter">
            {modules[selectedIndex].description}
          </p>
        </motion.div>
      </div>

      <div className="mt-16 text-center max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold text-green-900 mb-4">
          💰 What is GreenCoin?
        </h3>
        <p className="text-gray-700 text-lg mb-4">
          Earn GreenCoins every time you shop sustainably — buying eco products, choosing smart packaging, or participating in group buys.
        </p>
        <p className="text-gray-700 text-lg">
          Redeem them for Amazon coupons, get featured on the Weekly Leaderboard, and see your climate impact grow with our interactive dashboard.
        </p>
      </div>
    </section>
  );
};

export default EducationSection;
