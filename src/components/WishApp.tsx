import { useState, useEffect } from 'react';
import { WishType, WishData } from './WishForm';
import EmojiRain from './EmojiRain';
import WishForm from './WishForm';
import Navigation from './Navigation';
import Header from './Header';
import HistoryModal from './HistoryModal';

const WishApp = () => {
  const [currentType, setCurrentType] = useState<WishType>('birthday');
  const [history, setHistory] = useState<WishData[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('wish-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wish-history', JSON.stringify(history));
  }, [history]);

  const handleSendWish = (wishData: WishData) => {
    setHistory(prev => [wishData, ...prev]);
  };

  const getThemeClass = () => {
    switch (currentType) {
      case 'birthday':
        return 'birthday-theme';
      case 'anniversary':
        return 'anniversary-theme';
      case 'tribute':
        return 'tribute-theme';
      default:
        return 'birthday-theme';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClass()} transition-all duration-700 ease-in-out relative overflow-hidden`}>
      {/* Emoji Rain Effect */}
      <EmojiRain theme={currentType} />
      
      {/* Header */}
      <Header 
        currentType={currentType} 
        onShowHistory={() => setShowHistory(true)} 
      />
      
      {/* Main Content */}
      <div className="pt-24 pb-32 min-h-screen flex flex-col justify-center">
        <WishForm 
          type={currentType} 
          onSendWish={handleSendWish} 
        />
      </div>
      
      {/* Navigation */}
      <Navigation 
        currentType={currentType} 
        onTypeChange={setCurrentType} 
      />
      
      {/* History Modal */}
      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
      />
    </div>
  );
};

export default WishApp;