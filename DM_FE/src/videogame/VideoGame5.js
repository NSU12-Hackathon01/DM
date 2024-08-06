import React, { useState, useRef } from "react";
import '../videogame/VideoGame.css'

function VideoGame5({ onScoreUpdate }) {
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const iframeRef = useRef(null);

  const handleButtonClick = (isCorrect) => {
    const newScore = isCorrect ? 20 : 0;
    setScore(newScore);
    setResult(isCorrect ? "정답입니다!" : "오답입니다!");
    setButtonsDisabled(true);

    
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const src = iframe.src;
      iframe.src = ''; 
      iframe.src = src; 
    }

    if (onScoreUpdate) {
      onScoreUpdate(newScore);
    }
  };

  return ( 
    <div className="video_wrap">
      <h2>노인학대신고 전화번호 중 알맞은 것은?</h2>
      <iframe 
        className='vi' 
        src="https://www.youtube.com/embed/AEl5mLb_07w" 
        title="치매, 예방 할 수 있습니다!" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        ref={iframeRef}
      ></iframe>
      <br/>
      <button onClick={() => handleButtonClick(false)} disabled={buttonsDisabled}>1577-1388</button>
      <button onClick={() => handleButtonClick(false)} disabled={buttonsDisabled}>1577-1387</button>
      <button onClick={() => handleButtonClick(false)} disabled={buttonsDisabled}>1577-1379</button>
      <button className="oo" onClick={() => handleButtonClick(true)} disabled={buttonsDisabled}>1577-1389</button>
      {result && (
        <div className="result-message">
          <p>{result}</p>
        </div>
      )}
      
    </div>
  );
}

export default VideoGame5;
