import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Ecochain from './pages/Ecochainpage.jsx';
import CarbonKarma from './pages/Carbonkarma.jsx';
import Ecosenseai from './pages/Ecosensepage.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import RepackAI from './pages/RepackAI.jsx';
import GreenGather from './pages/GreenGatherAI.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import Cart from './pages/Cart.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApplyCertificate from './pages/Applyfoecertecochain.jsx';
import { Toaster } from 'react-hot-toast';
import Educationsection from './components/Educationsection/Education.jsx';


const App = () => {
  return (
    <>
    <CartProvider>
      <Header cartItemCount={3} onCartClick={() => {}} />
      <Routes> 
        <Route path="/ecosense-ai" element={<Ecosenseai/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/greengather" element={<GreenGather/>} />
        <Route path="/repack-ai" element={<RepackAI/>} />
        <Route path="/carbon-karma" element={<CarbonKarma/>} />
        <Route path="/ecochain-ai" element={<Ecochain/>} />
        <Route path="/user-dashboard" element={<UserDashboard/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/applyforcertification" element={<ApplyCertificate/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
      </CartProvider>
      <Toaster/>
      </>
  );
};

export default App;
