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

const App = () => {
  return (
    <>
      <Header cartItemCount={3} onCartClick={() => {}} />
      <Routes>
       
        <Route path="/ecosense-ai" element={<Ecosenseai/>} />
        <Route path="/" element={<Home/>} /> 
        <Route path="/greengather" element={<GreenGather/>} />
        <Route path="/repack-ai" element={<RepackAI/>} />
        <Route path="/carbon-karma" element={<CarbonKarma/>} />
        <Route path="/ecochain-ai" element={<Ecochain/>} />
      </Routes>
      <Footer/>
      </>
  );
};

export default App;
