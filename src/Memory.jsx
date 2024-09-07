import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import { generateCards } from './utils/utils';

const Memory = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [chances, setChances] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [initialReveal, setInitialReveal] = useState(false);

  useEffect(() => {
    if (initialReveal) {
      const timer = setTimeout(() => {
        setInitialReveal(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [initialReveal]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedCards((prev) => [...prev, cards[firstIndex].value]);
        setFlippedIndices([]);
      } else {
        setChances((prev) => prev - 1);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, index) =>
              flippedIndices.includes(index)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);

  const handleClick = (index) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped) return;

    setCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedIndices((prev) => [...prev, index]);
  };

  const handleStart = () => {
    const newCards = generateCards();
    setCards(newCards);
    setFlippedIndices([]);
    setMatchedCards([]);
    setChances(5);
    setGameStarted(true);
    setInitialReveal(true);
  };

  const gameOver = chances === 0 && flippedIndices.length === 0;

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Memory Game</h1>
      {!gameStarted ? (
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Start Game
        </button>
      ) : (
        <>
          <div className="mb-4 text-lg">Chances Left: {chances}</div>
          {gameOver ? (
            <div className="text-xl font-semibold">Game Over</div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  onClick={() => handleClick(index)}
                  isInitiallyRevealed={initialReveal}
                />
              ))}
            </div>
          )}
          {matchedCards.length === cards.length / 2 && (
            <div className="mt-8 text-xl font-semibold">You Win!</div>
          )}
        </>
      )}
    </div>
  );
};

export default Memory;
