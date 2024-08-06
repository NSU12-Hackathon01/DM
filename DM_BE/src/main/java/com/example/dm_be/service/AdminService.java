package com.example.dm_be.service;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.common.exception.CustomException;
import com.example.dm_be.constant.Role;
import com.example.dm_be.domain.Member;
import com.example.dm_be.dto.admin.UpdateProtectorDTO;
import com.example.dm_be.dto.member.MemberResponseDTO;
import com.example.dm_be.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {

    private final MemberRepository memberRepository;

    // 관리자: 사용자 계정 삭제
    public void deleteUser(Long adminId, Long memberId){

        // 관리자 확인
        checkAdmin(adminId);

        log.info("memberId => " + memberId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        memberRepository.delete(member);
    }
    
    // 관리자: 사용자 목록 조회
    public List<MemberResponseDTO> adminUserList(Long adminId){

        // 관리자 확인
        checkAdmin(adminId);

        return memberRepository.findAll().stream()
                .map(MemberResponseDTO::of)
                .toList();
    }

    // 관리자: 보호자와 연관 되어있는 사용자 리스트 조회
    public List<MemberResponseDTO> adminProtectList(Long adminId, Long protectorId){

        return memberRepository.findByProtector_MemberId(protectorId)
                .orElse(Collections.emptyList())
                .stream()
                .map(MemberResponseDTO::of)
                .toList();
    }

    // 관리자: 사용자 세부 조회
    public MemberResponseDTO adminUserDetail(Long adminId, Long memberId){

        // 관리자 확인
        checkAdmin(adminId);

        return memberRepository.findById(memberId)
                .stream()
                .map(MemberResponseDTO::of)
                .findFirst()
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

    }

    // 관리자: 보호자에 사용자 추가
    public void adminAddProtector(Long adminId, UpdateProtectorDTO updateProtectorDTO){

        checkAdmin(adminId);

        Optional<Member> byUserId = memberRepository.findByUserId(updateProtectorDTO.getUserId());
        Member user = byUserId.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        if (!user.getRole().equals(Role.ROLE_USER)){
            throw new CustomException(ErrorCode.NOT_MATCH_ROLE);
        }

        Optional<Member> byId = memberRepository.findById(updateProtectorDTO.getProtectorId());
        Member protector = byId.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        if (!protector.getRole().equals(Role.ROLE_PROTECTOR)){
            throw new CustomException(ErrorCode.NOT_MATCH_ROLE);
        }

        protector.getWards().add(user);

        user.setProtector(protector);
        memberRepository.save(user);
        memberRepository.save(protector);
    }

    // 관리자: 보호자에 사용자 삭제
    public void adminDeleteProtector(Long adminId, UpdateProtectorDTO updateProtectorDTO){

        checkAdmin(adminId);

        Optional<Member> byProtectorId = memberRepository.findById(updateProtectorDTO.getProtectorId());
        Member protector = byProtectorId.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        Optional<Member> byId = memberRepository.findByUserId(updateProtectorDTO.getUserId());
        Member user = byId.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        // 관련된 유저 삭제
        protector.getWards().remove(user);

        // 사용자의 보호자 연관관계 제거
        user.setProtector(null);

        memberRepository.save(user);
        memberRepository.save(protector);
    }



    // === 로직 === //

    // 관리자인지 확인하는 로직
    public void checkAdmin(Long adminId){

        log.info("adminId => " + adminId);
        Member admin = memberRepository.findById(adminId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_ADMIN));

        if(!admin.getRole().equals(Role.ROLE_ADMIN)){
            throw new CustomException(ErrorCode.NOT_FOUNDED_ADMIN);
        }

    }
}
