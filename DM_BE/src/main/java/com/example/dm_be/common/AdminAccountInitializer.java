package com.example.dm_be.common;

import com.example.dm_be.constant.Role;
import com.example.dm_be.domain.Member;
import com.example.dm_be.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AdminAccountInitializer {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void init(){
        // 관리자 계정이 이미 있는지 확인
        if (!memberRepository.existsByUserId("admin")) {
            // 관리자 계정 생성
            Member admin = Member.builder()
                    .userId("admin")
                    .userPw(passwordEncoder.encode("qwer123")) // 실제로는 비밀번호를 암호화하여 저장해야 합니다.
                    .userName("Admin")
                    .userPhone("000-0000-0000")
                    .userAddress("Admin")
                    .role(Role.ROLE_ADMIN)
                    .build();

            memberRepository.save(admin);
            log.info("관리자 계정 생성 완료");

        } else {
            log.info("관리자 계정 이미 존재");
        }
    }
}
