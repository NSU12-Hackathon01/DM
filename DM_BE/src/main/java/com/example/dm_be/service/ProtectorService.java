package com.example.dm_be.service;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.domain.AttendanceGame;
import com.example.dm_be.domain.Member;
import com.example.dm_be.dto.SignificantDTO;
import com.example.dm_be.dto.game.TodayAttendanceInfoDTO;
import com.example.dm_be.dto.member.MemberResponseDTO;
import com.example.dm_be.common.exception.CustomException;
import com.example.dm_be.repository.AttendanceGameRepository;
import com.example.dm_be.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@AllArgsConstructor
public class ProtectorService {

    // 레포지토리 불러오기
    private MemberRepository memberRepository;
    private AttendanceGameRepository gameRepository;


    // 보호자에 연관되어 있는 매핑 조회
    public List<MemberResponseDTO> getListUsers(Long protectorId){

        return memberRepository.findByProtector_MemberId(protectorId)
                .orElse(Collections.emptyList())
                .stream()
                .map(MemberResponseDTO::of)
                .toList();
    }

    // 보호자에 사용자 추가
    public void addUser(String code, Long protectorId){

        Optional<Member> byCode = memberRepository.findByCode(code);
        Member user = byCode.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        Optional<Member> byId = memberRepository.findById(protectorId);
        Member protector = byId.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        protector.getWards().add(user);

        user.setProtector(protector);
        memberRepository.save(user);
        memberRepository.save(protector);
    }

    // 보호자 연관되어 있는 사용자 삭제
    public void deleteUser(Long protectorId, Long memberId){

        Optional<Member> byProtectorId = memberRepository.findById(protectorId);
        Member protector = byProtectorId.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        Optional<Member> byId = memberRepository.findById(memberId);
        Member user = byId.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));


        // 관련된 유저 삭제
        protector.getWards().remove(user);

        // 사용자의 보호자 연관관계 제거
        user.setProtector(null);

        memberRepository.save(user);
        memberRepository.save(protector);
    }

    // 사용자의 출석일자별 점수 표시
    public List<TodayAttendanceInfoDTO> checkScore(Long protectorId, Long memberId){

        // 보호자 여부 확인
        Optional<Member> protector = memberRepository.findById(protectorId);
        Member member = protector.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        // 보호자에 딸린 사용자들 가져오기
        List<Member> wards = member.getWards();

        // 반환값들을 담아줄 리스트 생성
        List<TodayAttendanceInfoDTO> todayAttendanceInfoDTOS = new ArrayList<>();

        // 요청한 memberId인지 확인
        for (Member members : wards){

            if(Objects.equals(memberId, members.getMemberId())) {

                List<AttendanceGame> byMember = gameRepository.findByMember(members);

                List<TodayAttendanceInfoDTO> collect = byMember.stream()
                        .map(TodayAttendanceInfoDTO::new)
                        .toList();

                todayAttendanceInfoDTOS.addAll(collect);
                break;
            }
        }

        return todayAttendanceInfoDTOS;
    }

    // 보호자 사용자의 특이사항 수정
    public void updateSignificant(Long protectorId, Long memberId, SignificantDTO significantDTO){

        Member protector = memberRepository.findById(protectorId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        List<Member> wards = protector.getWards();

        Member targetMember = wards.stream()
                .filter(m -> m.equals(member))
                .findFirst()
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));


        log.info("해당 사용자 memberId => " + targetMember.getMemberId());

        targetMember.setSignificant(significantDTO.getSignificant());
        memberRepository.save(targetMember);

    }

}
