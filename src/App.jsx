import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PrizeSection from './components/PrizeSection';
import ProcessSection from './components/ProcessSection';
import RegisterSection from './components/RegisterSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <PrizeSection />
        <ProcessSection />
        <RegisterSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
