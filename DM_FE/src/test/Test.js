import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../test/test.css';
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

const Test = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [randomGameComponent, setRandomGameComponent] = useState(null);
    const [randomGameResult, setRandomGameResult] = useState(0);
    const [rememberCardResult, setRememberCardResult] = useState(0);
    const [randomFindGameComponent, setRandomFindGameComponent] = useState(null);
    const [findGameResult, setFindGameResult] = useState(0);
    const [totalResult, setTotalResult] = useState(0);

    const [scores, setScores] = useState([0, 0, 0]);
    const navigate = useNavigate(); // useNavigate 훅 사용

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

    useEffect(() => {
        const randomGameIndex = Math.floor(Math.random() * gameComponents.length);
        setRandomGameComponent(gameComponents[randomGameIndex].component);

        const randomFindGameIndex = Math.floor(Math.random() * findGameComponents.length);
        setRandomFindGameComponent(findGameComponents[randomFindGameIndex].component);

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

    const handleAttendanceCheck = () => {
        const averageScore = calculateAverage(scores);
        const adjustedScore = Math.floor(averageScore / 10);
        setTotalResult(adjustedScore);
        console.log(`Adjusted Score: ${adjustedScore}`);
        
        alert('사전 테스트 완료, 메인페이지로 이동합니다.');
        navigate('/'); // 메인 페이지로 리다이렉션
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        afterChange: (current) => {
            const totalSlides = 4;
            setIsLastSlide(current === totalSlides - 1);
            setCurrentSlide(current);
        },
        arrows: !isLastSlide,
        dots: !isLastSlide,
    };

    return (
        <div>
            <div className='TEst_bar'>
                <ul>
                    <li>
                        사전테스트
                        <em>회원님의 난이도를 측정합니다!</em>
                    </li>
                    <li>
                        <Link to='/' className='game_link'>뒤로가기</Link>
                    </li>
                </ul>
            </div>
            <div className='TEst'>
                <div className='TEst_wrap'>
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
                        <div className='TEstResult'>
                            <h2>점수 요약</h2>
                            <div className='testresult'>
                                <ul>
                                    <li>산수 게임</li>
                                    <li>짝 맞추기</li>
                                    <li>틀린 그림</li>
                                </ul>
                            </div>
                            <div className='testBresult'>
                                <ul>
                                    <li>{randomGameResult || 0}점</li>
                                    <li>{rememberCardResult || 0}점</li>
                                    <li>{findGameResult || 0}점</li>
                                </ul>
                            </div>
                            <h3>총 점수 <b>{calculateAverage(scores).toFixed(2)}점</b></h3>
                            <button className='testcheck' onClick={handleAttendanceCheck}>사전테스트 완료하기</button>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Test;
