import React, { useState, useEffect } from 'react';

const MemorySequenceGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [userSubmitted, setUserSubmitted] = useState(false);

  const generateRandomNumber = () => Math.floor(Math.random() * 10) + 1;

  const generateSequence = () => {
    const newSequence = [];
    for (let i = 0; i < 5; i++) {
      newSequence.push(generateRandomNumber());
    }
    setSequence(newSequence);
  };

  const startRound = () => {
    generateSequence();
    setIsGameOver(false);
    setFeedback('');
    setGameStarted(true);
    setUserInput('');
    setUserSubmitted(false);
  };

  const checkUserInput = () => {
    setUserSubmitted(true);

    const userInputArray = userInput.split('').map(Number);
    const sequenceString = sequence.join('');

    if (userInputArray.join('') === sequenceString) {
      setScore(score + 1);
      setFeedback('Correct sequence! You get 1 point.');
    } else {
      setIsGameOver(true);
      setFeedback(`Incorrect sequence. The correct sequence is: ${sequenceString}`);
    }
  };

  useEffect(() => {
    if (gameStarted) {
      setTimeout(() => {
        setGameStarted(false);
      }, 5000);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (userSubmitted && gameStarted) {
      const userInputString = userInput;
      const sequenceString = sequence.join('');

      if (userInputString === sequenceString) {
        setScore(score + 1);
        setFeedback('Correct sequence! You get 1 point.');
      } else {
        setIsGameOver(true);
        setFeedback(`Incorrect sequence. The correct sequence is: ${sequenceString}`);
      }
    }
  }, [userSubmitted, gameStarted, userInput, sequence, score]);

  useEffect(() => {
    if (isGameOver) {
      alert('Game Over! Your final score is: ' + score);
      setScore(0);
      setIsGameOver(false); // Resetting game over state
    }
  }, [isGameOver, score]);

  return (
    <div>
      <h1>Memory Sequence Game</h1>
      <p>Score: {score}</p>
      {!gameStarted && (
        <button onClick={startRound}>Start Game</button>
      )}
      {gameStarted && (
        <div>
          <p>Remember the sequence:</p>
          <p>{sequence.join('')}</p>
        </div>
      )}
      {!gameStarted && (
        <div>
          <p>Input the sequence:</p>
          <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          <button onClick={checkUserInput}>Check</button>
          {feedback && <p>{feedback}</p>}
        </div>
      )}
    </div>
  );
};

export default MemorySequenceGame;
