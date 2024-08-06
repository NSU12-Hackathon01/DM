package com.example.dm_be.dto.member;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter
public class MemberRegisterDTO {

    // 사용자 아이디
    private String userId;

    // 사용자 비밀번호
    private String userPw;

    // 사용자 이름
    private String userName;

    // 사용자 폰번호
    private String userPhone;

    // 사용자 주소
    private String userAddress;

    // 사용자 현재 난이도
    private int userLevel;

    // 사용자 개인 코드
    private String code;

    // 사용자 전체 출석률
    private int allAttendance;

    // 사진 주소
    private String file;

    // 사용자 특이사항(알레르기 라던지)
    private String significant;

    // 사용자 가입날짜
    private String registerDate;

    // 사용자 초기 난이도
    private String difficulty;
}
