// import { useState } from 'react';
// import { toast } from 'sonner';
// import Header from '../components/Header';
// import HeroSection from '../components/HeroSection';
// import CategoryFilter from '../components/CategoryFilter';
// import ProductCard from '../components/ProductCard';
// import Cart from '../components/Cart';

// const Index = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const categories = [
//     { id: 'kitchen', name: 'Kitchen & Home', icon: '🏠', count: 45 },
//     { id: 'fashion', name: 'Eco Fashion', icon: '👕', count: 32 },
//     { id: 'beauty', name: 'Natural Beauty', icon: '💄', count: 28 },
//     { id: 'tech', name: 'Green Tech', icon: '📱', count: 19 },
//     { id: 'food', name: 'Organic Food', icon: '🥬', count: 56 },
//     { id: 'zero-waste', name: 'Zero Waste', icon: '♻️', count: 41 },
//   ];

//   const products = [
//     {
//       id: 1,
//       name: "Eco Bamboo Kitchen Towels, 20 sheets Reusable up to 2000 times, 100% Natural and Eco-friendly Alternative to Tissue Papers",
//       price: 6.35,
//       rating: 4.5,
//       reviewCount: 1247,
//       image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop",
//       badge: "BESTSELLER",
//       description: "Ultra-absorbent bamboo towels that can be washed and reused thousands of times.",
//       sustainability: "100% Biodegradable"
//     },
//     {
//       id: 2,
//       name: "Organic Cotton Eco-Friendly Printed Unisex Canvas Shopping Bag, Women's Tote Bag | Spacious, Stylish, Sturdy Handbag",
//       price: 15.35,
//       rating: 4.3,
//       reviewCount: 892,
//       image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&h=200&fit=crop",
//       badge: "BESTSELLER",
//       description: "Durable and stylish canvas tote made from 100% organic cotton for everyday use.",
//       sustainability: "Fair Trade Certified"
//     },
//     {
//       id: 3,
//       name: "Natural Coconut Leaf Biodegradable, Eco-Friendly & Sustainable Drinking Straws (Pack of 100)",
//       price: 8.99,
//       rating: 4.7,
//       reviewCount: 567,
//       image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=200&fit=crop",
//       badge: "BESTSELLER",
//       description: "Completely natural straws made from coconut leaves, perfect plastic alternative.",
//       sustainability: "Compostable"
//     },
//     {
//       id: 4,
//       name: "Plantable Seed Pencils (Pack Of 10 Single Pencils) Made With 100% Recycled Paper | Eco Friendly Gift",
//       price: 14.00,
//       rating: 4.6,
//       reviewCount: 324,
//       image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&h=200&fit=crop",
//       badge: "BESTSELLER",
//       description: "Write, plant and grow! These pencils contain seeds that can be planted after use.",
//       sustainability: "Grows Into Plants"
//     },
//     {
//       id: 5,
//       name: "Solar Powered LED Garden Lights - Weather Resistant Outdoor Lighting Set of 8",
//       price: 29.99,
//       originalPrice: 39.99,
//       rating: 4.4,
//       reviewCount: 756,
//       image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
//       description: "Illuminate your garden with clean solar energy. Automatic on/off functionality.",
//       sustainability: "Solar Powered"
//     },
//     {
//       id: 6,
//       name: "Organic Bamboo Fiber Dinnerware Set - BPA Free, Microwave Safe, Set of 4 Plates and Bowls",
//       price: 42.50,
//       originalPrice: 55.00,
//       rating: 4.8,
//       reviewCount: 445,
//       image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
//       description: "Beautiful and durable dinnerware made from fast-growing bamboo fiber.",
//       sustainability: "Renewable Resource"
//     },
//     {
//       id: 7,
//       name: "Eco-Friendly Yoga Mat - Natural Cork and Rubber, Non-Slip Surface for All Practice Types",
//       price: 68.00,
//       rating: 4.5,
//       reviewCount: 289,
//       image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop",
//       description: "Premium yoga mat crafted from sustainable cork and natural rubber.",
//       sustainability: "Sustainably Harvested"
//     },
//     {
//       id: 8,
//       name: "Organic Herb Growing Kit - Indoor Garden Starter Set with Seeds, Pots, and Soil",
//       price: 24.95,
//       rating: 4.6,
//       reviewCount: 892,
//       image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=300&h=200&fit=crop",
//       description: "Grow fresh herbs at home with this complete organic gardening starter kit.",
//       sustainability: "Promotes Green Living"
//     }
//   ];

//   const filteredProducts = selectedCategory === 'all' 
//     ? products 
//     : products.filter(product => {
//         const categoryKeywords = {
//           kitchen: ['kitchen', 'towel', 'dinnerware'],
//           fashion: ['bag', 'cotton', 'tote'],
//           beauty: ['organic', 'natural'],
//           tech: ['solar', 'led'],
//           food: ['herb', 'organic'],
//           'zero-waste': ['biodegradable', 'reusable', 'bamboo']
//         };
        
//         const keywords = categoryKeywords[selectedCategory] || [];
//         return keywords.some(keyword => 
//           product.name.toLowerCase().includes(keyword) || 
//           product.description.toLowerCase().includes(keyword)
//         );
//       });

//   const addToCart = (product) => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === product.id);
      
//       if (existingItem) {
//         toast.success(`Updated ${product.name.substring(0, 30)}... quantity in cart`);
//         return prevItems.map(item =>
//           item.id === product.id 
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         toast.success(`Added ${product.name.substring(0, 30)}... to cart`);
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const updateQuantity = (id, quantity) => {
//     if (quantity === 0) {
//       removeFromCart(id);
//       return;
//     }
    
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   const removeFromCart = (id) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//     toast.success("Item removed from cart");
//   };

//   const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header 
//         cartItemCount={totalCartItems}
//         onCartClick={() => setIsCartOpen(true)}
//       />
      
//       <HeroSection />
      
//       <main className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           <div className="w-64 flex-shrink-0">
//             <CategoryFilter 
//               categories={categories}
//               selectedCategory={selectedCategory}
//               onCategoryChange={setSelectedCategory}
//             />
//           </div>
          
//           <div className="flex-1">
//             <div className="mb-6">
//               <h2 className="text-lg font-bold text-gray-900 mb-2">
//                 {selectedCategory === 'all' ? 'Results' : 
//                  categories.find(c => c.id === selectedCategory)?.name || 'Products'}
//               </h2>
//               <p className="text-sm text-gray-600">
//                 {filteredProducts.length} results
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {filteredProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onAddToCart={addToCart}
//                 />
//               ))}
//             </div>
            
//             {filteredProducts.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="text-4xl mb-4">📦</div>
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900">No results found</h3>
//                 <p className="text-gray-600 mb-4">
//                   Try different keywords or browse our categories.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
      
//       <Cart
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//         items={cartItems}
//         onUpdateQuantity={updateQuantity}
//         onRemoveItem={removeFromCart}
//       />
//     </div>
//   );
// };

// export default Index;