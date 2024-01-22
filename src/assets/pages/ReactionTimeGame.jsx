import React, { useState, useEffect } from 'react';

const ReactionTimeGame = () => {
  const [showButton, setShowButton] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);

  const handleButtonClick = () => {
    if (showButton) {
      const endTime = new Date().getTime();
      const timeDifference = endTime - startTime;
      setReactionTime(timeDifference);
      setShowButton(false);
    }
  };

  const startGame = () => {
    setShowButton(true);
    setStartTime(new Date().getTime());
  };

  const restartGame = () => {
    setReactionTime(null);
    setTimeout(() => startGame(), Math.floor(Math.random() * (7000 - 2000) + 2000)); // Random time between 2 and 7 seconds
  };

  useEffect(() => {
    // Reset the game state when the component mounts
    setShowButton(false);
    setReactionTime(null);

    // Start the first game after a delay
    const timeout = setTimeout(() => {
      startGame();
    }, Math.floor(Math.random() * (7000 - 2000) + 2000)); // Random time between 2 and 7 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <h1>Reaction Time Game</h1>
      {showButton ? (
        <button onClick={handleButtonClick}>Click me!</button>
      ) : (
        <p>Wait for the button to appear...</p>
      )}
      {reactionTime !== null && (
        <div>
          <p>Your reaction time: {reactionTime} milliseconds</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default ReactionTimeGame;
