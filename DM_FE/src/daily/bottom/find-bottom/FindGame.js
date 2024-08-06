import React, { useState, useEffect } from 'react';
import './FindGame.css';

function FindGame({ updateResult }) {
    const [editedImageSrc, setEditedImageSrc] = useState('/images/find/틀린그림찾기_2.2 1.png');
    const [circles, setCircles] = useState([]);
    const [score, setScore] = useState(0);
    const [chances, setChances] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [clickedButtons, setClickedButtons] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false); // 게임 시작 상태 추가
    const totalButtons = 3; // 총 버튼 수

    useEffect(() => {
        if (isGameStarted) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setGameOver(true);
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isGameStarted]);

    useEffect(() => {
        if (clickedButtons.length === totalButtons) {
            setGameOver(true);
        }
    }, [clickedButtons]);

    useEffect(() => {
        if (gameOver) {
            // 점수를 소수점 없이 정수로 표시, 99.99점은 100점으로 반올림
            const finalScore = Math.round(score);
            console.log('Final Score:', finalScore);
            updateResult(finalScore); 
        }
    }, [gameOver, score, updateResult]);

    const handleButtonClick = (event, index) => {
        if (!isGameStarted || gameOver || clickedButtons.includes(index)) return;

        const buttonRect = event.target.getBoundingClientRect();
        const overlayRect = event.currentTarget.parentElement.getBoundingClientRect();
        const x = buttonRect.left - overlayRect.left + buttonRect.width / 2;
        const y = buttonRect.top - overlayRect.top + buttonRect.height / 2;

        setCircles((prevCircles) => [
            ...prevCircles,
            { x, y }
        ]);

        // 클릭당 33.33점 부여 (총 100점을 위해)
        setScore((prevScore) => Math.min(prevScore + 33.33, 100));
        setClickedButtons((prevClicked) => [...prevClicked, index]);
    };

    const handleCanvasClick = (event) => {
        if (!isGameStarted || gameOver) return;

        setChances((prevChances) => {
            const newChances = prevChances - 1;
            if (newChances <= 0) {
                setGameOver(true);
            }
            return newChances;
        });
    };

    const startGame = () => {
        setIsGameStarted(true);
    };

    return (
        <div className="find-difference-game">
            {!isGameStarted && (
                <div className="start-modal">
                    <div className="modal-content">
                        <h2>틀린 그림 게임을 시작하겠습니까?</h2>
                        <button onClick={startGame} className="start-button">시작</button>
                    </div>
                </div>
            )}

            {isGameStarted && (
                <>
                    <p className='fp1'>남은기회 <span>{chances}회</span></p>
                    <p className='fp2'>제한 시간 <b>{timeLeft}</b>초 남았습니다.</p>
                    <div className="image-container">
                        <div className="image-wrapper">
                            <h2>원본 그림</h2>
                            <img src="/images/find/틀린그림찾기_2.1 1.png" alt="Original" className="game-image" />
                        </div>
                        <div className="image-wrapper">
                            <h2>달라진 그림</h2>
                            <div className="image-overlay" onClick={handleCanvasClick}>
                                <img src={editedImageSrc} alt="Edited" className="game-image" />
                                <button className="overlay-button btn1-1" style={{ top: '265px', left: '10px' }} onClick={(e) => handleButtonClick(e, 0)}></button>
                                <button className="overlay-button btn1-2" style={{ top: '230px', left: '160px' }} onClick={(e) => handleButtonClick(e, 1)}></button>
                                <button className="overlay-button btn1-3" style={{ top: '263px', left: '270px' }} onClick={(e) => handleButtonClick(e, 2)}></button>
                                {circles.map((circle, index) => (
                                    <div
                                        key={index}
                                        className="circle"
                                        style={{ 
                                            position: 'absolute',
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            border: '2px solid red',
                                            top: circle.y - 10, // circle의 반지름을 고려하여 위치 조정
                                            left: circle.x - 10 // circle의 반지름을 고려하여 위치 조정
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {gameOver && (
                        <div className="game-over-overlay active">
                            <div className="game-over-content">
                                <div className="find-result">
                                    <h2>게임이 종료되었습니다!</h2>
                                    <p>최종점수</p>
                                    <b>{score.toFixed(0)}</b> {/* 점수를 정수로 표시 */}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default FindGame;
