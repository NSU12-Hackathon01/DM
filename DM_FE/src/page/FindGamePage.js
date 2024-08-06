import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import FindGame from '../FindGame/FindGame';
import FindGame2 from '../FindGame/FindGame2';
import FindGame3 from '../FindGame/FindGame3';
import FindGame4 from '../FindGame/FindGame4'; 
import FindGame5 from '../FindGame/FindGame5'; 
import '../css/FindgamePage.css'; 

const FindGamePage = () => {
    const [currentGameIndex, setCurrentGameIndex] = useState(0);
    const [gameScores, setGameScores] = useState([0, 0, 0, 0, 0]); 
    const [shuffledGames, setShuffledGames] = useState([]);

    useEffect(() => {
        const shuffleArray = (array) => {
            return array.sort(() => Math.random() - 0.5);
        };

        const games = [
            <FindGame key="game1" onGameEnd={(score) => handleGameEnd(0, score)} />,
            <FindGame2 key="game2" onGameEnd={(score) => handleGameEnd(1, score)} />,
            <FindGame3 key="game3" onGameEnd={(score) => handleGameEnd(2, score)} />,
            <FindGame4 key="game4" onGameEnd={(score) => handleGameEnd(3, score)} />, 
            <FindGame5 key="game5" onGameEnd={(score) => handleGameEnd(4, score)} />  
        ];

        setShuffledGames(shuffleArray(games));
    }, []);

    const handleGameEnd = (index, score) => {
        const newScores = [...gameScores];
        newScores[index] = score;
    };

    const handleNextGame = () => {
        if (currentGameIndex < shuffledGames.length) {
            setCurrentGameIndex(currentGameIndex + 1);
        }
    };

    const handleRestartGame = () => {
        setCurrentGameIndex(0);
        setGameScores([0, 0, 0, 0, 0]);
    };

    const formatScore = (score) => {
        return typeof score === 'number' ? score.toFixed(0) : '0';
    };

    const averageScore = gameScores.length > 0
        ? (gameScores.reduce((a, b) => a + b, 0) / gameScores.length).toFixed(2)
        : '0.00';

    return (
        <div>
            <div className='find_game_bar'>
                <ul>
                    <li>
                    <i class="fa-solid fa-image"></i>
                       틀린그림 찾기 
                        <em>틀린부분을 맞춰보세요</em>
                    </li>
                    <li>
                        <Link to='/' className='game_link'>뒤로가기</Link>
                    </li>
                </ul>
            </div>
            <div className='find_game'>
                <div className='find_game_wrap'>
                    {currentGameIndex < shuffledGames.length ? (
                        shuffledGames[currentGameIndex]
                    ) : (
                        <div className='game-result'>
                            <h2>점수요약</h2>
                            
                            <div className='findGameScore'>
                                <ul className='scoretop'>
                                    <li>게임1</li>
                                    <li>게임2</li>
                                    <li>게임3</li>
                                    <li>게임4</li>
                                    <li>게임5</li> 
                                </ul><br />
                                <ul className='scorebottom'>
                                    <li>{formatScore(gameScores[0])}점</li>
                                    <li>{formatScore(gameScores[1])}점</li>
                                    <li>{formatScore(gameScores[2])}점</li>
                                    <li>{formatScore(gameScores[3])}점</li> 
                                    <li>{formatScore(gameScores[4])}점</li> 
                                </ul>
                                <br />
                                <div className='clr'>
                                    <span>평균 점수:</span> <b>{averageScore}</b>
                                </div>
                              
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {currentGameIndex < shuffledGames.length && (
                <div className='find_game_buttons'>
                    <button 
                        onClick={handleNextGame}
                        disabled={currentGameIndex === shuffledGames.length - 0}
                    >
                        {currentGameIndex < shuffledGames.length - 1 ? '다음 게임' : '결과 보기'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FindGamePage;
