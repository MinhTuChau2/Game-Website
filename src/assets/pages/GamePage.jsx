// src/GamePage.jsx

// src/assets/pages/GamePage.jsx
import React, { useState, useEffect } from 'react';
import MemoryGamePage from './MemoryGamePage';

function GamePage() {
  const [isGamePlayedToday, setIsGamePlayedToday] = useState(false);

  useEffect(() => {
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
    if (lastPlayedDate) {
      const today = new Date().toLocaleDateString();
      const lastPlayed = new Date(lastPlayedDate).toLocaleDateString();
      setIsGamePlayedToday(today === lastPlayed);
    }
  }, []);

  const handleGamePlayed = () => {
    localStorage.setItem('lastPlayedDate', new Date().toISOString());
    setIsGamePlayedToday(true);
  };

  return (
    <div>
      {isGamePlayedToday ? (
        <p>Thank you! Come back TOMORROW to play again.</p>
      ) : (
        <MemoryGamePage onGamePlayed={handleGamePlayed} />
      )}
    </div>
  );
}

export default GamePage;
