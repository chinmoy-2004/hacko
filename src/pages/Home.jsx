import React from 'react';
import products from '../components/Products.js';
import EcoProductCard from '../components/ProductCard.jsx';
import HeroSection from '../components/HeroSection.jsx';

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="p-6 bg-gray-50">
        <div className="text-center mb-8">
          <div className="text-[#DF6518] font-semibold text-2xl">
            Shop 500+ Eco-Friendly Brands & Products
          </div>
          <h1 className="text-7xl font-bold text-[#2C343F] mt-4 mb-16">
            Your Choices Make a Difference:
          </h1>
        </div>
        <div className="min-h-screen bg-gray-50 p-6 flex flex-wrap justify-center gap-4">
          {products.map((p, i) => (
            <EcoProductCard product={p} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
