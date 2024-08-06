import React, { useState, useRef } from "react";
import '../videogame/VideoGame.css'

function VideoGame({ onScoreUpdate }) {
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
      <h2>다음 광고에서 나온 참아야하는 것 중 아닌 것은?</h2>
      <iframe 
        className='vi' 
        src="https://www.youtube.com/embed/yISBaCoMCCY" 
        title="치매, 예방 할 수 있습니다!" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        ref={iframeRef}
      ></iframe>
      <br/>
      <button onClick={() => handleButtonClick(false)} disabled={buttonsDisabled}>절주</button>
      <button onClick={() => handleButtonClick(false)} disabled={buttonsDisabled}>금연</button>
      <button onClick={() => handleButtonClick(false)} disabled={buttonsDisabled}>뇌손상 예방</button>
      <button className="oo" onClick={() => handleButtonClick(true)} disabled={buttonsDisabled}>금주</button>
      {result && (
        <div className="result-message">
          <p>{result}</p>
        </div>
      )}
     
    </div>
  );
}

export default VideoGame;
