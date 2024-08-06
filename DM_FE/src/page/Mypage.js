import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { useUser } from '../UserContext'; // Context import
import GameResult from '../FindGame/GameResult'; // GameResult 컴포넌트 import
import '../css/Mypage.css';

function Mypage() {
  const { userId } = useParams();
  const { userInfo } = useUser(); // Context에서 userInfo 가져오기
  const [attendanceInfo, setAttendanceInfo] = useState([]);
  const [gameResults, setGameResults] = useState({ scores: [], average: 0 });
  const [cookies] = useCookies(['accessToken']);

  const fetchAttendanceInfo = async () => {
    const token = cookies.accessToken;
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/member/${userId}/attendances`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      setAttendanceInfo(response.data);
    } catch (error) {
      console.error('Error fetching attendance info:', error.response ? error.response.data : error.message);
    }
  };

  const fetchGameResults = async () => {
    const token = cookies.accessToken;
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/member/${userId}/game-results`, { // 서버의 API 엔드포인트를 확인
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      const scores = response.data.scores; // 서버에서 응답받는 데이터 구조에 따라 조정
      const average = scores.reduce((a, b) => a + b, 0) / scores.length || 0;
      setGameResults({ scores, average });
    } catch (error) {
      console.error('Error fetching game results:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAttendanceInfo();
      fetchGameResults();
    }
  }, [cookies.accessToken, userId]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='bar'>
        <div className='face'></div>
      </div>
      <div className='user_info'>
        <p>{userInfo.userName}님</p>
        <h2>{userInfo.userName}님</h2>
      </div>
      <div className='user_in'>
        <h5>출석률</h5>
        <div className='daily_percent'>
          <div className='percent'>
            {userInfo.allAttendance}%
          </div>
        </div>
        <ul>
          <li>전화번호</li>
          <li>{userInfo.userPhone}</li>
        </ul>
        <ul>
          <li>보호자</li>
          <li>{userInfo.protector || '없음'}</li>
        </ul>
        <ul>
          <li>주소지</li>
          <li>{userInfo.userAddress}</li>
        </ul>
        <ul>
          <li>특이사항</li>
          <li className='user_notice'>{userInfo.significant || '없음'}</li>
        </ul>
        <ul>
          <li>개인 코드</li>
          <li>{userInfo.code}</li>
        </ul>
      </div>
      <div className='game_results'>
        <GameResult 
          scores={gameResults.scores} 
          average={gameResults.average} 
          onBackToGame={() => console.log('게임으로 돌아가기')} 
        />
      </div>
    </div>
  );
}

export default Mypage;
