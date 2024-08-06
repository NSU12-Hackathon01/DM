import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import '../css/Center.css';

function Center() {
  const [userInfo, setUserInfo] = useState(null);
  const [userList, setUserList] = useState([]);
  const [cookies] = useCookies(['accessToken']);

  // 사용자 정보 및 보호자와 연결된 사용자 목록 조회 함수
  const fetchUserInfo = async () => {
    const token = cookies.accessToken;
    console.log('Access Token:', token);

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      // JWT 토큰에서 userId 추출
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);

      const userId = decodedToken.sub;
      console.log('User ID:', userId);

      if (!userId) {
        console.error('User ID not found in token');
        return;
      }

      // 사용자 정보 요청
      const userInfoResponse = await axios.get('http://localhost:8080/member/me', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      console.log('User Info:', userInfoResponse.data);
      setUserInfo(userInfoResponse.data);

      // 보호자와 연결된 사용자 목록 요청
      const userListResponse = await axios.get('http://localhost:8080/protector/users', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      console.log('User List:', userListResponse.data);
      setUserList(userListResponse.data);
    } catch (error) {
      console.error('Error fetching user info:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [cookies.accessToken]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="center">
      <div className='bar'>
        <div className='face'></div>
      </div>
      <div className='user_info'>
        <p>보호자</p>
        <h2>{userInfo.userName}님</h2>
      </div>
      <div className="center_info">
        <b>{userInfo.userName}님의 환자 리스트</b>
        <ul className="list_title">
          <li></li>
          <li>성함</li>
          <li>연령</li>
          <li>특이사항</li>
        </ul>
      </div>
      {userList.map(user => (
        <div className="list_info" key={user.userId}>
          <ul>
            <li><span className="user1"><i className="fa-solid fa-user"></i></span></li>
            <li><Link to={`/patient/${user.userId}`}>{user.userName}</Link></li>
            <li>{user.age}세</li>
            <li>{user.significant || '특이사항 없음'}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Center;
