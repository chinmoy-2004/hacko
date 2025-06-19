
import React, { useEffect, useState } from 'react';
import EcoProductCard from '../components/ProductCard.jsx';
import HeroSection from '../components/HeroSection.jsx';
import useRecommendStore from '../store/recommend.store.js';
import { Loader } from 'lucide-react';

const Home = () => {
  const [recommendations, setRecommendations] = useState({
    personalized: [],
    trending: [],
    all_products: []
  });
  const { getrecommendations,isrecommendationsLoading } = useRecommendStore();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getrecommendations();
        setRecommendations(data);
        // console.log("Fetched recommendations:", recommendations.all_products);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    
    fetchRecommendations();
  }, [getrecommendations]);

  

  if (isrecommendationsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8 text-gray-500 mx-auto" />
      </div>
    )
  }

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

        {/* Personalized Recommendations Section */}
        {recommendations.personalized.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#2C343F] mb-6">Recommended For You</h2>
            <div className="min-h-[300px] bg-gray-50 p-6 flex flex-wrap  gap-4">
              {recommendations.personalized.map((product) => (
                <EcoProductCard 
                  key={product.product_id} 
                  product={{
                    id: product.product_id,
                    title: product.name,
                    image: product.image_url,
                    price: product.price,
                    brand: product.brand,
                    category: product.category,
                    description: product.description,
                    rating: Math.floor(product.eco_score / 20), // Convert score to 1-5 rating
                    reviews: Math.floor(product.eco_score * 2), // Generate review count
                    plastic: Math.min(100, product.eco_score + 10), // Plastic reduction %
                    chemical: Math.min(100, product.eco_score + 5), // Chemical reduction %
                    badge: `${product.eco_score}/100`, // Eco score badge
                    certificates: [
                      { icon: '🌱', name: 'Organic' },
                      { icon: '♻️', name: 'Recyclable' },
                      { icon: '🌎', name: 'Carbon Neutral' }
                    ],
                    discount: product.price > 500 ? '15% OFF' : null,
                    originalPrice: product.price > 500 ? (product.price * 1.15).toFixed(2) : null
                  }} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Trending Products Section */}
        {recommendations.trending.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#2C343F] mb-6">Trending Eco Products</h2>
            <div className="min-h-[300px] bg-gray-50 p-6 flex flex-wrap  gap-4">
              {recommendations.trending.map((product) => (
                <EcoProductCard 
                  key={product.product_id} 
                  product={{
                    id: product.product_id,
                    title: product.name,
                    image: product.image_url,
                    price: product.price,
                    brand: product.brand,
                    category: product.category,
                    description: product.description,
                    rating: Math.floor(product.eco_score / 20), // Convert score to 1-5 rating
                    reviews: Math.floor(product.eco_score * 2), // Generate review count
                    plastic: Math.min(100, product.eco_score + 10), // Plastic reduction %
                    chemical: Math.min(100, product.eco_score + 5), // Chemical reduction %
                    badge: `${product.eco_score}/100`, // Eco score badge
                    certificates: [
                      { icon: '🌱', name: 'Organic' },
                      { icon: '♻️', name: 'Recyclable' },
                      { icon: '🌎', name: 'Carbon Neutral' }
                    ],
                    discount: product.price > 500 ? '15% OFF' : null,
                    originalPrice: product.price > 500 ? (product.price * 1.15).toFixed(2) : null
                  }} 
                />
              ))}
            </div>
          </div>
        )}

        {/* All Products Section */}
        {recommendations.all_products.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#2C343F] mb-6">All Eco-Friendly Products</h2>
            <div className="min-h-[300px] bg-gray-50 p-6 flex flex-wrap  gap-4">
              {recommendations.all_products.map((product) => (
                <EcoProductCard 
                  key={product.product_id} 
                  product={{
                    id: product.product_id,
                    title: product.name,
                    image: product.image_url,
                    price: product.price,
                    brand: product.brand,
                    category: product.category,
                    description: product.description,
                    rating: Math.floor(product.eco_score / 20), // Convert score to 1-5 rating
                    reviews: Math.floor(product.eco_score * 2), // Generate review count
                    plastic: Math.min(100, product.eco_score + 10), // Plastic reduction %
                    chemical: Math.min(100, product.eco_score + 5), // Chemical reduction %
                    badge: `${product.eco_score}/100`, // Eco score badge
                    certificates: [
                      { icon: '🌱', name: 'Organic' },
                      { icon: '♻️', name: 'Recyclable' },
                      { icon: '🌎', name: 'Carbon Neutral' }
                    ],
                    discount: product.price > 500 ? '15% OFF' : null,
                    originalPrice: product.price > 500 ? (product.price * 1.15).toFixed(2) : null
                  }} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;