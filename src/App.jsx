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
import Impact from './pages/Impact.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import Orders from './pages/Orders.jsx';
import Education from './pages/Education.jsx';
import useEcosense from './store/ecosense.store.js';
import RestrictsellerModal from './components/Restrictunverifedseller.jsx';
import SellerDashboard from './pages/Sellerdashboard.jsx';
import AddProduct from './pages/Addproduct.jsx';
import useEcochainStore from './store/ecochain.store.js';

const App = () => {

  const { issellerverify } = useEcosense();
  const { isproductverified } = useEcochainStore();

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
        <Route path="/applyforcertification" element={issellerverify? <ApplyCertificate/> : <RestrictsellerModal/>}/>
        <Route path="/Sellerdashboard" element={issellerverify? <SellerDashboard/>:<RestrictsellerModal/>}/>
        <Route path="/addproduct" element={isproductverified? <AddProduct/>:<ApplyCertificate/>}/>
        <Route path="/impact" element={<Impact/>}/>
        <Route path="/check-out" element={<CheckoutPage/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/edu" element={<Education/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
      </CartProvider>
      <Toaster/>
      </>
  );
};

export default App;
