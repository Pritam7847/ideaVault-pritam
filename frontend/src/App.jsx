import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Submit from './components/Submit';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Explore from './components/Explore';
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <div className="min-h-screen bg-white text-black">
        {/* <Navbar /> */}


        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Toaster/>
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
