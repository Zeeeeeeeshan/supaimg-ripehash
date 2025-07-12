import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import File from './components/File';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import Documentation from './components/Documentation';
import Community from './components/Community';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
    <div className="min-h-screen bg-white">
      {currentView !== 'dashboard' && (
      <Navbar onDashboard={() => setCurrentView('dashboard')} />
      )}
      {currentView === 'dashboard' ? (
                <Dashboard onBack={() => setCurrentView('landing')} />
              ) : (
                <>
      <Hero />
      <File />
      <TrustedBy />
      <Features />
      <Pricing />
      <Documentation />
      <Community />
      <Footer />
                </>
              )}
    </div>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;