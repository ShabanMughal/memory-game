import React from 'react';

const Card = ({ card, onClick, isInitiallyRevealed }) => {
  return (
    <div
      onClick={onClick}
      className={`w-24 h-24 text-3xl flex items-center justify-center border rounded cursor-pointer ${
        card.isFlipped || isInitiallyRevealed
          ? 'bg-blue-500 text-white'
          : 'bg-gray-300'
      }`}
    >
      {(card.isFlipped || isInitiallyRevealed) ? card.value : '?'}
    </div>
  );
};

export default Card;
