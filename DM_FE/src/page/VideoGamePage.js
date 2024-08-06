import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/VideoGamePage.css';
import VideoGame from '../videogame/VideoGame';
import VideoGame2 from '../videogame/VideoGame2';
import VideoGame3 from '../videogame/VideoGame3';
import VideoGame4 from '../videogame/VideoGame4';
import VideoGame5 from '../videogame/VideoGame5';
import { Link } from 'react-router-dom';

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

function VideoGamePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const sliderRef = useRef(null);
 
    const [isLastSlide, setIsLastSlide] = useState(false);
  useEffect(() => {

    const games = [
      <VideoGame key={0} onScoreUpdate={handleScoreUpdate(0)} />,
      <VideoGame2 key={1} onScoreUpdate={handleScoreUpdate(1)} />,
      <VideoGame3 key={2} onScoreUpdate={handleScoreUpdate(2)} />,
      <VideoGame4 key={3} onScoreUpdate={handleScoreUpdate(3)} />,
      <VideoGame5 key={4} onScoreUpdate={handleScoreUpdate(4)} />
    ];


    setSlides(shuffleArray(games));
  }, []);

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

  const [scores, setScores] = useState([0, 0, 0, 0, 0]);

  const handleScoreUpdate = (index) => (score) => {
    setScores(prevScores => {
      const newScores = [...prevScores];
      newScores[index] = score;
      return newScores;
    });
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className='video_game_bar'>
        <ul>
          <li>
            <i className="fa-solid fa-pencil"></i>
            광고 게임
            <em>광고안의 요소 찾기</em>
          </li>
          <li>
          <Link to='/' className='game_link'>뒤로가기</Link>

          </li>
        </ul>
      </div>
      <div className='video_game'>
        <div className='video_game_wrap'>
          <Slider {...settings} ref={sliderRef}>
            {slides.map((slide, index) => (
              <div className='video_wrap' key={index}>
                {slide}
              </div>
            ))}
            <div className='video_wrap'>
              <div className='videoScore'>
                <h2>점수 요약</h2>
                <ul className='videotop'>
                  <li>게임1</li>
                  <li>게임2</li>
                  <li>게임3</li>
                  <li>게임4</li>
                  <li>게임5</li>
                </ul><br />
                <ul className='videobottom'>
                  <li>{scores[0] || '0'}점</li>
                  <li>{scores[1] || '0'}점</li>
                  <li>{scores[2] || '0'}점</li>
                  <li>{scores[3] || '0'}점</li>
                  <li>{scores[4] || '0'}점</li>
                </ul>
                <br></br>
                <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
                <div className='clr'>
                  <span>총 점수:</span> <b>{totalScore}</b>
                </div>
              </div>
            </div>

          </Slider>
        </div>
      </div>
      <style>
        {`
          .slick-prev {
            display: ${currentSlide === 0 & (slides.length - 1) ? 'none' : 'none'} !important;
             
          }
          .slick-next {
            display: ${currentSlide === slides.length ? 'none' : 'block'} !important;
          }
          .slick-prev.slick-disabled,
          .slick-next.slick-disabled {
            display: ${currentSlide === slides.length - 1 ? 'none' : 'block'} !important;
          }
        `}
      </style>
    </div>
  );
}

export default VideoGamePage;
