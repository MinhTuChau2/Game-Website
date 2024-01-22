import React, { useState, useEffect } from 'react';
import "../../assets/css/WordScrambleCss.css";

const WordScramble = () => {
  const words = [
    'react', 'javascript', 'developer', 'programming', 'challenge',
    'frontend', 'backend', 'vini', 'minhtu', 'keshan', 'cosy', 'algorithm', 'component', 'web',
    'application', 'code', 'interface', 'function', 'variable'
  ];
  const [originalWord, setOriginalWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    generateWord();
  }, []);

  const generateWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const wordToScramble = words[randomIndex];

    setOriginalWord(wordToScramble);
    setScrambledWord(scrambleWord(wordToScramble));
    setUserAnswer('');
    setIsCorrect(null);
    setAttempts(0); // Reset attempts when a new word is generated
  };

  const scrambleWord = (word) => {
    const shuffled = word.split('').sort(() => 0.5 - Math.random()).join('');
    return shuffled;
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer.toLowerCase() === originalWord.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setAttempts(attempts + 1);

      if (attempts >= 2) {
        setIsCorrect(false);
      }
    }
  };

  return (
    <div>
      <h1>Fun Word Scramble</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Unscramble the following word:
          <strong> {scrambledWord}</strong>
        </p>
        <p>Tries: {attempts}</p>
        <label>
          Your Answer:
          <input
            type="text"
            value={userAnswer}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Check Answer</button>
      </form>
      {isCorrect !== null && (
        <div>
          {isCorrect ? <p>Correct! Well done!</p> : <p>Incorrect. The correct answer is: {originalWord}</p>}
          <button onClick={generateWord}>Next Word</button>
        </div>
      )}
    </div>
  );
};

export default WordScramble;
