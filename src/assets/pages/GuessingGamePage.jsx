
import React, { useState } from "react";
import "../../assets/css/GamePage.css";

function GuessingGamePage() {
  const [guess, setGuess] = useState('');
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [result, setResult] = useState('');
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuess = () => {
    const userGuess = parseInt(guess);

    if (isNaN(userGuess)) {
      setResult('Please enter a valid number.');
    } else {
      setAttempts(attempts + 1);

      if (userGuess === randomNumber) {
        setResult(`Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts.`);

      } else if (userGuess < randomNumber) {
        setResult('Try a higher number!');
      } else {
        setResult('Try a lower number!');
      }
    }
  };

  const handleRestart = () => {
    setGuess('');
    setRandomNumber(generateRandomNumber());
    setResult('');
    setAttempts(0);
  };

  return (
    <div className="GamePage">
      <h1>Cool Guessing Game</h1>
      <p>Can you guess the number between 1 and 100?</p>

      <input
        type="number"
        value={guess}
        onChange={handleInputChange}
        placeholder="Enter your guess"
      />
      <button onClick={handleGuess}>Guess</button>

      {result && (
        <div>
          <p>{result}</p>

        </div>
      )}
    </div>
  );
}


export default GuessingGamePage;
