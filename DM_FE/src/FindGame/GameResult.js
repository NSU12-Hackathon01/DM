// src/FindGame/GameResult.js
import React from 'react';


const GameResult = ({ scores, average, onBackToGame }) => {
    return (
        <div className='game-result'>
            <h2>게임이 종료되었습니다!</h2>
            <p>최종 점수 요약</p>
            <div className='game-result-scores'>
                <ul className='scoretop'>
                    <li>게임1</li>
                    <li>게임2</li>
                    <li>게임3</li>
                    <li>게임4</li>
                    <li>게임5</li>
                </ul>
                <ul className='scorebottom'>
                    {scores.map((score, index) => (
                        <li key={index}>{score.toFixed(0)}점</li>
                    ))}
                </ul>
                <div className='average-score'>
                    <span>평균 점수:</span> <b>{average.toFixed(2)}</b>
                </div>
            </div>
            <button onClick={onBackToGame}>게임으로 돌아가기</button>
        </div>
    );
};

export default GameResult;
