import './BNum_game.css';
import React, { useState } from 'react';

function BNum_game({ updateResult }) {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');

  const [borderColor1, setBorderColor1] = useState(''); 
  const [borderColor2, setBorderColor2] = useState(''); 
  const [borderColor3, setBorderColor3] = useState(''); 
  const [borderColor4, setBorderColor4] = useState(''); 

  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };

  const handleInputChange3 = (e) => {
    setInputValue3(e.target.value);
  };

  const handleInputChange4 = (e) => {
    setInputValue4(e.target.value);
  };

  const handleSubmit = () => {
    let plus1 = 0;
    let plus2 = 0;
    let plus3 = 0;
    let plus4 = 0;

    // 정답 비교 및 테두리 색상 설정
    if (inputValue1 === '10') {
      plus1 = 20;
      setBorderColor1('green'); 
    } else {
      setBorderColor1('red'); 
    }

    if (inputValue2 === '3') {
      plus2 = 20;
      setBorderColor2('green'); 
    } else {
      setBorderColor2('red'); 
    }

    if (inputValue3 === '7') {
      plus3 = 20;
      setBorderColor3('green'); 
    } else {
      setBorderColor3('red'); 
    }

    if (inputValue4 === '9') {
      plus4 = 20;
      setBorderColor4('green'); 
    } else {
      setBorderColor4('red'); 
    }

    // 총합 계산
    const sum = plus1 + plus2 + plus3 + plus4;

    // 부모 컴포넌트로 점수 전달
    updateResult(sum);
  };

  return (
    <div className="BNumgame">
      <div className='Btest'>
        <ul>
          <li>
            <img src='/images/과일 산수 문제/8.jpg' alt='문제 1' />
          </li>
          <li>
            <img src='/images/과일 산수 문제/7.jpg' alt='문제 2' />
          </li>
          <li>
            <img src='/images/과일 산수 문제/6.jpg' alt='문제 3' />
          </li>
          <li>
            <img src='/images/과일 산수 문제/1.jpg' alt='문제 4' />
          </li>
          <li className='num_result'>
            <span>
              <img src='/images/과일 산수 문제/사과답-.jpg' alt='당근 답' />
              <input
                type='text'
                value={inputValue1}
                onChange={handleInputChange1}
                style={{ borderColor: borderColor1, borderWidth: '5px', borderStyle: 'solid' }}
              />
            </span>
            <span>
              <img src='/images/과일 산수 문제/레몬답-.jpg' alt='사과 답' />
              <input
                type='text'
                value={inputValue2}
                onChange={handleInputChange2}
                style={{ borderColor: borderColor2, borderWidth: '5px', borderStyle: 'solid' }}
              />
            </span>
            <span>
              <img src='/images/과일 산수 문제/대파답-.jpg' alt='포도 답' />
              <input
                type='text'
                value={inputValue3}
                onChange={handleInputChange3}
                style={{ borderColor: borderColor3, borderWidth: '5px', borderStyle: 'solid' }}
              />
            </span>
            <span>
              <img src='/images/과일 산수 문제/당근답-.jpg' alt='포도 답' />
              <input
                type='text'
                value={inputValue4}
                onChange={handleInputChange4}
                style={{ borderColor: borderColor4, borderWidth: '5px', borderStyle: 'solid' }}
              />
            </span>
          </li>
          <li>
          <button className='bottom_btn' onClick={handleSubmit}>채점하기</button>

          </li>
        </ul>
      </div>
    </div>
  );
}

export default BNum_game;
