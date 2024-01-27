import React, { useState, useEffect } from 'react';
import MemoryGamePage from './MemoryGamePage';
import GuessingGamePage from './GuessingGamePage';
import WordScramble from './WordScramble';
import SudokuGame from './SudokuGame';
import WordAssociationGame from './WordAssociationGame';
import MathGame from './MathGame';
import MemorySequenceGame from './MemorySequenceGame';
import ReactionTimeGame from './ReactionTimeGame';
import BookGame from './BookGame';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const games = [
  { id: 0, name: 'Memory Game', component: MemoryGamePage },
  { id: 1, name: 'Guessing Game', component: GuessingGamePage },
  { id: 2, name: 'Word Scramble', component: WordScramble },
  { id: 3, name: 'Sudoku Game', component: SudokuGame },
  { id: 4, name: 'Word Typing Game', component: WordAssociationGame },
  { id: 5, name: 'Math Game', component: MathGame },
  { id: 6, name: 'Memory Sequence Game', component: MemorySequenceGame },
  { id: 7, name: 'Reaction Time Game', component: ReactionTimeGame },
  { id: 8, name: 'Book Game', component: BookGame }
];

function getRandomGame(currentGame) {
  let newGame;
  do {
    newGame = Math.floor(Math.random() * games.length);
  } while (newGame === currentGame);

  return newGame;
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
  }, [selectedGame]);

  const handleGamePlayed = () => {
    if (!isGamePlayedToday) {
      localStorage.setItem('lastPlayedDate', new Date().toISOString());
      setIsGamePlayedToday(true);
      onGamePlayed();
      signOut(auth);
    }
  };

  const handleNavigation = () => {
    if (isGamePlayedToday) {
      navigate('/');
    }
  };

  useEffect(() => {
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

  const handleGameChange = (e) => {
    const newSelectedGame = parseInt(e.target.value, 10);
    setSelectedGame(newSelectedGame);
    setIsGamePlayedToday(false);
  };

  return (
    <div>
      {isGamePlayedToday ? (
        <p>Thank you for playing! Come back another time.</p>
      ) : isAuthenticated ? (
        <>
          <div>
            <p>Please select a game:</p>
            <select onChange={handleGameChange} value={selectedGame}>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>
          {React.createElement(games[selectedGame].component, { onGamePlayed: handleGamePlayed })}
        </>
      ) : (
        <p>Please log in to play the game.</p>
      )}
      {handleNavigation()}
    </div>
  );
}

export default GamePage;
