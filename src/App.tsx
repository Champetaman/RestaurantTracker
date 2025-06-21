import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RestaurantProvider } from './contexts/RestaurantContext';
import { Header } from './components/Header';
import { RestaurantGallery } from './components/RestaurantGallery';
import { RestaurantList } from './components/RestaurantList';
import { RestaurantMap } from './components/RestaurantMap';
import { RestaurantDetail } from './components/RestaurantDetail';
import { AddRestaurantModal } from './components/AddRestaurantModal';
import { Footer } from './components/Footer';
import { useRestaurants } from './contexts/RestaurantContext';

function MainContent() {
  const { state } = useRestaurants();

  const renderCurrentView = () => {
    switch (state.viewMode) {
      case 'gallery':
        return <RestaurantGallery />;
      case 'list':
        return <RestaurantList />;
      case 'map':
        return <RestaurantMap />;
      default:
        return <RestaurantGallery />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>

      {/* Restaurant Detail Modal */}
      <RestaurantDetail />
      
      {/* Add Restaurant Modal */}
      <AddRestaurantModal />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <RestaurantProvider>
        <MainContent />
      </RestaurantProvider>
    </Router>
  );
}

export default App;