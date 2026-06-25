import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import AnimeDetails from './pages/AnimeDetails';
import AddAnimeModal from './components/AddAnimeModal';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAnimeSelect = (id) => {
    setSelectedAnimeId(id);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedAnimeId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnimeAdded = (newAnime) => {
    setRefreshTrigger(prev => prev + 1);
    // Automatically view the added anime details!
    if (newAnime && newAnime._id) {
      handleAnimeSelect(newAnime._id);
    }
  };

  const handleAnimeDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
    handleBackToHome();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar Header */}
      <Header 
        onHomeClick={handleBackToHome}
        onAddAnimeClick={() => setIsAddModalOpen(true)}
        currentTab={currentView}
      />

      {/* Main View Router */}
      <main style={{ flexGrow: 1 }}>
        {currentView === 'home' ? (
          <Home 
            onAnimeSelect={handleAnimeSelect} 
            refreshTrigger={refreshTrigger}
          />
        ) : (
          <AnimeDetails 
            animeId={selectedAnimeId}
            onBack={handleBackToHome}
            onAnimeDeleted={handleAnimeDeleted}
          />
        )}
      </main>

      {/* Add Anime Popup Form */}
      <AddAnimeModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAnimeAdded={handleAnimeAdded}
      />
    </div>
  );
}

export default App;
