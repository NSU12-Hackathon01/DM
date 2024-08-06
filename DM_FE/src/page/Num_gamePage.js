import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../css/Num_gamePage.css';
import Numgame from '../game/Num_game';
import Numgame2 from '../game/Num_game2';
import Numgame3 from '../game/Num_game3';
import Numgame4 from '../game/Num_game4';
import Numgame5 from '../game/Num_game5';
import Numgame6 from '../game/Num_game6';
import Numgame7 from '../game/Num_game7';
import Numgame8 from '../game/Num_game8';
import Numgame9 from '../game/Num_game9';
import Numgame10 from '../game/Num_game10';

const Num_gamePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [gameComponents, setGameComponents] = useState([]);
    const [results, setResults] = useState({});

    useEffect(() => {
        const games = [
            <Numgame key="1" updateResult={(result) => handleResultUpdate(0, result)} />,
            <Numgame2 key="2" updateResult={(result) => handleResultUpdate(1, result)} />,
            <Numgame3 key="3" updateResult={(result) => handleResultUpdate(2, result)} />,
            <Numgame4 key="4" updateResult={(result) => handleResultUpdate(3, result)} />,
            <Numgame5 key="5" updateResult={(result) => handleResultUpdate(4, result)} />,
            <Numgame6 key="6" updateResult={(result) => handleResultUpdate(5, result)} />,
            <Numgame7 key="7" updateResult={(result) => handleResultUpdate(6, result)} />,
            <Numgame8 key="8" updateResult={(result) => handleResultUpdate(7, result)} />,
            <Numgame9 key="9" updateResult={(result) => handleResultUpdate(8, result)} />,
            <Numgame10 key="10" updateResult={(result) => handleResultUpdate(9, result)} />
        ];
        
        const selectedGames = shuffleArray(games).slice(0, 5);
        const selectedIndices = selectedGames.map(game => parseInt(game.key) - 1);

        setGameComponents(selectedGames);
        setResults(selectedIndices.reduce((acc, index) => ({ ...acc, [index]: 0 }), {}));
    }, []);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleResultUpdate = (index, result) => {
        setResults(prevResults => ({
            ...prevResults,
            [index]: result
        }));
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

    // Convert results object to an array for rendering
    const resultsArray = Object.entries(results).map(([index, result]) => ({ index: parseInt(index), result }));

    return (
        <div>
            <div className='num_game_bar'>
                <ul>
                    <li>
                        <i className="fa-solid fa-plus"></i>
                        <i className="fa-solid fa-minus"></i> 산수게임 
                        <em>그림을 보고 계산해보기</em>
                    </li>
                    <li>
                    <Link to='/' className='game_link'>뒤로가기</Link>

                    </li>
                </ul>
            </div>
            <div className='num_game'>
                <div className='num_game_wrap'>
                    <Slider {...settings}>
                        {gameComponents.map((GameComponent, index) => (
                            <div key={index}>
                                {GameComponent}
                            </div>
                        ))}
                        <div className='num_game_wrap_result'>
                            <h2>점수 요약</h2>
                            {[0, 1, 2, 3, 4].map(index => (
        <div className='hnum_sum1' key={index}>
            <div className='num_sum_top'>게임 {index + 1}</div>
        </div>
    ))}

                            {resultsArray.map(({ index, result }) => (
                                <div className='hnum_sum2' key={index}>
                                    <div className='num_sum_bottom'>{result}점</div>
                                </div>
                            ))}
                            <div>
                                <span>총점</span> <b>{resultsArray.reduce((a, b) => a + b.result, 0)}점</b>
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
};

export default Num_gamePage;
