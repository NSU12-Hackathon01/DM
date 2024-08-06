import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/Call_gamePage.css';

function Call_gamePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [names, setNames] = useState(Array(5).fill(''));
    const [phoneNumbers, setPhoneNumbers] = useState(Array(5).fill(''));

    const handleNameChange = (index, value) => {
        const newNames = [...names];
        newNames[index] = value;
        setNames(newNames);
    };

    const handlePhoneNumberChange = (index, value) => {
        const newPhoneNumbers = [...phoneNumbers];
        newPhoneNumbers[index] = value;
        setPhoneNumbers(newPhoneNumbers);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current) => {
            const totalSlides = 6;
            setCurrentSlide(current);
            setIsLastSlide(current === totalSlides - 1);
        },
        arrows: !isLastSlide,
        dots: !isLastSlide,
    };

    return (
        <div>
            <div className='call_game_bar'>
                <ul>
                    <li>
                        <i className="fa-solid fa-pencil"></i>
                        전화번호 맞추기 게임
                        <em>전화번호를 맞춰보세요!</em>
                    </li>
                    <li>
                        <Link to='/' className='game_link'>뒤로가기</Link>
                    </li>
                </ul>
            </div>
            <div className='call_game'>
                <div className='call_game_wrap'>
                    <Slider {...settings}>
                        <div className='call_wrap wrap1'>
                            <h2>자주 연락하는 사람들의 이름을 입력해주세요!</h2>
                            <ul>
                                {names.map((name, index) => (
                                    <li key={index}>
                                        <span>{index + 1}.</span>
                                        <input 
                                            type='text' 
                                            value={name} 
                                            onChange={(e) => handleNameChange(index, e.target.value)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='call_wrap wrap2'>
                            <h2>입력한 분들의 전화번호를 입력해주세요!</h2>
                            <ul>
                                {names.map((name, index) => (
                                    <li key={index}>    
                                        <span>{name}:</span>
                                        <input 
                                            type='text' 
                                            value={phoneNumbers[index]}
                                            onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='call_wrap wrap2'>
                            <h2>저장되어 있는 번호와 입력하신 분들의 번호가 똑같은 지 확인하세요!</h2>
                            <ul>
                                {names.map((name, index) => (
                                    <li key={index}>
                                        <span>{name} :</span> <b className='callresult'>{phoneNumbers[index]}</b>
                                    </li>
                                ))}
                            </ul>
                        </div>
                     
                         
                    </Slider>
                </div>
            </div>
            <style jsx>{`
                .slick-prev {
                    display: ${currentSlide === 0 ? 'none' : 'block'} !important;
                }
                .slick-next {
                    display: ${currentSlide === 2 ? 'none' : 'block'} !important;
                }
                .slick-prev.slick-disabled,
                .slick-next.slick-disabled {
                    display: ${currentSlide === 5 ? 'none' : 'block'} !important;
                }
            `}</style>
        </div>
    );
}

export default Call_gamePage;
