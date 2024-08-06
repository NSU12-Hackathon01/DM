import './Num_game.css';
import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Num_game7({ updateResult }) {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');

  const [test_1, setTest_1] = useState(0);
  const [test_2, setTest_2] = useState(0);
  const [test_3, setTest_3] = useState(0);
  const [test_4, setTest_4] = useState(0);

  const [borderColor1, setBorderColor1] = useState(''); 
  const [borderColor2, setBorderColor2] = useState(''); 
  const [borderColor3, setBorderColor3] = useState(''); 

  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };
  const handleInputChange3 = (e) => {
    setInputValue3(e.target.value);
  };

  const handleSubmit = () => {
    let plus1 = 0;
    let plus2 = 0;
    let plus3 = 0;

    if (inputValue1 === '3') {
      plus1 = 3;
      setBorderColor1('green'); 
    } else {
      setBorderColor1('red'); 
    }

    if (inputValue2 === '5') {
      plus2 = 7;
      setBorderColor2('green'); 
    } else {
      setBorderColor2('red'); 
    }

    if (inputValue3 === '8') {
      plus3 = 10;
      setBorderColor3('green'); 
    } else {
      setBorderColor3('red'); 
    }

    setTest_1(plus1);
    setTest_2(plus2);
    setTest_3(plus3);
    const sum = plus1 + plus2 + plus3;
    setTest_4(sum);


    updateResult(sum);
  };

  return (
    <div className="Numgame">
      <div className='test'>
        <ul>
          <li>
           <img src='/images/과일 산수 문제/7.jpg' alt='문제 1' />
          </li>
          <li>
          <img src='/images/과일 산수 문제/7-1.jpg' alt='문제 1-1' />
          </li>
          <li>
          <img src='/images/과일 산수 문제/7-2.jpg' alt='문제 1-2' />
          </li>
          <li className='num_result'>
            <span>
              <img src='/images/과일 산수 문제/레몬답-.jpg' alt='당근 답' />
              <input
                type='text'
                name='carrot'
                value={inputValue1}
                onChange={handleInputChange1}
                style={{ borderColor: borderColor1, borderWidth: '5px', borderStyle: 'solid' }}
              />
            </span>
            <span>
            <img src='/images/과일 산수 문제/포도답-.jpg' alt='레몬 답' />
              <input
                type='text'
                name='lemon'
                value={inputValue2}
                onChange={handleInputChange2}
                style={{ borderColor: borderColor2, borderWidth: '5px', borderStyle: 'solid' }}
              />
            </span>
            <span>
            <img src='/images/과일 산수 문제/사과답-.jpg' alt='딸기답' />
              <input
                type='text'
                name='apple'
                value={inputValue3}
                onChange={handleInputChange3}      
                style={{ borderColor: borderColor3, borderWidth: '5px', borderStyle: 'solid' }}
              />
            </span>
          </li>
          <li>  
            <button className='num_btn' onClick={handleSubmit}>채점하기</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Num_game7;
