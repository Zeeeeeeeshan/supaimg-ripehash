import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import Documentation from './components/Documentation';
import Community from './components/Community';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  if (currentView === 'dashboard') {
    return <Dashboard onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onDashboard={() => setCurrentView('dashboard')} />
      <Hero />
      <TrustedBy />
      <Features />
      <Pricing />
      <Documentation />
      <Community />
      <Footer />
    </div>
  );
}

export default App;