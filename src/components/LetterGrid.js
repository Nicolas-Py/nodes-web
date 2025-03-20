import React, { useState, useEffect } from 'react';
import styles from './LetterGrid.module.css';

const LetterGrid = ({ highlightedCoordinates, gridSize }) => {
  const totalCells = gridSize * gridSize;

  function buildGridString(totalCells) {
    const fixedWords = ["NODES", "COMMING", "SOON"];
    let result = "";
    while (result.length < totalCells) {
      for (let i = 0; i < fixedWords.length && result.length < totalCells; i++) {
        result += fixedWords[i];
        if (result.length < totalCells) {
          const gapLength = Math.floor(Math.random() * 4) + 1; 
          for (let j = 0; j < gapLength && result.length < totalCells; j++) {
            const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            result += randomLetter;
          }
        }
      }
    }
    return result.slice(0, totalCells);
  }

  const gridString = buildGridString(totalCells);
  const repeatedLetters = gridString.split('');
  
  // Compute highlighted indexes based on provided coordinates.
  const highlightedIndexes = highlightedCoordinates.length > 0 
    ? new Set(highlightedCoordinates.map(({ x, y }) => y * gridSize + x))
    : new Set();

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.gridContainer}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`
        }}
      >
        {repeatedLetters.map((letter, index) => (
          <div
            key={index}
            className={`${styles.gridCell} ${highlightedIndexes.has(index) ? styles.highlightedCell : ''}`}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LetterGrid;
