import React, { useState, useEffect } from 'react';
import styles from './LetterGrid.module.css';

const LetterGrid = ({ highlightedCoordinates, gridSize }) => {
  const totalCells = gridSize * gridSize;

  const givenString = "NODESaaCOMMINGaaSOONaaaaaa"; 

  const processedString = givenString.split('').map(letter => {
    // If the letter is uppercase (A-Z), keep it; otherwise, replace it with a random uppercase letter
    return (letter >= 'A' && letter <= 'Z') ? letter : String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }).join('');

  const repeatedLetters = Array.from({ length: totalCells }, (_, i) =>
    processedString[i % processedString.length]
  );
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
