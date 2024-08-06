// src/components/ProtectSlider.js
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/ProtectSlider.css';

const ProtectSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    arrows: true, 
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='protect-slider'>
      <Slider {...settings}>
        <div className="slide-item">
          <img src='/images/main/생활수칙1.png' alt='슬라이드 1' />
        </div>
        <div className="slide-item">
          <img src='/images/main/생활수칙2.png' alt='슬라이드 2' />
        </div>
        <div className="slide-item">
          <img src='/images/main/생활수칙3.png' alt='슬라이드 3' />
        </div>
      </Slider>
    </div>
  );
};

export default ProtectSlider;
