import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/Draw_gamePage.css';
import Draw_game from '../game/Draw_game';
import Draw_game2 from '../game/Draw_game2';
import Draw_game3 from '../game/Draw_game3';
import Draw_game4 from '../game/Draw_game4';
import Draw_game5 from '../game/Draw_game5';
import Draw_game6 from '../game/Draw_game6';
import Draw_game7 from '../game/Draw_game7';
import Draw_game8 from '../game/Draw_game8';
import Draw_game9 from '../game/Draw_game9';
import Draw_game10 from '../game/Draw_game10';

function Draw_gamePage() {
  const [drawingData, setDrawingData] = useState([]);
  const sliderRef = useRef(null);

  const handleDrawingComplete = (data) => {
    setDrawingData(prevData => {
      const updatedData = [...prevData, data];
      if (updatedData.length >= 5 && sliderRef.current) {
        sliderRef.current.slickGoTo(5);
      }
      return updatedData;
    });
  };

  const drawGames = [
    { component: <Draw_game key="1" onDrawingComplete={handleDrawingComplete} />, key: "1" },
    { component: <Draw_game2 key="2" onDrawingComplete={handleDrawingComplete} />, key: "2" },
    { component: <Draw_game3 key="3" onDrawingComplete={handleDrawingComplete} />, key: "3" },
    { component: <Draw_game4 key="4" onDrawingComplete={handleDrawingComplete} />, key: "4" },
    { component: <Draw_game5 key="5" onDrawingComplete={handleDrawingComplete} />, key: "5" },
    { component: <Draw_game6 key="6" onDrawingComplete={handleDrawingComplete} />, key: "6" },
    { component: <Draw_game7 key="7" onDrawingComplete={handleDrawingComplete} />, key: "7" },
    { component: <Draw_game8 key="8" onDrawingComplete={handleDrawingComplete} />, key: "8" },
    { component: <Draw_game9 key="9" onDrawingComplete={handleDrawingComplete} />, key: "9" },
    { component: <Draw_game10 key="10" onDrawingComplete={handleDrawingComplete} />, key: "10" }
  ];

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const randomDrawGames = shuffleArray(drawGames).slice(0, 5);

  // 중복 검사
  const hasDuplicateKeys = (array) => {
    const keys = array.map(item => item.key);
    return keys.length !== new Set(keys).size;
  };

  if (hasDuplicateKeys(randomDrawGames)) {
    console.error("중복된 컴포넌트가 있습니다.");
  } else {
    console.log("중복된 컴포넌트가 없습니다.");
  }

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
    arrows: true,
    afterChange: (current) => {
      if (current === 5 && drawingData.length < 5) {
        setDrawingData(prevData => {
          if (prevData.length >= 5) {
            return prevData;
          }
          return prevData;
        });
      }
    }
  };

  return (
    <div>
      <div className='Draw_game_bar'>
        <ul>
          <li>
            <i className="fa-solid fa-pencil"></i>
            제시어 그림그리기
            <em>제시어 따라 그리기</em>
          </li>
          <li>
            <Link to='/' className='game_link'>뒤로가기</Link>
          </li>
        </ul>
      </div>
      <div className='draw_game'>
        <div className='draw_game_wrap'>
          <Slider {...settings} ref={sliderRef}>
            {randomDrawGames.map((game, index) => (
              <div className='draw_wrap' key={index}>
                {game.component}
              </div>
            ))}
            <div className='draw_wrap'>
              {drawingData.length === 5 ? (
                <div className='draw_result'>
                  <h2>완성된 그림들</h2>
                  <div className='grid-container'>
                    {drawingData.map((data, index) => (
                      <div key={index} className='grid-item'>
                        <h3>{data.text}</h3>
                        <img 
                          src={data.image} 
                          alt={`Drawing ${index + 1}`} 
                          className='drawing-image'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='result'>
                  그림을 모두 완성해 주세요.
                </div>
              )}
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Draw_gamePage;
