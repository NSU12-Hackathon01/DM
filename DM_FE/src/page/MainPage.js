import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../css/Main.css';
import '../css/Basic.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ProtectSlider from './ProtectSlider';


const MainPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [cookies] = useCookies(['accessToken']);
  const [mathScore, setMathScore] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const [adScore, setAdScore] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const fetchUserInfo = async () => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/member/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error.response ? error.response.data : error.message);
    }
  };

  const handleDailyCheck = async () => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    const preTestDTO = {
      mathScore,
      matchScore,
      adScore
    };

    try {
      await axios.post('http://localhost:8080/game/today', preTestDTO, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
      });
      alert('출석체크가 완료되었습니다!');
    } catch (error) {
      console.error('Error during daily check:', error.response ? error.response.data : error.message);
      alert('출석체크에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [cookies.accessToken]);

  return (
    <div className='wrap'>
      <div className='main'>
        <Slider {...settings}>
          <div className="fade one">
            <h3>행복한 미래를<br/> 그립니다
              <p>모두가 행복한 미래를 그려나갈 수 있도록 드로잉 메모리가 곁에서 도와드립니다</p>
            </h3>
          </div>
          <div className="fade two">
            <h3>행복한 미래를<br/> 그립니다
              <p>모두가 행복한 미래를 그려나갈 수 있도록 드로잉 메모리가 곁에서 도와드립니다</p>
            </h3>
          </div>
          <div className="fade three">
            <h3>행복한 미래를<br/> 그립니다
              <p>모두가 행복한 미래를 그려나갈 수 있도록 드로잉 메모리가 곁에서 도와드립니다</p>
            </h3>
          </div>
          <div className="fade four">
            <h3>행복한 미래를<br/> 그립니다
              <p>모두가 행복한 미래를 그려나갈 수 있도록 드로잉 메모리가 곁에서 도와드립니다</p>
            </h3>
          </div>
        </Slider>
      </div>
      <div className='gamewrap'>
        <button className='daily_check' onClick={handleDailyCheck}>출석체크</button>
        <h3>게임</h3>
        <p>간단한 게임을 통해 암기, 추론 등의 기억력과 인지 능력을 향상시킬 수 있습니다.</p>
        <ul className='game_one'>
          <li><Link to='/remember_gamePage' className='game'>
            <img src='/images/main/짝맞추기.png' className='img1' alt='짝 맞추기' />
            <br /><br /><div className='game_font'>짝 맞추기</div></Link>
          </li>
          <li><Link to='/num_gamePage' className='game'>
            <img src='/images/main/산수.png' className='img2' alt='산수' />
            <br /><br /><div className='game_font'>산수</div></Link>
          </li>
          <li><Link to='/draw_gamePage' className='game'>
            <img src='/images/main/제시어 그림그리기.png' alt='제시어 그림 그리기' />
            <br /><br /><div className='game_font'>제시어 그림 그리기</div></Link>
          </li>
        </ul>
        <ul className='game_se'>
          <li><Link to='/call-gamePage' className='game'>
            <img src='/images/main/전화번호 맞추기.png' alt='전화번호 맞추기' />
            <br /><br /><div className='game_font'>전화번호 맞추기</div></Link>
          </li>
          <li><Link to='/findgamepage' className='game'>
            <img src='/images/main/틀린그림.png' className='img3' alt='틀린 그림' />
            <br /><br /><div className='game_font'>틀린 그림</div></Link>
          </li>
          <li><Link to='/VideoGamePage' className='game'>
            <img src='/images/main/광고.png' alt='광고 맞추기' />
            <br /><br /><div className='game_font'>광고 맞추기</div></Link>
          </li>
        </ul>
      </div>
      <div className='protect'>
        <ProtectSlider />
      </div>
      <div className='address'>
        <ul>
          <h2>비상 연락망</h2>
          <li><span>동남구 보건소</span>041-521-2665</li>
          <li><span>서북구 보건소</span>1422-36</li>
          <li><span>성환읍 보건지소</span>041-521-2571</li>
        </ul>
        <ul>
          <h2>기관 연락망</h2>
          <li><span>치매상담 콜센터</span>1899-9988</li>
          <li><span>중앙 치매 센터</span>1666-0921</li>
          <li><span>노인보호전문기관</span>1577-1389</li>
        </ul>
      </div>
      <Link to='/check'><button className='checkMain_btn'>치매 설문지</button></Link>
      <div className='banner1'>
        병원배너1
      </div>
      <footer>
        <div className='footer-in'>
          <ul>
            <li>
              <div className='left-footer'>
                <div>
                  <span>상호명: 드로잉 메모리</span>
                  <span>대표 이사: 멋사자</span>
                  <span>사업자 등록번호: 123-45-67890</span>
                  <span>주소: 서울특별시 기억구 추억대로 123, 5층</span>
                  <br />
                  <span>전화번호: 02-1234-5678</span>
                  <span>이메일: support@memory.com</span>
                </div>
                <div>
                  <p>드로잉 메모리는 치매 예방을 위한 다양한 게임 서비스를 제공하는 플랫폼입니다.</p>
                  <p>저희는 당신에게 게임을 통해 치매를 예방하고, 건강한 뇌를 유지하는 데 도움을 드리고자 노력합니다.</p>
                </div>
              </div>
            </li>
            <li>
              <div className='right-footer'>
                <div>
                  <h2>고객지원</h2>
                  <p>운영 시간: 월요일 ~ 금요일, 오전 9시 ~ 오후 6시</p>
                  <p>고객센터: 080-1234-4567</p>
                </div>
                <div>
                  <h2>파트너 및 제휴 문의</h2>
                  <p>partner@memory.com</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
