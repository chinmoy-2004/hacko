import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { title: "Home & Kitchen", image: "/src/assets/home/home.jpg" },
  { title: "Cleaning", image: "/src/assets/home/cleaning.jpg" },
  { title: "Hair Care", image: "/src/assets/home/haircare.jpg" },
  { title: "Laundry", image: "/src/assets/home/laundry.webp" },
  { title: "Bathroom", image: "/src/assets/home/bathroom.jpg" },
  { title: "Outdoor Living", image: "/src/assets/home/outdoor.jpg" },
  { title: "Personal Hygiene", image: "/src/assets/home/personal.jpg" },
];

const HeroSection = () => {

    const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy(); // clean old navigation
      swiperInstance.navigation.init();    // re-init with new refs
      swiperInstance.navigation.update();  // apply changes
    }
  }, [swiperInstance]);
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white">
      {/* Main banner */}
      <div className="relative bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop")'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Discover Sustainable Products for a Greener Tomorrow
            </h1>
            <p className="text-xl mb-6 text-green-100">
              Shop eco-friendly products that make a difference. Sustainable living starts here with fast, carbon-neutral delivery
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-md transition-colors">
              Shop Sustainable Now
            </button>
          </div>
        </div>
      </div>

      {/* Categories strip */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 justify-between flex items-center">
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">Shop by Category:</span>
              </div>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline">🌿 Eco Living</a>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline">♻️ Zero Waste</a>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline">🏠 Sustainable Home</a>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline">🌱 Organic Food</a>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline">👕 Eco Fashion</a>
              <a href="#" className="text-green-600 hover:text-green-800 hover:underline">🔋 Green Tech</a>
            </div>
          </div>
      </div>
      <div className="relative w-full bg-gray-100 py-6 px-4">
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        modules={[Navigation]}
        onSwiper={setSwiperInstance}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-64 rounded-lg overflow-hidden group"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-opacity-50 transition duration-300" />
              <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold z-10 text-center px-2">
                {item.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Green Right-Side Navigation */}
      <div className="mt-5 flex z-20 justify-center">
        <button
          ref={prevRef}
          className="bg-green-600 text-white text-xl p-3 w-[5vw] rounded-l-md border-r-1 hover:bg-green-700 transition"
        >
          ←
        </button>
        <button
          ref={nextRef}
          className="bg-green-600 text-white text-xl p-3 w-[5vw] rounded-r-md hover:bg-green-700 transition"
        >
          →
        </button>
      </div>
    </div>
    </section>
  );
};

export default HeroSection;