// BookGame.jsx

import React, { useState } from 'react';
import '../../assets/css/BookGame.css';

const BookGame = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [bookCompleted, setBookCompleted] = useState(false);

  const getRandomImageURL = () => {
    const randomImageId = Math.floor(Math.random() * 1000) + 1;
    return `https://picsum.photos/300/400?random=${randomImageId}`;
  };

  const getPageInstruction = (index) => {
    if (index === 0) {
      return 'Write an introduction.';
    } else if (index < 4) {
      return 'and then...';
    } else {
      return 'finally...';
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleGenerateImage = () => {
    if (currentPage < 5) {
      // Simulate AI image generation with a randomly generated image URL
      const aiGeneratedImageURL = getRandomImageURL();

      // Create a new page with user input and AI-generated image
      const newPage = {
        text: currentPage === 0 ? userInput : userInput,
        imageUrl: aiGeneratedImageURL,
      };

      // Update the pages array
      setPages([...pages, newPage]);

      // Move to the next page, up to a maximum of 5 pages
      if (currentPage < 4) {
        setCurrentPage(currentPage + 1);
      } else {
        setBookCompleted(true);
      }
    }
  };

  return (
    <div className={`book-game-container ${bookCompleted ? 'completed' : ''}`}>
      <h1>Book Making Game</h1>

      <div className="book-container">
        {pages.map((page, index) => (
          <div key={index} className={`page ${index === currentPage ? 'active' : ''}`}>
            <img src={page.imageUrl} alt={`Page ${index + 1}`} />
            <p>{page.text}</p>
          </div>
        ))}
      </div>

      {currentPage < 5 && !bookCompleted && (
        <div className="input-page">
          <p>{getPageInstruction(currentPage)}</p>
          <textarea
            placeholder="Write here..."
            value={userInput}
            onChange={handleInputChange}
          ></textarea>
          <button onClick={handleGenerateImage}>Generate Image</button>
        </div>
      )}

      {bookCompleted && (
        <div className="completed-message">
          <p>Congratulations! You've completed your book.</p>
        </div>
      )}
    </div>
  );
};

export default BookGame;
