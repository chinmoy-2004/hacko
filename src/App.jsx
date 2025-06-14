import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Ecochain from './pages/Ecochainpage.jsx';
import CarbonKarma from './pages/Carbonkarma.jsx';
import Ecosenseai from './pages/Ecosensepage.jsx';

const App = () => {
  return (
    <>
      <Header cartItemCount={3} onCartClick={() => {}} />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/ecosense-ai" element={<Ecosenseai/>} />
        <Route path="/greengather" element={<div>GreenGather Page</div>} />
        <Route path="/repack-ai" element={<div>Repack AI Page</div>} />
        <Route path="/carbon-karma" element={<CarbonKarma/>} />
        <Route path="/ecochain-ai" element={<Ecochain/>} />
      </Routes>
      </>
  );
};

export default App;
