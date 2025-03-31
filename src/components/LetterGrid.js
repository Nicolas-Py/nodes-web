import React, { useState, useEffect } from 'react';
import styles from './LetterGrid.module.css';

const LetterGrid = ({ highlightedCoordinates, gridSize }) => {
  const totalCells = gridSize * gridSize;

  // Returns the current countdown as an 8-character string (DDHHMMSS)
  function getCountdownString() {
    const countdownTarget = new Date('2025-04-31T00:00:00').getTime();
    const now = new Date().getTime();
    let timeLeft = Math.max(0, countdownTarget - now);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    timeLeft %= (1000 * 60 * 60 * 24);
    const hours = Math.floor(timeLeft / (1000 * 60 * 60)).toString().padStart(2, '0');
    timeLeft %= (1000 * 60 * 60);
    const minutes = Math.floor(timeLeft / (1000 * 60)).toString().padStart(2, '0');
    timeLeft %= (1000 * 60);
    const seconds = Math.floor(timeLeft / 1000).toString().padStart(2, '0');

    return `${days}${hours}${minutes}${seconds}`;
  }

  // Generates the static part of the grid (after the 8-character countdown) of length (totalCells - 8)
  function generateStaticPart(totalCells) {
    const fixedWords = ["NODES", "COMMING", "SOON"];
    let result = "";
    while (result.length < totalCells - 8) {
      for (let i = 0; i < fixedWords.length && result.length < totalCells - 8; i++) {
        result += fixedWords[i];
        if (result.length < totalCells - 8) {
          const gapLength = Math.floor(Math.random() * 4) + 1;
          for (let j = 0; j < gapLength && result.length < totalCells - 8; j++) {
            const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            result += randomLetter;
          }
        }
      }
    }
    return result.slice(0, totalCells - 8);
  }

  const [countdownString, setCountdownString] = useState(getCountdownString());
  const [staticPart, setStaticPart] = useState(() => generateStaticPart(totalCells));

  // In case gridSize changes, update the static part
  useEffect(() => {
    setStaticPart(generateStaticPart(totalCells));
  }, [totalCells]);

  // Update only the countdown string every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownString(getCountdownString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const gridString = countdownString + staticPart;
  const repeatedLetters = gridString.split('');

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
