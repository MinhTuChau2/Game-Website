import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/MemoryGamePage.css";

const images = [
  '🍎', '🍎',
  '🍌', '🍌',
  '🍒', '🍒',
  '🍓', '🍓',
  '🍊', '🍊',
  '🍇', '🍇',
  '🍉', '🍉',
  '🍍', '🍍',
];

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function MemoryGamePage({ onGameComplete, setIsGamePlayedToday }) {
  const navigate = useNavigate();

  const [cards, setCards] = useState(shuffleArray(images));
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const totalPairs = images.length / 2;

  const handleCardClick = (index) => {
    setFlippedIndices((prevIndices) => [...prevIndices, index]);
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [index1, index2] = flippedIndices;

      setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);

      setAttempts((prevAttempts) => prevAttempts + 1);

      if (cards[index1] === cards[index2]) {
        setMatchedPairs((prevPairs) => [...prevPairs, cards[index1]]);
      }
    }
  }, [flippedIndices, cards]);

  useEffect(() => {
    if (matchedPairs.length === totalPairs) {
      if (onGameComplete && typeof onGameComplete === 'function') {
        // Add any relevant logic here for completing the game
        setIsGameComplete(true);
        setIsGamePlayedToday(true);
      }
    }
  }, [matchedPairs, totalPairs, onGameComplete, setIsGameComplete, setIsGamePlayedToday]);

  // Redirect and update state when the game is complete
  useEffect(() => {
    if (isGameComplete) {
      // Redirect to the Thankyou page
      navigate('/Thankyou');
    }
  }, [isGameComplete, navigate]);

  return (
    <div className="MemoryGame">
      <h1>Fun Memory Game</h1>
      <p>Match the pairs and enjoy!</p>
      <p>Attempts: {attempts}</p>
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedIndices.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {flippedIndices.includes(index) || matchedPairs.includes(card) ? card : '🌟'}
          </div>
        ))}
      </div>
      {matchedPairs.length === totalPairs && <p>Congratulations! You've completed the game!</p>}
    </div>
  );
}

export default MemoryGamePage;
