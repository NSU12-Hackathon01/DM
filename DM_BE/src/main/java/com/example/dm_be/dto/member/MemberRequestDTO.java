package com.example.dm_be.dto.member;

import com.example.dm_be.constant.Gender;
import com.example.dm_be.constant.Role;
import com.example.dm_be.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberRequestDTO {
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
    // 사용자 특이사항(알레르기 라던지)
    private String significant;
    // 사용자 개인 코드
    private String code;
    // 사용자 역할구분
    private String role;
    // 사용자 성별
    private Gender gender;


    // 회원가입을 위한 Member 생성
    public Member toMember(BCryptPasswordEncoder passwordEncoder, String uuid){

        return Member.builder()
                .userId(userId)
                .userPw(passwordEncoder.encode(userPw))
                .role(Role.ROLE_USER)
                .userName(userName)
                .userPhone(userPhone)
                .userAddress(userAddress)
                .significant(significant)
                .code(uuid)
                .gender(gender)
                .build();
    }

    // 보호자일 경우를 위한 Member생성
    public Member toProtector(BCryptPasswordEncoder passwordEncoder, String uuid){

        return Member.builder()
                .userId(userId)
                .userPw(passwordEncoder.encode(userPw))
                .role(Role.ROLE_PROTECTOR)
                .userName(userName)
                .userPhone(userPhone)
                .userAddress(userAddress)
                .code(uuid)
                .significant(null)
                .userLevel(null)
                .difficulty(null)
                .gender(gender)
                .build();
    }


}
