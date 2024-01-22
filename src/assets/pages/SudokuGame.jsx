// SudokuGame.js

import React, { useState } from 'react';
import '../../assets/css/SudokuCss.css';

// Sudoku board (0 represents empty cells)
const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const SudokuGame = () => {
  const [board, setBoard] = useState(initialBoard);
  const [tempInput, setTempInput] = useState({ row: null, col: null, value: null });
  const [isCorrect, setIsCorrect] = useState(null);

  const solveSudoku = () => {
    const newBoard = [...initialBoard];
    if (backtrack(newBoard)) {
      setBoard(newBoard);
    } else {
      alert('No solution exists for the current board.');
    }
  };

  const backtrack = (newBoard) => {
    const findEmpty = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (newBoard[row][col] === 0) {
            return { row, col };
          }
        }
      }
      return null; // No empty cell found, puzzle is solved
    };

    const isValidMove = (row, col, num) => {
      // Check row and column
      for (let i = 0; i < 9; i++) {
        if (newBoard[row][i] === num || newBoard[i][col] === num) {
          return false;
        }
      }

      // Check 3x3 grid
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (newBoard[startRow + i][startCol + j] === num) {
            return false;
          }
        }
      }

      return true;
    };

    const solve = () => {
      const emptyCell = findEmpty();
      if (!emptyCell) {
        return true; // Puzzle is solved
      }

      const { row, col } = emptyCell;

      for (let num = 1; num <= 9; num++) {
        if (isValidMove(row, col, num)) {
          newBoard[row][col] = num;

          if (solve()) {
            return true; // Move leads to a solution
          }

          // If placing the number doesn't lead to a solution, backtrack
          newBoard[row][col] = 0;
        }
      }

      return false; // No valid number found, backtrack
    };

    return solve();
  };

  const handleInputChange = (row, col, e) => {
    const value = parseInt(e.target.value, 10);
    setTempInput({ row, col, value });
    setIsCorrect(null);
  };

  const applyInput = () => {
    if (tempInput.row !== null && tempInput.col !== null && tempInput.value !== null) {
      const newBoard = board.map((r) => [...r]);
      newBoard[tempInput.row][tempInput.col] = tempInput.value;
      setBoard(newBoard);

      // Use equality operator here
      if (tempInput.value === initialBoard[tempInput.row][tempInput.col]) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }

      setTempInput({ row: null, col: null, value: null });
    }
  };

  const clearBoard = () => {
    setBoard([...Array(9)].map(() => Array(9).fill(0)));
    setTempInput({ row: null, col: null, value: null });
  };

  const resetBoard = () => {
    setBoard([
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ]);
    setTempInput({ row: null, col: null, value: null });
  };

  return (
    <div>
      <h2>Sudoku Game</h2>
      <div className="sudoku-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="sudoku-cell">
                {cell === 0 ? (

                 <input
                   type="number"
                   min="1"
                   max="9"
                   value={tempInput.row === rowIndex && tempInput.col === colIndex ? tempInput.value : ''}
                   onChange={(e) => handleInputChange(rowIndex, colIndex, e)}
                   className={isCorrect === false && tempInput.row === rowIndex && tempInput.col === colIndex ? 'input incorrect' : ''}
                 />
                ) : (
                  <div className={isCorrect === false && tempInput.row === rowIndex && tempInput.col === colIndex ? 'incorrect' : ''}>
                    {cell}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sudoku-buttons">
        <button onClick={solveSudoku}>Solve</button>
        <button onClick={applyInput}>Apply Input</button>
        <button onClick={clearBoard}>Clear</button>
        <button onClick={resetBoard}>Reset</button>
      </div>
    </div>
  );
};

export default SudokuGame;
