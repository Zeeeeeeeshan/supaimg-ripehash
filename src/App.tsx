import { useState } from 'react';
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
import IntroScreen from './components/IntroScreen';
import Onboarding from './components/Onboarding';

type CurrentPage = 'login' | 'landing' | 'dashboard' | 'api';
type Stage = 'intro' | 'onboarding' | 'app';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('login');
  const [stage, setStage] = useState<Stage>('intro');

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

  const handleSkipIntro = () => {
    setStage('app');
    setCurrentPage('login');
  };

  const handleGetStarted = () => {
    setStage('onboarding');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            stage === 'intro' ? (
              <IntroScreen onSkip={handleSkipIntro} onGetStarted={handleGetStarted} />
            ) : stage === 'onboarding' ? (
              <Onboarding onDone={() => { setStage('app'); setCurrentPage('login'); }} />
            ) : (
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
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;