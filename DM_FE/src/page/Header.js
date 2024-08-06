import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import '../css/Header.css';

function Header() {
  const { userInfo, fetchUserInfo } = useUser();
  const navigate = useNavigate();

  const handleMyPageClick = async () => {
    if (!userInfo) {
      await fetchUserInfo();
    }

    if (userInfo?.userRole === 'ROLE_PROTECTOR') {
      navigate('/center');
    } else {
      navigate('/mypage');
    }
  };

  return (
    <div className='header'>
    <div className='logo'>
      <Link to='/'>Drawing Memory</Link>
    </div>
    <div className='user'>
      <ul>
        <li>
          <button onClick={handleMyPageClick}>마이페이지</button>
        </li>
        <li>
          <Link to='/login'>로그인</Link>
        </li>
      </ul>
    </div>
  </div>
  
  );
}

export default Header;
