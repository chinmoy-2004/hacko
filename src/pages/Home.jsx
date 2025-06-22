import React, { useEffect, useState } from 'react';
import EcoProductCard from '../components/ProductCard.jsx';
import HeroSection from '../components/HeroSection.jsx';
import useRecommendStore from '../store/recommend.store.js';
import { Loader, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [recommendations, setRecommendations] = useState({
    personalized: [],
    trending: [],
    all_products: []
  });
  const { getrecommendations, isrecommendationsLoading } = useRecommendStore();

 

  const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );

  // Scroll functionality for horizontal sections
  const scrollContainer = (containerId, direction) => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 320; // Width of one card + gap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getrecommendations();
        setRecommendations(data);
        console.log(data);
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
    );
  }

  const transformProduct = (product) => ({
    id: product.product_id,
    title: product.name,
    image: product.image_url,
    price: product.price,
    brand: product.brand,
    category: product.category,
    description: product.description,
    rating: Math.floor(product.eco_score / 20),
    reviews: Math.floor(product.eco_score * 2),
    plastic: Math.min(100, product.eco_score + 10),
    chemical: Math.min(100, product.eco_score + 5),
    badge: `${product.eco_score}/100`,
    certificates: [
      { icon: '🌱', name: 'Organic' },
      { icon: '♻️', name: 'Recyclable' },
      { icon: '🌎', name: 'Carbon Neutral' }
    ],
    discount: product.price > 500 ? '15% OFF' : null,
    originalPrice: product.price > 500 ? (product.price * 1.15): null,
    ectNo: product.ect_no,
    grading: product.grading
  });

  const HorizontalProductSection = ({ title, products, containerId }) => (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#2C343F]">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scrollContainer(containerId, 'left')}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scrollContainer(containerId, 'right')}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div 
          id={containerId}
          className="flex gap-4 overflow-x-auto scrollbar-hide p-6 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
        >
          {products.map((product) => (
            <div key={product.product_id} className="flex-shrink-0 w-80">
              <EcoProductCard product={transformProduct(product)} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <>
      <HeroSection />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#DF6518] font-semibold text-2xl">
              Shop 500+ Eco-Friendly Brands & Products
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-[#2C343F] mt-4 mb-8">
              Your Choices Make a Difference
            </h1>
          </div>

          {/* Personalized Recommendations Section */}
          {recommendations.personalized.length > 0 && (
            <HorizontalProductSection
              title="Recommended For You"
              products={recommendations.personalized}
              containerId="personalized-container"
            />
          )}

          {/* Trending Products Section */}
          {recommendations.trending.length > 0 && (
            <HorizontalProductSection
              title="Trending Eco Products"
              products={recommendations.trending}
              containerId="trending-container"
            />
          )}

          {/* All Products Section - Grid Layout */}
          {recommendations.all_products.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#2C343F] mb-6">All Eco-Friendly Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendations.all_products.map((product) => (
                  <div key={product.product_id} className="h-full">
                    <EcoProductCard product={transformProduct(product)} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Home;