import '../css/Join.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 가져옵니다.

function Join() {
  const [formData, setFormData] = useState({
    memberType: '',
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
    birth: '',
    phone: '',
    sex: '',
    userAddress: '',
    significant: '',
    guardianInfo: '' // 보호자 추가 정보 필드
  });

  const [errors, setErrors] = useState({
    memberType: '',
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
    birth: '',
    phone: '',
    sex: '',
    userAddress: '',
    significant: '',
    guardianInfo: '' // 보호자 추가 정보 필드 오류
  });

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동을 설정합니다.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'id':
        errorMessage = /^[a-z0-9_-]{5,20}$/.test(value)
          ? ''
          : '*아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
        break;
      case 'password':
        errorMessage = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(value)
          ? ''
          : '*비밀번호: 8~16자의 영문 대/소문자, 숫자와 특수문자를 사용해야 합니다.';
        break;
      case 'confirmPassword':
        errorMessage = value === formData.password
          ? ''
          : '*비밀번호가 일치하지 않습니다.';
        break;
      case 'email':
        errorMessage = /.+@.+\..+/.test(value)
          ? ''
          : '*이메일: 올바른 이메일 주소를 입력해 주세요.';
        break;
      case 'name':
        errorMessage = /^[a-zA-Z가-힣]+$/.test(value)
          ? ''
          : '*이름: 한글, 영문 대/소문자만 사용 가능합니다.';
        break;
      case 'birth':
        errorMessage = /^\d{8}$/.test(value)
          ? ''
          : '*생년월일: 8자리 숫자를 입력해주세요.';
        break;
      case 'phone':
        errorMessage = /^01[0-9]{8,9}$/.test(value)
          ? ''
          : '*휴대전화번호: 올바른 휴대전화번호를 입력해 주세요.';
        break;
      case 'memberType':
        errorMessage = value ? '' : '*회원구분을 선택해 주세요.';
        break;
      case 'sex':
        errorMessage = value ? '' : '*성별을 선택해 주세요.';
        break;
      case 'guardianInfo':
        if (formData.memberType === '보호자') {
          errorMessage = value ? '' : '*보호자 정보를 입력해 주세요.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check if all required fields are filled
    Object.keys(formData).forEach((key) => {
      if (
        key !== 'email' &&
        (key !== 'guardianInfo' || formData.memberType === '보호자') &&
        !formData[key]
      ) {
        newErrors[key] = '*필수 항목을 입력해 주세요.';
        isValid = false;
      }
    });

    // Validate specific fields
    Object.keys(formData).forEach((key) => {
      validateInput(key, formData[key]);
      if (errors[key]) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {

        console.log(formData.memberType);
        if(formData.memberType == "보호자"){
          formData.memberType = "PROTECTOR";
        }

        console.log(formData.guardianInfo);
        
        console.log(formData.memberType);

        // 1. 새 회원 정보 등록
        const registerResponse = await axios.post('http://localhost:8080/auth/register', {
          userId: formData.id,
          userPw: formData.password,
          userName: formData.name,
          userPhone: formData.phone,
          userAddress: formData.userAddress,
          significant: formData.significant,
          code: formData.guardianInfo, // 추가된 필드
          role: formData.memberType // role 필드를 추가합니다.
        });

        const newUserId = registerResponse.data.userId; // 새 회원의 ID를 얻습니다.

        // // 2. 기존 회원의 protected_id 업데이트
        // if (formData.memberType === '보호자') {
        //   await axios.patch(`http://localhost:8080/auth/updateProtectedId/${formData.guardianInfo}`, {
        //     protectedId: newUserId,
        //   });
        // }

        console.log('Form submitted successfully:', registerResponse.data);
        alert('회원가입이 완료되었습니다. 테스트 페이지로 이동합니다.');
        navigate('/test'); // 테스트 페이지로 이동합니다.
      } catch (error) {
        console.error('There was an error submitting the form:', error);
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } else {
      console.log('폼 검증 실패');
    }
  };

  return (
    <div className='Join'>
      <div className='Join_top'>
        <h2>회원가입</h2>
        <p>드로잉 메모리의 새로운 회원을 환영합니다. 드로잉 메모리와 함께 미래를 그려보세요</p>
      </div>
      <form className='join_input' onSubmit={handleSubmit}>
        <ul className='section1'>
          <h1><font color='red'>*</font>필수입력 정보</h1>
          <p className='pd'>회원가입을 위한 필수 개인정보를 입력해주세요</p>
          <li>
            <b><font color='red'>*</font>회원구분</b>
            <div>
              <label className='la_one'>
                <input
                  type='radio'
                  name='memberType'
                  value='환자'
                  checked={formData.memberType === '환자'}
                  onChange={handleChange}
                />
                <span className="radio-label"></span> 환자
              </label>
              <label className='la_one'>
                <input
                  type='radio'
                  name='memberType'
                  value='보호자'
                  checked={formData.memberType === '보호자'}
                  onChange={handleChange}
                />
                <span className="radio-label"></span> 보호자
              </label>
            </div>
            {errors.memberType && <div className='error-message'>{errors.memberType}</div>}
          </li>
          {formData.memberType === '보호자' && (
            <li>
              <b><font color='red'>*</font>보호자 추가 정보</b>
              <input
                type='text'
                name='guardianInfo'
                className={`guardian-info base ${errors.guardianInfo ? 'error' : ''}`}
                placeholder='보호자 추가 정보를 입력하세요'
                value={formData.guardianInfo}
                onChange={handleChange}
              />
              {errors.guardianInfo && <div className='error-message'>{errors.guardianInfo}</div>}
            </li>
          )}
          <li>
            <b><font color='red'>*</font>아이디</b>
            <input
              type='text'
              name='id'
              className={`id base ${errors.id ? 'error' : ''}`}
              placeholder='아이디'
              value={formData.id}
              onChange={handleChange}
            />
            {errors.id && <div className='error-message'>{errors.id}</div>}
          </li>
          <li>
            <b><font color='red'>*</font>비밀번호</b>
            <input
              type='password'
              name='password'
              className={`pwd base ${errors.password ? 'error' : ''}`}
              placeholder='비밀번호'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className='error-message'>{errors.password}</div>}
          </li>
          <li>
            <b><font color='red'>*</font>비밀번호 확인</b>
            <input
              type='password'
              name='confirmPassword'
              className={`confirm-pwd base ${errors.confirmPassword ? 'error' : ''}`}
              placeholder='비밀번호 확인'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className='error-message'>{errors.confirmPassword}</div>}
          </li>
          <li>
            <b><font color='red'>*</font>이메일</b>
            <input
              type='text'
              name='email'
              className={`email base ${errors.email ? 'error' : ''}`}
              placeholder='이메일'
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className='error-message'>{errors.email}</div>}
          </li>
          <li>
            <b><font color='red'>*</font>이름</b>
            <input
              type='text'
              name='name'
              className={`name base ${errors.name ? 'error' : ''}`}
              placeholder='이름'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className='error-message'>{errors.name}</div>}
          </li>
          <li>
            <b><font color='red'>*</font>생년월일</b>
            <input
              type='text'
              name='birth'
              className={`birth base ${errors.birth ? 'error' : ''}`}
              placeholder='생년월일 (YYYYMMDD)'
              value={formData.birth}
              onChange={handleChange}
            />
            {errors.birth && <div className='error-message'>{errors.birth}</div>}
          </li>
          <li>
            <b><font color='red'>*</font>휴대전화번호</b>
            <input
              type='text'
              name='phone'
              className={`phone base ${errors.phone ? 'error' : ''}`}
              placeholder='휴대전화번호'
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className='error-message'>{errors.phone}</div>}
          </li>
          <li>
            <b><font color='red'>*</font>성별</b>
            <div>
              <label className='la_one'>
                <input
                  type='radio'
                  name='sex'
                  value='남'
                  checked={formData.sex === '남'}
                  onChange={handleChange}
                />
                <span className="radio-label"></span> 남
              </label>
              <label className='la_one'>
                <input
                  type='radio'
                  name='sex'
                  value='여'
                  checked={formData.sex === '여'}
                  onChange={handleChange}
                />
                <span className="radio-label"></span> 여
              </label>
            </div>
            {errors.sex && <div className='error-message'>{errors.sex}</div>}
          </li>
          <li>
            <b><font color='red'>*</font>주소</b>
            <input
              type='text'
              name='userAddress'
              className={`user-address base ${errors.userAddress ? 'error' : ''}`}
              placeholder='주소'
              value={formData.userAddress}
              onChange={handleChange}
            />
            {errors.userAddress && <div className='error-message'>{errors.userAddress}</div>}
          </li>
          <li>
            <b>중요한 내용</b>
            <input
              type='text'
              name='significant'
              className='significant base'
              placeholder='중요한 내용을 입력하세요'
              value={formData.significant}
              onChange={handleChange}
            />
          </li>
        </ul>
        <div className='join_footer'>
          <input type='submit' value='회원가입' className='submit-button' />
        </div>
      </form>
    </div>
  );
}

export default Join;
