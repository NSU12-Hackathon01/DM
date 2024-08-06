import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Game.css';

const initialCards = [
  { id: 1, value: 'A',image: '/images/remember/연못.jpg' }, { id: 2, value: 'A',image: '/images/remember/연못.jpg'  },
  { id: 3, value: 'B',image: '/images/remember/원숭이.jpg'  }, { id: 4, value: 'B',image: '/images/remember/원숭이.jpg'  },
  { id: 5, value: 'C',image: '/images/remember/판다.jpg'  }, { id: 6, value: 'C',image: '/images/remember/판다.jpg'  },
  { id: 7, value: 'D',image: '/images/remember/토끼.jpg'  }, { id: 8, value: 'D',image: '/images/remember/토끼.jpg'  }
];

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const calculateScore = (matchedPairs, remainingAttempts) => {
  const matchScore = matchedPairs * 20; // 각 맞춘 쌍당 10점
  const attemptBonus = remainingAttempts * 5; // 남은 기회당 5점
  const totalScore = matchScore + attemptBonus;
  return Math.min(totalScore, 100); // 최대 100점으로 제한
};

const countMatchedPairs = (matchedIndices, cards) => {
  const matchedPairs = Math.floor(matchedIndices.length / 2);
  const totalPairs = cards.length / 2+1;
  const allPairsMatched = matchedPairs === totalPairs;
  return { matchedPairs, allPairsMatched };
};

const RememberCard_game4 = ({ onGameEnd }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [attempts, setAttempts] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [countdown, setCountdown] = useState(10); 
  const [showStartModal, setShowStartModal] = useState(true);
  const [score, setScore] = useState(null);
  const [victoryMessage, setVictoryMessage] = useState('');

  useEffect(() => {
    if (!showStartModal) {
      // 카드 초기화 및 섞기
      setCards(shuffle([...initialCards]));

      // 카드 내용 15초 동안 보이기
      setShowCards(true);

      // 카운트다운 설정
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval);
            setShowCards(false); // 15초 후 카드 숨기기
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
  }, [showStartModal]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;

      if (cards[firstIndex] && cards[secondIndex] && cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedIndices(prev => {
          const newMatchedIndices = [...prev, firstIndex, secondIndex];
          return [...new Set(newMatchedIndices)]; 
        });
        const { matchedPairs, allPairsMatched } = countMatchedPairs([...matchedIndices, firstIndex, secondIndex], cards);
        if (allPairsMatched) {
          setVictoryMessage('축하합니다! 모두 정답입니다!');
          const finalScore = calculateScore(matchedPairs, attempts);
          setScore(finalScore);
          setGameOver(true);
        }
      } else {
        setAttempts(prevAttempts => {
          const updatedAttempts = prevAttempts - 1;
          if (updatedAttempts <= 0) {
            const matchedPairs = Math.floor(matchedIndices.length / 2);
            const finalScore = calculateScore(matchedPairs, 0);
            setScore(finalScore);
            setGameOver(true);
          }
          return updatedAttempts;
        });
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }, [flippedIndices, cards, matchedIndices]);

  useEffect(() => {
    if (gameOver) {
      onGameEnd(score); // 부모 컴포넌트로 점수 전달
      const { matchedPairs, allPairsMatched } = countMatchedPairs(matchedIndices, cards+1);
      if (allPairsMatched) {
        setVictoryMessage('축하합니다! 모두 정답입니다!');
      } else {
        setVictoryMessage('게임이 종료되었습니다!');
      }
      const finalScore = calculateScore(matchedPairs, attempts);
      setScore(finalScore);
    }
  }, [gameOver,score, matchedIndices, cards, attempts]);

  const handleClick = (card) => {
    if (gameOver || showCards) return; // 게임 종료 상태 또는 카드 표시 중 클릭 무시

    const index = cards.indexOf(card);
    if (index === -1) return; // 카드가 유효하지 않다면 아무 작업도 하지 않음
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedIndices.includes(index)) {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  const handleStartGame = () => {
    setShowStartModal(false);
  };
// RememberCard_game.js (예시)


  return (
    <div className={`game-container ${gameOver ? 'game-over' : ''}`}>
      {showStartModal && (
        <div className="start-modal">
          <h2>네번째 게임을 시작하겠습니까?</h2>
          <p>카드가 10초동안 표시됩니다. 준비하세요!</p>
          <button className='cardbtn' onClick={handleStartGame}>확인</button>
        </div>
      )}
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            onClick={handleClick}
            isFlipped={showCards || flippedIndices.includes(index) || matchedIndices.includes(index)}
          />
        ))}
        {gameOver && (
            <div className="game-over-message">
            <h2>게임이 종료되었습니다!</h2>
            <p>최종점수</p>
            <div className='remember_score'>{score}점</div>
           </div>
        )}<br/>
        {showCards && <div className="countdown">카드가  {countdown}초 동안 표시됩니다. </div>}
        {!showStartModal && !gameOver && (
          <div className="attempts-remaining">남은 기회: {attempts}</div>
        )}
      </div>
    </div>
  );
};

export default RememberCard_game4;
