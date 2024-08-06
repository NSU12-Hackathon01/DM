// Remember_gamePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/Remember_gamePage.css';
import RememberCard_game from '../game/RememberCard_game';
import RememberCard_game2 from '../game/RememberCard_game2';
import RememberCard_game3 from '../game/RememberCard_game3';
import RememberCard_game4 from '../game/RememberCard_game4';
import RememberCard_game5 from '../game/RememberCard_game5';
function Remember_gamePage() {
    const [scores, setScores] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const handleGameEnd = (score) => {
        setScores(prevScores => {
            if (prevScores.length < 5) { // 최대 3개의 게임 점수 저장
                return [...prevScores, score];
            }
            return prevScores;
        });
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current) => {
            const totalSlides = 6;
            setIsLastSlide(current === totalSlides - 1);
        },
        arrows: !isLastSlide,
        dots: !isLastSlide,
    };

    return (
        <div>
            <div className='remember_game_bar'>
                <ul>
                    <li>
                        <i className="fa-solid fa-pencil"></i>
                        짝 맞추기 게임
                        <em>제시된 문제를 암기해보세요</em>
                    </li>
                    <li>
                        <Link to='/' className='game_link'>뒤로가기</Link>
                    </li>
                </ul>
            </div>
            <div className='remember_game'>
                <div className='remember_game_wrap'>
                    <Slider {...settings}>
                        <div className='remember_wrap'>
                            <RememberCard_game onGameEnd={handleGameEnd} />
                        </div>
                        <div className='remember_wrap'>
                            <RememberCard_game2 onGameEnd={handleGameEnd} />
                        </div>
                        <div className='remember_wrap'>
                            <RememberCard_game3 onGameEnd={handleGameEnd} />
                        </div>
                        <div className='remember_wrap'>
                            <RememberCard_game4 onGameEnd={handleGameEnd} />
                        </div>
                        <div className='remember_wrap'>
                            <RememberCard_game5 onGameEnd={handleGameEnd} />
                        </div>
                        <div className='remember_wrap'>
                            <div className='rememberScore'>
                                <h2>점수 요약</h2>
                                <ul className='scoretop'>
                                    <li>게임1</li>
                                    <li>게임2</li>
                                    <li>게임3</li>
                                    <li>게임4</li>
                                    <li>게임5</li>
                                </ul><br />
                                <ul className='scorebottom'>
                                    <li>{scores[0] || '0'}점</li>
                                    <li>{scores[1] || '0'}점</li>
                                    <li>{scores[2] || '0'}점</li>
                                    <li>{scores[3] || '0'}점</li>
                                    <li>{scores[4] || '0'}점</li>
                                </ul>
                                <br></br>
                                <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
                                <div className='clr'>
                                    <span>평균 점수:</span> <b>{scores.length === 5 ?
                                        (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
                                        : (scores.reduce((a, b) => a + (b || 0), 0) / 5).toFixed(2)}</b>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
            <style jsx>{`
        .slick-prev {
          display: ${currentSlide === 0 ? 'none' : 'block'} !important;
        }
        .slick-next {
          display: ${currentSlide === 6 ? 'none' : 'block'} !important;
        }
        .slick-prev.slick-disabled,
        .slick-next.slick-disabled {
          display: ${currentSlide === 5 ? 'none' : 'block'} !important;
        }
      `}</style>
        </div>
    );
}

export default Remember_gamePage;
