import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Submit from './components/Submit';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Explore from './components/Explore';

function App() {
  return (
    <>
    <div className='min-h-screen bg-white text-black'>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>

      <Footer />
    </div>
      
    </>
  );
}

export default App;
