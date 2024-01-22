import React, { useState, useEffect } from 'react';

const WordAssociationGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(0);

const wordList = [
  'sun',
  'flower',
  'ocean',
  'mountain',
  'book',
  'computer',
  'music',
  'happy',
  'journey',
  'color',
  'dream',
  'laughter',
  'adventure',
  'breeze',
  'guitar',
  'silence',
  'wisdom',
  'inspiration',
  'gratitude',
  'imagination',
  'sparkle',
  'joyful',
  'serenity',
  'exploration',
  'wonder',
  'harmony',
  'vibrant',
  'delight',
  'courage',
  'tranquil',
  'dazzle',
  'fascinate',
  'vini',
  'minhtu',
  'keshan',
  'savor',
  'balance',
  'gentle',
  'ripple',
  'whisper',
  'charming',
  'radiant',
  'brilliant',
  'bliss',
  'enchant',
  'celebrate',
  'treasure',
  'peaceful',
  'euphoria',
  'magic',
  'infinity',
  'celestial',
  'banana',
  'laughter',
  'sasquatch',
  'giggles',
  'flibbertigibbet',
  'gobbledygook',
  'wobble',
  'quizzaciously',
  'bamboozled',
  'blubber',
  'flummox',
  'lollygag',
  'hullabaloo',
  'kerfuffle',
  'malarkey',
  'shenanigans',
  'waddle',
  'higgledy-piggledy',
  'gadzooks',
  'gargle',
  'gibberish',
  'pumpernickel',
  'pizzazz',
  'wobble',
  'brouhaha',
  'mumbo-jumbo',
  'hoopla',
  'fandango',
  'gibberish',
  'gobbledygook',
];

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      setScore(score + 1);
      setCurrentWord(getRandomWord());
      setUserInput('');
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setScore(0);
    setCurrentWord(getRandomWord());
    setUserInput('');
    setTimer(0);
  };

  useEffect(() => {
    let intervalId;

    if (!isGameOver) {
      setCurrentWord(getRandomWord());
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isGameOver]);

  return (
    <div>
      <h1>Word Typing Game</h1>
      {isGameOver ? (
        <div>
          <p>Game Over! Your final score is: {score}</p>
          <p>Time elapsed: {timer} seconds</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      ) : (
        <div>
          <p>Score: {score}</p>
          <p>Time elapsed: {timer} seconds</p>
          <p>Write the word correctly: {currentWord}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Your Association:
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WordAssociationGame;
