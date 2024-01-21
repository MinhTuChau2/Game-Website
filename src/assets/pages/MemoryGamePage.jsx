import React, { useState, useEffect } from 'react';
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

// ... (other imports and code)

// ... (other imports and code)

function MemoryGamePage() {
  const [cards, setCards] = useState(shuffleArray(images));
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Calculate the total number of pairs
  const totalPairs = images.length / 2;

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [index1, index2] = flippedIndices;

      setTimeout(() => {
        // Reset the flipped cards after a delay
        setFlippedIndices([]);
      }, 1000);

      // Increase attempts after flipping
      setAttempts((prevAttempts) => prevAttempts + 1);

      // Check for a match
      if (cards[index1] === cards[index2]) {
        // Handle the match (for example, update state to mark matched pairs)
        setMatchedPairs((prevPairs) => [...prevPairs, cards[index1]]);
      }
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index) => {
    setFlippedIndices((prevFlippedIndices) => {
      // If the clicked card is already flipped or two cards are already flipped, do nothing
      if (prevFlippedIndices.length === 2 || prevFlippedIndices.includes(index)) {
        return prevFlippedIndices;
      }

      // Otherwise, flip the clicked card
      return [...prevFlippedIndices, index];
    });
  };


  // Check if all pairs are matched
  const isGameComplete = matchedPairs.length === totalPairs;

  return (
    <div className="MemoryGame">
      <h1>Simple Memory Game</h1>
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
      {isGameComplete && <p>Congratulations! You've completed the game!</p>}

    </div>
  );
}

export default MemoryGamePage;
