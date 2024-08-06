import React, { useState, useRef } from "react";
import '../videogame/VideoGame.css'

function VideoGame4({ onScoreUpdate }) {
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const iframeRef = useRef(null);

  const handleButtonClick = (isCorrect) => {
    const newScore = isCorrect ? 20 : 0;
    setScore(newScore);
    setResult(isCorrect ? "정답입니다!" : "오답입니다!");
    setButtonsDisabled(true);

    // 비디오를 멈추는 코드
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const src = iframe.src;
      iframe.src = ''; // 비디오를 멈추기 위해 src를 비우기
      iframe.src = src; // 다시 원래의 src로 설정
    }

    // 부모 컴포넌트에 점수 전달
    if (onScoreUpdate) {
      onScoreUpdate(newScore);
    }
  };

  return ( 
    <div className="video_wrap">
      <h2>다음 광고에서 나온 서비스가 아닌 것은?</h2>
      <iframe 
        className='vi' 
        src="https://www.youtube.com/embed/YxT7zk6bGtg" 
        title="노인 의료·돌봄 통합지원 시범사업 홍보영상" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        ref={iframeRef}
      ></iframe>
      <br/>
      <button className="oo" onClick={() => handleButtonClick(true)} disabled={buttonsDisabled}>방문관광서비스</button>
      <button onClick={() => handleButtonClick(false)} disabled={buttonsDisabled}>방문의료서비스</button>
      <button onClick={() => handleButtonClick(false)} disabled={buttonsDisabled}>방문건강관리서비스</button>
      <button onClick={() => handleButtonClick(false)} disabled={buttonsDisabled}>돌봄개보수</button>
      {result && (
        <div className="result-message">
          <p>{result}</p>
        </div>
      )}
    
    </div>
  );
}

export default VideoGame4;
