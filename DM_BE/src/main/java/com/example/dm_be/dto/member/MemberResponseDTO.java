package com.example.dm_be.dto.member;

import com.example.dm_be.constant.Level;
import com.example.dm_be.constant.Role;
import com.example.dm_be.domain.Member;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberResponseDTO {

    private Long memberId;

    // 사용자 아이디
    private String userId;

    // 사용자 이름
    private String userName;

    // 사용자 폰번호
    private String userPhone;

    // 사용자 주소
    private String userAddress;

    // 사용자 특이사항(알레르기 라던지)
    private String significant;

    // 사용자 현재 난이도 ( 0~9까지 존재, 3미만 (LOW), 3~6 (MIDIUM), 7~9(HIGH) )
    private Level userLevel;

    // 사용자 개인 코드
    private String code;

    // 사용자 전체 출석률 (소수점 한자리까지만)
    private double allAttendance;

    // 사진 주소
    private String file;

    // 사용자 가입날짜
    private String registerDate;

    // 사용자 권한
    private Role userRole;

    // 사용자 난이도
    private String difficulty;

    public MemberResponseDTO(Long memberId, String userId, String userName, String userPhone, String userAddress,
                             String significant, Level userLevel, String code,
                             double allAttendance, String file, String registerDate, Role userRole, Level difficulty) {

        this.memberId = memberId;
        this.userId = userId;
        this.userName = userName;
        this.userPhone = userPhone;
        this.userAddress = userAddress;
        this.significant = significant;
        this.userLevel = userLevel;
        this.code = code;
        this.allAttendance = allAttendance;
        this.file = file;
        this.registerDate = registerDate;
        this.userRole = userRole;

        if (difficulty.equals(Level.LOW)) this.difficulty = "LOW";
        if (difficulty.equals(Level.MEDIUM)) this.difficulty = "MEDIUM";
        if (difficulty.equals(Level.HIGH)) this.difficulty = "HIGH";
        if (difficulty.equals(Level.NONE)) this.difficulty = "NONE";

    }

    public static MemberResponseDTO of(Member member){
        return new MemberResponseDTO(member.getMemberId(), member.getUserId(),
                member.getUserName(), member.getUserPhone(), member.getUserAddress(),
                member.getSignificant(), member.getUserLevel(), member.getCode(),
                member.getAllAttendance(), member.getFile(), member.getRegisterDate()
                , member.getRole(), member.getDifficulty());
    }
}
