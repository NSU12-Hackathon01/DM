import React, { useState } from 'react';
import '../css/check.css';

function Check() {
  const [memoryAnswers, setMemoryAnswers] = useState(Array(14).fill(null));
  const [recallAnswers, setRecallAnswers] = useState(Array(7).fill(null));
  const [spatialAnswers, setSpatialAnswers] = useState(Array(9).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [allAnswered, setAllAnswered] = useState(true);

  const memoryQuestions = [
    "1. 전화번호나 사람 이름을 기억하기 힘들다.",
    "2. 어떤 일이 언제 일어났는지 기억하지 못할 때가 있다.",
    "3. 며칠 전에 들었던 이야기를 기억하지 못한다.",
    "4. 오래 전에 들었던 이야기를 기억하지 못한다.",
    "5. 일상생활에 변화가 생겼을 때 금방 적응하기가 힘들다.",
    "6. 중요한 일을 잊을 때가 있다.",
    "7. 다른 사람에게 같은 이야기를 반복할 때가 있다.",
    "8. 어떤 일을 해놓고도 잊어버려서 다시 반복한 적이 있다.",
    "9. 약 먹는 시간을 놓치기도 한다.",
    "10. 여러 가지 물건을 사러 갔다가 한두 가지를 빠뜨리기도 한다.",
    "11. 가스 불 끄는 것을 잊거나 음식을 태운 일이 있다.",
    "12. 남에게 같은 질문을 반복한다.",
    "13. 어떤 일을 해놓고도 했는지 안 했는지 다시 확인해야 한다.",
    "14. 물건을 두고 다니거나 또는 가지고 갈 물건을 놓고 간다."
  ];

  const recallQuestions = [
    "1. 하고 싶은 말이나 표현이 금방 떠오르지 않는다.",
    "2. 물건 이름이 금방 생각나지 않는다.",
    "3. 개인적인 편지나 사무적인 편지를 쓰지 힘들다.",
    "4. 갈수록 말수가 감소되는 경향이 있다.",
    "5. 신문이나 잡지를 읽을 때 이야기 줄거리를 파악하지 못한다.",
    "6. 책을 읽을 때 같은 문장을 여러 번 읽어야 이해가 간다.",
    "7. TV에 나오는 이야기를 따라가기가 힘들다."
  ];

  const spatialQuestions = [
    "1. 자주 보는 친구나 친척을 바로 알아보지 못한다.",
    "2. 물건을 어디에 두었는지 몰라서 찾게 된다.",
    "3. 전에 가본 장소를 기억하지 못한다.",
    "4. 방향 감각이 떨어졌다.",
    "5. 길을 잃거나 헤맨 적이 있다.",
    "6. 물건을 항상 두는 장소를 잊어버리고 엉뚱한 곳에서 찾는다.",
    "7. 계산 능력이 떨어졌다.",
    "8. 돈 관리를 하는데 실수가 있다.",
    "9. 과거에 편안히 쓰던 기구 사용이 서툴러졌다."
  ];

  const handleOptionChange = (index, answer, setAnswers, answers) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const calculateScore = (answers) => answers.reduce((acc, ans) => (ans === 'yes' ? acc + 1 : acc), 0);

  const memoryScore = calculateScore(memoryAnswers);
  const recallScore = calculateScore(recallAnswers);
  const spatialScore = calculateScore(spatialAnswers);

  const totalScore = memoryScore + recallScore + spatialScore;

  const handleSubmit = () => {
    if (memoryAnswers.every(answer => answer !== null) &&
        recallAnswers.every(answer => answer !== null) &&
        spatialAnswers.every(answer => answer !== null)) {
      setAllAnswered(true);
      setSubmitted(true);
    } else {
      setAllAnswered(false);
      setSubmitted(false);
    }
  };

  return (
    <div className='check'>
      <h2>치매설문 페이지</h2>
      <p>인지능력 테스트를 위한 설문지 입니다.</p>

      <div className='check_title'>
        <span>A</span><b>기억력</b> 평소 기억력을 알기 위한 문항입니다. 천천히 읽고 예, 아니오에 체크해주세요.
      </div>
      <div className='check_wrap'>
        <h4>문항</h4>
        <div className='yn'>
          <h4>예</h4>
          <h4>아니오</h4>
        </div>
        <div className='questionnaire'>
          {memoryQuestions.map((question, index) => (
            <div key={index} className='question'>
              <p>{question}</p>
              <label className={`custom-radio ${memoryAnswers[index] === 'yes' ? 'selected' : ''}`}>
                <input
                  type='radio'
                  name={`memoryQuestion${index}`}
                  value='yes'
                  checked={memoryAnswers[index] === 'yes'}
                  onChange={() => handleOptionChange(index, 'yes', setMemoryAnswers, memoryAnswers)}
                />
                <span className='radio-button'></span>
              </label>
              <label className={`custom-radio ${memoryAnswers[index] === 'no' ? 'selected' : ''}`}>
                <input
                  type='radio'
                  name={`memoryQuestion${index}`}
                  value='no'
                  checked={memoryAnswers[index] === 'no'}
                  onChange={() => handleOptionChange(index, 'no', setMemoryAnswers, memoryAnswers)}
                />
                <span className='radio-button'></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className='check_title yn2'>
        <span>B</span><b>언어력</b> 평소 언어력을 알기 위한 문항입니다. 천천히 읽고 예, 아니오에 체크해주세요.
      </div>
      <div className='check_wrap yn2'>
        <h4>문항</h4>
        <div className='yn'>
          <h4>예</h4>
          <h4>아니오</h4>
        </div>
        <div className='questionnaire'>
          {recallQuestions.map((question, index) => (
            <div key={index} className='question qu2'>
              <p>{question}</p>
              <label className={`custom-radio ${recallAnswers[index] === 'yes' ? 'selected' : ''}`}>
                <input
                  type='radio'
                  name={`recallQuestion${index}`}
                  value='yes'
                  checked={recallAnswers[index] === 'yes'}
                  onChange={() => handleOptionChange(index, 'yes', setRecallAnswers, recallAnswers)}
                />
                <span className='radio-button'></span>
              </label>
              <label className={`custom-radio ${recallAnswers[index] === 'no' ? 'selected' : ''}`}>
                <input
                  type='radio'
                  name={`recallQuestion${index}`}
                  value='no'
                  checked={recallAnswers[index] === 'no'}
                  onChange={() => handleOptionChange(index, 'no', setRecallAnswers, recallAnswers)}
                />
                <span className='radio-button'></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className='check_title yn3'>
        <span>C</span><b>시/공간능력</b> 평소 시/공간 능력을 알기 위한 문항입니다. 천천히 읽고 예, 아니오에 체크해주세요.
      </div>
      <div className='check_wrap yn3'>
        <h4>문항</h4>
        <div className='yn'>
          <h4>예</h4>
          <h4>아니오</h4>
        </div>
        <div className='questionnaire'>
          {spatialQuestions.map((question, index) => (
            <div key={index} className='question qu3'>
              <p>{question}</p>
              <label className={`custom-radio ${spatialAnswers[index] === 'yes' ? 'selected' : ''}`}>
                <input
                  type='radio'
                  name={`spatialQuestion${index}`}
                  value='yes'
                  checked={spatialAnswers[index] === 'yes'}
                  onChange={() => handleOptionChange(index, 'yes', setSpatialAnswers, spatialAnswers)}
                />
                <span className='radio-button'></span>
              </label>
              <label className={`custom-radio ${spatialAnswers[index] === 'no' ? 'selected' : ''}`}>
                <input
                  type='radio'
                  name={`spatialQuestion${index}`}
                  value='no'
                  checked={spatialAnswers[index] === 'no'}
                  onChange={() => handleOptionChange(index, 'no', setSpatialAnswers, spatialAnswers)}
                />
                <span className='radio-button'></span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <button className='check_btn' onClick={handleSubmit}>검사 결과 보기</button>
      {!allAnswered && (
        <div className='score'>
          <p>모든 문항에 답해주세요.</p>  
        </div>
      )}
      {submitted && allAnswered && (
        <div className='score'>
          <h3>당신의 점수는 {totalScore}점 입니다.</h3>
          <p>{totalScore >= 20 ? <img src='/images/check/치매-상.png' className='check-img'/> : totalScore >= 15 ? <img src='/images/check/치매-중.png'  className='check-img'/> : <img src='/images/check/치매-하.png'  className='check-img'/>}</p>
        </div>
      )}
    </div>
  );
}

export default Check;
