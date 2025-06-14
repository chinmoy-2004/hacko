import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import products from './components/Products.js';
import EcoProductCard from './components/ProductCard.jsx';
import HeroSection from './components/HeroSection.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <>
      <Header cartItemCount={3} onCartClick={() => {}} />
        <HeroSection/>
        <div className="p-6 bg-gray-50">
      <div className="text-center mb-8">
        <div className="text-[#DF6518] font-semibold text-2xl">Shop 500+ Eco-Friendly Brands & Products</div>
        <h1 className="text-7xl font-bold text-[#2C343F] mt-4 mb-16 ">Your Choices Make a Difference:</h1>
      </div>
        <div className="min-h-screen bg-gray-50 p-6 flex flex-wrap justify-center gap-4">
      {products.map((p, i) => (
        <EcoProductCard product={p} key={i} />
      ))}
    </div>
    </div>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/ecosense-ai" element={<div>EcoSense AI Page</div>} />
        <Route path="/greengather" element={<div>GreenGather Page</div>} />
        <Route path="/repack-ai" element={<div>Repack AI Page</div>} />
        <Route path="/carbon-karma" element={<div>Carbon Karma Page</div>} />
        <Route path="/ecochain-ai" element={<div>EcoChain AI Page</div>} />
      </Routes>
      <Footer/>
      </>
  );
};

export default App;
