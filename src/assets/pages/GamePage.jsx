import React, { useState, useEffect } from 'react';
import MemoryGamePage from './MemoryGamePage';
import GuessingGamePage from './GuessingGamePage';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

function getRandomGame() {
  return Math.floor(Math.random() * 2);
}

function GamePage({ isAuthenticated, onGamePlayed }) {
  const [selectedGame, setSelectedGame] = useState(getRandomGame());
  const [isGamePlayedToday, setIsGamePlayedToday] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
    if (lastPlayedDate) {
      const today = new Date().toLocaleDateString();
      const lastPlayed = new Date(lastPlayedDate).toLocaleDateString();
      setIsGamePlayedToday(today === lastPlayed);
    }
  }, []);

  const handleGamePlayed = () => {
    // Check if the user has already played a game today
    if (!isGamePlayedToday) {
      localStorage.setItem('lastPlayedDate', new Date().toISOString());
      setIsGamePlayedToday(true);
      onGamePlayed(); // Notify the parent component about the game being played
      signOut(auth); // Log the user out after playing the game
    }
  };

  // Handle navigation to prevent resetting the game
  const handleNavigation = () => {
    if (isGamePlayedToday) {
      // Player has already played today, prevent navigating back to the game
      navigate('/');

    }
  };

  useEffect(() => {
    // Listen for beforeunload event to handle browser navigation
    const handleBeforeUnload = (event) => {
      if (isGamePlayedToday) {
        event.returnValue = 'Thank you for playing! Come back another time.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isGamePlayedToday]);

  return (
    <div>
      {isGamePlayedToday ? (
        <p>Thank you for playing! Come back another time.</p>
      ) : isAuthenticated ? (
        <>
          {selectedGame === 0 ? (
            <MemoryGamePage onGamePlayed={handleGamePlayed} />
          ) : (
            <GuessingGamePage onGamePlayed={handleGamePlayed} />
          )}
        </>
      ) : (
        <p>Please log in to play the game.</p>
      )}
      {handleNavigation()}
    </div>
  );
}

export default GamePage;
