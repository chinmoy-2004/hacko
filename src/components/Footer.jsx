import React from "react";

const Footer = () => {
  return (
    <>
      {/* Background Section with Subscription Box */}
      <section
        className="relative w-full bg-cover bg-center py-20 h-full"
        style={{
          backgroundImage: "url('/src/assets/home/banner3.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center", // <-- Replace this with your image path
        }}
      >
        <div className="max-w-3xl ml-24 bg-white rounded-xl shadow-lg p-8 text-black z-10 relative">
          <h2 className="text-base font-bold uppercase mb-2">
            Add some sustainability to your inbox!
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Sign up to our newsletter and you'll receive tips, tricks, and advice on living sustainably. Plus, a sneak peek to new products and articles!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your e-mail"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
            />
            <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A2B1A] text-white pt-16 pb-10 h-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm border-t border-green-700 pt-10">
            <div>
              <h4 className="font-semibold mb-3 uppercase text-white">Get to Know Us</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press Releases</li>
                <li>Amazon Science</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 uppercase text-white">Connect with Us</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 uppercase text-white">Make Money with Us</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Sell on Amazon</li>
                <li>Become an Affiliate</li>
                <li>Advertise Your Products</li>
                <li>Self-Publish with Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 uppercase text-white">Let Us Help You</h4>
              <ul className="space-y-2 text-gray-300">
                <li>COVID-19 and Amazon</li>
                <li>Your Account</li>
                <li>Returns Centre</li>
                <li>Help</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-green-800 pt-6 text-xs text-gray-400 text-center">
            © 2025 Amazon GreenX Store. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
