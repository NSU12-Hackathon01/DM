import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import { useCookies } from 'react-cookie'; // 쿠키 훅 추가
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({ userId: '', userPw: '' });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']); // 쿠키 훅 추가
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://3.36.19.167:8080/auth/login', credentials, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true // 쿠키를 자동으로 전송 및 수신
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setCookie('accessToken', response.data.accessToken);
        alert("로그인 성공");
        navigate('/');
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleLogout = () => {
    removeCookie('accessToken', { path: '/' });
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  return (
    <div>
      <div className='left_img'></div>
      <div className='right_login'>
        <h3>환영합니다</h3>
        <p>드로잉 메모리와 함께 미래를 그려보세요</p>
        {!isLoggedIn ? (
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="userId" 
              className='id' 
              placeholder='아이디 입력' 
              value={credentials.userId} 
              onChange={handleChange} 
            />
            <br />
            <input 
              type="password" 
              name="userPw" 
              className='pw' 
              placeholder='비밀번호 입력' 
              value={credentials.userPw} 
              onChange={handleChange} 
            />
            <br />
            <button type="submit" className='login'>로그인</button>
          </form>
        ) : (
          <>
            <button onClick={handleLogout} className='logout'>로그아웃</button>
            {userData && <div className='user-data'>{JSON.stringify(userData)}</div>}
          </>
        )}
        {error && <p className='error'>{error}</p>}
        <br />
        <div className='bo'>
          <div className='start'><Link to='/JoinPage'>회원가입</Link></div>
          <div className='find'>아이디 찾기 | 비밀번호 찾기</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
