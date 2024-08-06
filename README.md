# 중앙 해커톤

##  Team's  가가가가? 
#### 프론트엔드: |`이용주`| |`서병덕`|  
#### 백엔드: |`임채륜`| |`박정연`| |`박소현`|  
#### 디자인: |`안혜린`|
----------------------------------------

## BE USE Stack
### <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=black"/> <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=black"/> <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=black"/> <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=black"/> <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=black"/>

## ※ 기능 요구 사항 분석

## ▽ 사용자용
### ☞ 회원가입
- 기본 회원가입
> 회원가입시 마이페이지에 개인 코드부여 
> 사전 테스트 제공(문제 총 3개가 나오고 산수3, 짝 3, 광고 3 => 총 결과값 0에서 9까지 보내줄 수 있음.
> 난이도 조절 (3미만(하) 3이상 6미만(중) 7이상(상))
### ☞ 로그인
- 기본 로그인

- 카카오 로그인

### ☞ 치매진단 관련 설문 (yes or no)
- 설문지는 아래 링크를 사용 (아래 설문을 통한 점수 제공)
> <http://www.silverweb.or.kr/load.v2.asp?subPage=710>

### ☞ 메인화면 
- 전체 출석률 (막대그래프) 

- 당일 출석률 (막대그래프)
> 연속 3일 80점 이상일시 난이도 상승
> 문제 푼 점수 저장 후 보호자에게 제공
> 출석게임 총 4개 => 광고암기, 산수 필수! (전화번호 or 짝맞추기) & (따라그리기 or 틀린그림찾기)

### ☞ 마이페이지
- 개인 고유 코드 출력 (QR코드)

### ☞ 게임
- **그림 산수문제** _난이도 상 중 하에 따라 주어지는 문제 개수가 달라짐 (아래 그림을 예시로, 하 => 당근 값 맞추기, 중 => 당근, 옥수수 값 맞추기, 상 => 당근, 옥수수, 호박 값까지 맞추기)  
> ![image](https://github.com/NSU12-Hackathon01/DM_BE/assets/59529734/6cf7efdf-3bd7-4358-9d1b-9bee0b2ff890)  


- **암기** 
> 전화번호, 짝맞추기, 광고  (전부 다 시간제한: 5분)

- **그림(간단한 그림판으로 따라그리기)**


## ▽ 보호자용
### ☞ 회원가입
- 기본 회원가입
> 담당하는 사용자 개인 코드 기입

### ☞ 로그인
- 카카오 로그인
> 매칭되어 있는 사용자 없으면 기입하게, 없으면 기능 사용 X

### ☞ 마이페이지
- 담당 하는 사용자 정보 제공
> 집주소, 특이사항, 나이, 출석여부


## ※ ERD
![image](https://github.com/user-attachments/assets/a44481b6-052b-474c-943d-7341730064ff)


## ※ 요구사항 명세서
![image](https://github.com/user-attachments/assets/50ccadd1-2ade-4e2a-bac7-bc72a038f3e3)
