import React from 'react';
import styles from './LetterGrid.module.css';

const LetterGrid = ({ highlightedCoordinates, gridSize}) => {
  const totalCells = gridSize * gridSize;

  // Generate a random letter for each cell.
  const letters = Array.from({ length: totalCells }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
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
        {letters.map((letter, index) => (
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
