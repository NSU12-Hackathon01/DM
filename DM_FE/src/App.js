import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './page/MainPage.js';
import Login from './page/Login.js';
import Header from './page/Header.js';
import Mypage from './page/Mypage.js';
import Num_gamePage from './page/Num_gamePage.js';
import Draw_gamePage from './page/Draw_gamePage.js';
import Remember_gamePage from './page/Remember_gamePage.js';
import Check from './page/Check.js';
import VideoGamePage from './page/VideoGamePage.js';
import Join from './page/Join.js';
import Center from './page/Center.js';
import './index.css'; 
import FindGamePage from './page/FindGamePage.js';
import DailyBottom from './daily/bottom/DailyBottom.js';
import DailyMiddle from './daily/middle/DailyMiddle.js';
import DailyTop from './daily/top/DailyTop.js';
import Test from './test/Test.js';
import Call_gamePage from './page/Call_gamePage.js';
import { UserProvider } from './UserContext'; 

function App() {
  return (
    <UserProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/num_gamePage" element={<Num_gamePage />} />
          <Route path="/draw_gamePage" element={<Draw_gamePage />} />
          <Route path="/remember_gamePage" element={<Remember_gamePage />} />
          <Route path="/check" element={<Check />} />
          <Route path="/VideoGamePage" element={<VideoGamePage />} />
          <Route path="/JoinPage" element={<Join />} />
          <Route path="/Center" element={<Center />} />
          <Route path="/findgamepage" element={<FindGamePage />} />
          <Route path="/dailybottom" element={<DailyBottom />} />
          <Route path="/dailymiddle" element={<DailyMiddle />} />
          <Route path="/dailytop" element={<DailyTop />} />
          <Route path="/test" element={<Test />} />
          <Route path="/call-gamePage" element={<Call_gamePage />} />
          <Route path="/patient/:userId" element={<Mypage />} /> {/* 수정된 부분 */}
        </Routes>
    </UserProvider>
  );
}

export default App;
