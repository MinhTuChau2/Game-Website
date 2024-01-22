import React, { useState, useEffect } from 'react';

const MathGame = () => {
  const [equation, setEquation] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);

  const generateEquation = () => {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * (10 + score)); // Adjust the range based on the score
    let num2 = Math.floor(Math.random() * (10 + score)); // Adjust the range based on the score

    // Ensure the result is a positive integer for division
    if (operator === '/' && num2 === 0) {
      num2 = 1;
    }

    const equationString = `${num1} ${operator} ${num2}`;
    setEquation(equationString);
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctAnswer = eval(equation);
    const userAnswerFloat = parseFloat(userAnswer);

    // Round the answer to the nearest hundredth
    const roundedUserAnswer = userAnswerFloat.toFixed(2);

    if (parseFloat(roundedUserAnswer) === correctAnswer) {
      setScore(score + 1);
    }

    setUserAnswer('');
    generateEquation();
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(60);
    generateEquation();
  };

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  useEffect(() => {
    generateEquation();
  }, [score]);

  return (
    <div>
      <h1>Math Game</h1>
      {isGameOver ? (
        <div>
          <p>Game Over! Your final score is: {score}</p>
          <p>Time left: {timeLeft} seconds</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      ) : (
        <div>
          <p>Score: {score}</p>
          <p>Time left: {timeLeft} seconds</p>
          <p>Solve the equation: {equation}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Your Answer:
              <input
                type="number"
                step="0.01"
                value={userAnswer}
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

export default MathGame;
