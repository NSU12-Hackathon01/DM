import React from 'react';
import './Card.css';

const Card = ({ card, onClick, isFlipped }) => {
  const imageUrl = card.image; // 카드 객체에서 이미지 URL 가져오기

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => onClick(card)}>
      <div className="card-inner">
        <div className="card-front">
          ?
        </div>
        <div
          className="card-back"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          {card.value}
        </div>
      </div>
    </div>
  );
};

export default Card;
