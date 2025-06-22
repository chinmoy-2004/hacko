import React from 'react';
import { Helmet } from 'react-helmet';
import EcoProductCard from '../components/ProductCard.jsx';
import useRecommendStore from '../store/recommend.store.js';
import { Loader } from 'lucide-react';

const SearchResult = () => {
  const { isgetprodut, search_results, searchQuery } = useRecommendStore();
  
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
    originalPrice: product.price > 500 ? (product.price * 1.15) : null,
    ectNo: product.ect_no,
    grading: product.grading
  });

  // Loading state
  if (isgetprodut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Helmet>
          <title>{`Loading... | EcoStore`}</title>
        </Helmet>
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Finding eco-friendly products for you...</p>
        </div>
      </div>
    );
  }

  // No results state
  if (!search_results || search_results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <Helmet>
          <title>{`No Results Found | EcoStore`}</title>
        </Helmet>
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {searchQuery ? `No results for "${searchQuery}"` : 'No Products Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            Try different search terms or browse our categories.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
            <button
              className="border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-6 rounded-lg transition-colors"
              onClick={() => window.location.href = '/'}
            >
              Home Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${search_results.length}+ Eco-Friendly Products${
          searchQuery ? ` for "${searchQuery}"` : ''
        } | EcoStore`}</title>
        <meta 
          name="description" 
          content={`Browse ${search_results.length} eco-friendly products matching your search`} 
        />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Eco-Friendly Products'}
            </h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
              <p className="text-gray-600">
                Showing {search_results.length} {search_results.length === 1 ? 'item' : 'items'}
              </p>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm text-gray-500 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="eco_score">Eco Score</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {search_results.map((product) => (
                <div 
                  key={product.product_id} 
                  className="h-full transition-transform duration-200 hover:scale-[1.02]"
                >
                  <EcoProductCard product={transformProduct(product)} />
                </div>
              ))}
            </div>
          </div>

          {search_results.length > 12 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-4 py-2 rounded-md bg-green-600 text-white">
                  1
                </button>
                <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">
                  2
                </button>
                <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">
                  8
                </button>
                <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">
                  Next
                </button>
              </nav>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default SearchResult;