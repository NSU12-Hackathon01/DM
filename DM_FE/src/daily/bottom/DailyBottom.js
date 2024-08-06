import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../bottom/DailyBottom.css';
import BNum_game from './num-bottom/BNum_game';
import BNum_game2 from './num-bottom/BNum_game2';
import BNum_game3 from './num-bottom/BNum_game3';
import BNum_game4 from './num-bottom/BNum_game4';
import BNum_game5 from './num-bottom/BNum_game5';
import RememberCard_game from './remember-bottom/RememberCard_game';
import FindGame from './find-bottom/FindGame';
import FindGame2 from './find-bottom/FindGame2';
import FindGame3 from './find-bottom/FindGame3';
import FindGame4 from './find-bottom/FindGame4';
import FindGame5 from './find-bottom/FindGame5';
import Draw_Game from './draw-bottom/Draw_game';
import Draw_Game2 from './draw-bottom/Draw_game2';
import Draw_Game3 from './draw-bottom/Draw_game3';
import Draw_Game4 from './draw-bottom/Draw_game4';
import Draw_Game5 from './draw-bottom/Draw_game5';
import Draw_Game6 from './draw-bottom/Draw_game6';
import Draw_Game7 from './draw-bottom/Draw_game7';
import Draw_Game8 from './draw-bottom/Draw_game8';
import Draw_Game9 from './draw-bottom/Draw_game9';
import Draw_Game10 from './draw-bottom/Draw_game10';

const DailyBottom = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [randomGameComponent, setRandomGameComponent] = useState(null);
    const [randomGameResult, setRandomGameResult] = useState(0);
    const [rememberCardResult, setRememberCardResult] = useState(0);
    const [randomFindGameComponent, setRandomFindGameComponent] = useState(null);
    const [findGameResult, setFindGameResult] = useState(0);
    const [randomDrawGameComponent, setRandomDrawGameComponent] = useState(null);
    const [drawGameResult, setDrawGameResult] = useState({ image: '', text: '' });

    const [scores, setScores] = useState([0, 0, 0]);

    const gameComponents = [
        { component: <BNum_game key="1" updateResult={(score) => handleGameResult(score)} />, key: 'BNum_game' },
        { component: <BNum_game2 key="2" updateResult={(score) => handleGameResult(score)} />, key: 'BNum_game2' },
        { component: <BNum_game3 key="3" updateResult={(score) => handleGameResult(score)} />, key: 'BNum_game3' },
        { component: <BNum_game4 key="4" updateResult={(score) => handleGameResult(score)} />, key: 'BNum_game4' },
        { component: <BNum_game5 key="5" updateResult={(score) => handleGameResult(score)} />, key: 'BNum_game5' }
    ];

    const findGameComponents = [
        { component: <FindGame key="1" updateResult={(score) => handleFindGameResult(score)} />, key: 'FindGame' },
        { component: <FindGame2 key="2" updateResult={(score) => handleFindGameResult(score)} />, key: 'FindGame2' },
        { component: <FindGame3 key="3" updateResult={(score) => handleFindGameResult(score)} />, key: 'FindGame3' },
        { component: <FindGame4 key="4" updateResult={(score) => handleFindGameResult(score)} />, key: 'FindGame4' },
        { component: <FindGame5 key="5" updateResult={(score) => handleFindGameResult(score)} />, key: 'FindGame5' }
    ];

    const drawGameComponents = [
        { component: <Draw_Game key="1" updateResult={(result) => handleDrawGameResult(result)} />, key: 'Draw_Game' },
        { component: <Draw_Game2 key="2" updateResult={(result) => handleDrawGameResult(result)} />, key: 'Draw_Game2' },
        { component: <Draw_Game3 key="3" updateResult={(result) => handleDrawGameResult(result)} />, key: 'Draw_Game3' },
        { component: <Draw_Game4 key="4" updateResult={(result) => handleDrawGameResult(result)} />, key: 'Draw_Game4' },
        { component: <Draw_Game5 key="5" updateResult={(result) => handleDrawGameResult(result)} />, key: 'Draw_Game5' }
    ];

    useEffect(() => {
        const randomGameIndex = Math.floor(Math.random() * gameComponents.length);
        setRandomGameComponent(gameComponents[randomGameIndex].component);

        const randomFindGameIndex = Math.floor(Math.random() * findGameComponents.length);
        setRandomFindGameComponent(findGameComponents[randomFindGameIndex].component);

        const randomDrawGameIndex = Math.floor(Math.random() * drawGameComponents.length);
        setRandomDrawGameComponent(drawGameComponents[randomDrawGameIndex].component);
    }, []);

    const handleGameResult = (score) => {
        const result = score || 0;
        setRandomGameResult(result);
        updateScores(result);
    };

    const handleRememberCardResult = (score) => {
        const result = score || 0; 
        setRememberCardResult(result);
        updateScores(result);
    };

    const handleFindGameResult = (score) => {
        const result = score || 0;
        setFindGameResult(result);
        updateScores(result);
    };

    const handleDrawGameResult = (result) => {
        setDrawGameResult(result);
    };

    const updateScores = (score) => {
        setScores(prevScores => {
            const newScores = [...prevScores];
            if (!newScores.includes(score)) {
                newScores.push(score);
            }
            return newScores;
        });
    };

    const calculateAverage = (scores) => {
        if (scores.length === 0) return 0;
        const total = scores.reduce((acc, score) => acc + score, 0);
        return total / scores.length;
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        afterChange: (current) => {
            const totalSlides = 6;
            setIsLastSlide(current === totalSlides - 1);
            setCurrentSlide(current);
        },
        arrows: !isLastSlide,
        dots: !isLastSlide,
    };

    return (
        <div>
            <div className='daily_bar'>
                <ul>
                    <li>
                        출석체크
                        <em>게임을 완료하고 오늘 출석을 완료해보세요!</em>
                    </li>
                    <li>
                        <Link to='/' className='game_link'>뒤로가기</Link>
                    </li>
                </ul>
            </div>
            <div className='daily'>
                <div className='daily_wrap'>
                    <Slider {...settings}>
                        <div>
                            {randomGameComponent || <div>게임을 로드하는 중...</div>}
                        </div>
                        <div>
                            <RememberCard_game updateResult={(score) => handleRememberCardResult(score)} />
                        </div>
                        <div>
                            {randomFindGameComponent || <div>게임을 로드하는 중...</div>}
                        </div>
                        <div className='dd'>
                            {randomDrawGameComponent || <div>게임을 로드하는 중...</div>}
                        </div>
                        <div className='dailyResult'>
                            <h2>점수 요약</h2>
                           <div className='topresult'>
                            <ul>
                                <li>산수 게임</li>
                                <li>짝 맞추기</li>
                                <li>틀린 그림</li>
                            </ul>
                           </div>
                           <div className='bottomresult'>
                            <ul>
                                <li>{randomGameResult || 0}점</li>
                                <li>{rememberCardResult || 0}점</li>
                                <li>{findGameResult || 0}점</li>
                            </ul>
                           </div>
                            <h3>총 점수 <b>{calculateAverage(scores).toFixed(2)}점</b></h3>
                            {drawGameResult.image ? (
                                <div>
                                    <h2>그림게임 결과</h2>
                                     <p>{drawGameResult.text}</p>   
                                    <img src={drawGameResult.image} alt="Draw Game Result" className="draw-game-result-image" />
                                   
                                </div>
                            ) : (
                                <div>그려진 그림이 없습니다. 그림을 그려주세요!</div>
                            )}
                            <button className='dailycheck'>출석체크 하기</button>
                        </div>
                    </Slider>
                </div>
            </div>  <style jsx>{`
        .slick-prev {
          display: ${currentSlide === 0 ? 'none' : 'block'} !important;
        }
        .slick-next {
          display: ${currentSlide === 4 ? 'none' : 'block'} !important;
        }
        .slick-prev.slick-disabled,
        .slick-next.slick-disabled {
          display: ${currentSlide === 5 ? 'none' : 'block'} !important;
        }
      `}</style>
        </div>
    );
};

export default DailyBottom;
