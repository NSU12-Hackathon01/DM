import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [cookies] = useCookies(['accessToken']);

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

  useEffect(() => {
    fetchUserInfo();
  }, [cookies.accessToken]);

  return (
    <UserContext.Provider value={{ userInfo, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
    