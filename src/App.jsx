import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';

const App = () => {
  return (
    <>
      <Header cartItemCount={3} onCartClick={() => {}} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/ecosense-ai" element={<div>EcoSense AI Page</div>} />
        <Route path="/greengather" element={<div>GreenGather Page</div>} />
        <Route path="/repack-ai" element={<div>Repack AI Page</div>} />
        <Route path="/carbon-karma" element={<div>Carbon Karma Page</div>} />
        <Route path="/ecochain-ai" element={<div>EcoChain AI Page</div>} />
      </Routes>
      <Footer/>
      </>
  );
};

export default App;
