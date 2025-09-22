import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import File from './components/File';
import TrustedBy from './components/TrustedBy';
import Dashboard from './components/Dashboard';
import ApiConnections from './components/ApiConnections';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Documentation from './components/Documentation';
import Community from './components/Community';
import Footer from './components/Footer';
import Login from './components/Login';

type CurrentPage = 'login' | 'landing' | 'dashboard' | 'api';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('login');

  const handleNavigateToApi = () => {
    setCurrentPage('api');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              {currentPage === 'login' ? (
                <Login onLogin={handleLogin} />
              ) : (
                <>
                  {currentPage !== 'dashboard' && currentPage !== 'api' && (
                    <Navbar onDashboard={() => setCurrentPage('dashboard')} />
                  )}
                  {currentPage === 'dashboard' ? (
                    <Dashboard 
                      onBack={handleBackToLanding} 
                      onNavigateToApi={handleNavigateToApi}
                    />
                  ) : currentPage === 'api' ? (
                    <ApiConnections onBack={handleBackToDashboard} />
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
                </>
              )}
            </div>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;