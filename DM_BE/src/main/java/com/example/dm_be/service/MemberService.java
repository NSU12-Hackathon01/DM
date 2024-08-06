package com.example.dm_be.service;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.domain.AttendanceGame;
import com.example.dm_be.dto.AttendanceTotalDTO;
import com.example.dm_be.dto.game.TodayAttendanceInfoDTO;
import com.example.dm_be.dto.member.*;
import com.example.dm_be.dto.game.PreTestDTO;
import com.example.dm_be.constant.Level;
import com.example.dm_be.constant.Role;
import com.example.dm_be.domain.Member;
import com.example.dm_be.domain.RefreshToken;
import com.example.dm_be.common.exception.CustomException;
import com.example.dm_be.jwt.TokenProvider;
import com.example.dm_be.repository.AttendanceGameRepository;
import com.example.dm_be.repository.MemberRepository;
import com.example.dm_be.repository.RefreshTokenRepository;
import com.example.dm_be.util.SecurityUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class MemberService {

    // 레포지토리 불러오기
    private MemberRepository memberRepository;
    private RefreshTokenRepository refreshTokenRepository;
    private AttendanceGameRepository gameRepository;

    // 비밀번호 암호화 및 복호화
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private TokenProvider tokenProvider;



    // 회원가입 서비스 로직
    public void register(MemberRegisterDTO userDTO){

        log.info("Servie 호출됨 userId : " + userDTO.getUserId());

        Optional<Member> byUserId = memberRepository.findByUserId(userDTO.getUserId());

        // 중복검증
        if (byUserId.isPresent()){
            log.info("아이디 값 중복");
            throw new CustomException(ErrorCode.DUPLICATE_USERID);
        }

        log.info("빌더 사용해서 Entity에 값 넣기");
        // 빌더 사용해서 Entity 기입
        Member member = Member.builder()
                .userId(userDTO.getUserId())
                .userPw(bCryptPasswordEncoder.encode(userDTO.getUserPw()))
                .userName(userDTO.getUserName())
                .userPhone(userDTO.getUserPhone())
                .userAddress(userDTO.getUserAddress())
                .code("코드 고유번호 넣기")
                .allAttendance(userDTO.getAllAttendance())
                .file("userDTO.getFile() 파일 주소 올리고, 넣기")
                .significant(userDTO.getSignificant())
                .role(Role.ROLE_USER)
                .build();

        log.info("빌드 성공");
        memberRepository.save(member);

    }

    // 멤버 pk값으로
    // 유저정보 찾기
    public MemberResponseDTO findMemberInfoById(Long memberId){
        return memberRepository.findById(memberId)
                .map(MemberResponseDTO::of)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));
    }

    // 사용자 아이디로 유저정보 찾기
    public MemberResponseDTO findMemberInfoByUserId(String userId){
        return memberRepository.findByUserId(userId)
                .map(MemberResponseDTO::of)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));
    }

    // 초기 테스트 난이도 저장
    public Level savePreTest(Long memberId, PreTestDTO preTestDTO){
        Optional<Member> byId = memberRepository.findById(memberId);

        if (byId.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUNDED_USER);
        } else {
            Member member = byId.get();
            log.info("찾은 Member의 userId : " + member.getUserId());

            Member build = member.toBuilder()
                    .difficulty(Level.value(preTestDTO.sumScore()))
                    .build();

            log.info("빌더 생성, 변경된 값 : " + member.getDifficulty() + " => " + build.getDifficulty());

//            Member build = member.builder()
//                    .difficulty(Level.value(preTestDTO.sumScore()))
//                    .build();

            memberRepository.save(build);

            return build.getDifficulty();
        }
    }

    // 전체 출석률 조회
    public AttendanceTotalDTO getTotalAttendance(Long memberId){
        Optional<Member> byId = memberRepository.findById(memberId);
        log.info("유저정보 memberId => " + memberId);

        if (byId.isEmpty()){
            log.info("유저정보가 없는 memberId : " + memberId);
            throw new CustomException(ErrorCode.NOT_FOUNDED_USER);
        } else{

            Member member = byId.get();

            return new AttendanceTotalDTO(member.getRegisterDate(), member.getAllAttendance());
        }
    }

    // 사용자 정보 수정
    public void updateMember(Long memberId, MemberUpdateDTO memberUpdateDTO){
        Optional<Member> byId = memberRepository.findById(memberId);

        log.info("유저정보 memberId => " + memberId);

        if (byId.isEmpty()){
            log.info("유저정보가 없는 memberId : " + memberId);
            throw new CustomException(ErrorCode.NOT_FOUNDED_USER);
        } else {

            Member member = byId.get();

            Member build = member.toBuilder()
                    .userPw(bCryptPasswordEncoder.encode(memberUpdateDTO.getUserPw()))
                    .userName(memberUpdateDTO.getUserName())
                    .userPhone(memberUpdateDTO.getUserPhone())
                    .userAddress(memberUpdateDTO.getUserAddress())
                    .significant(memberUpdateDTO.getSignificant())
                    .file(memberUpdateDTO.getFile())
                    .build();

            memberRepository.save(build);
        }
    }

    // 사용자 삭제
    @Transactional
    public void deleteMember(HttpServletRequest request){

        // AccessToken과 RefreshToken을 헤더에서 가져와서 "Bearer " 부분 제거
        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        String refreshToken = request.getHeader("Refresh-Token").replace("Bearer ", "");

        Long currentMemberId = SecurityUtil.getCurrentMemberId();

        Optional<Member> byId = memberRepository.findById(currentMemberId);

        if (byId.isEmpty()){
            log.info("유저정보가 없는 memberId : " + currentMemberId);
            throw new CustomException(ErrorCode.NOT_FOUNDED_USER);
        }

        Authentication authentication = tokenProvider.getAuthentication(accessToken);
        Optional<RefreshToken> byKey = refreshTokenRepository.findByKey(authentication.getName());


        log.info("memberId => " + currentMemberId);
//        log.info("RefreshToken => " + refreshToken);
//        log.info("AccessToken => " + request.getHeader("Authorization"));s

        if (byKey.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUNDED_USER);
        }

        if (!refreshToken.equals(byKey.get().getValue())){
            throw new RuntimeException("로그아웃 된 사용자입니다.");
        }

        refreshTokenRepository.delete(byKey.get());
        memberRepository.delete(byId.get());

    }

    // 개인 고유 코드 조회
    public QrResponseDTO getQrcode(Long memberId){

        Optional<Member> byId = memberRepository.findById(memberId);

        if (byId.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUNDED_USER);
        }

        String code = byId.get().getCode();
        if (code.isEmpty()){
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
        log.info("==개인 코드 : " + code + "==");

        return new QrResponseDTO(byId.get().getUserId(), code);
    }

    // 개인 출석 리스트 조회
    public List<TodayAttendanceInfoDTO> attendances(Long memberId) {

        log.info("사용자 조회 : " + memberId);
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        List<AttendanceGame> byMember = gameRepository.findByMember(member);
        log.info("출석횟수 : " + byMember.size());

        List<TodayAttendanceInfoDTO> list = byMember.stream()
                .map(TodayAttendanceInfoDTO::new)
                .toList();

        return new ArrayList<>(list);
    }

    // 추가 정보 기입
    public void addInfo(Long memberId, AddInfoDTO addInfoDTO){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));
        Role role = member.checkRole(addInfoDTO.getRole());

        if (addInfoDTO.getRole().equals("PROTECTOR") && addInfoDTO.getCode().isEmpty()) throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);

        member.toBuilder()
                .significant(addInfoDTO.getSignificant())
                .role(role);

        if (addInfoDTO.getCode().length() > 3){
            Member user = memberRepository.findByCode(addInfoDTO.getCode()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

            member.getWards().add(user);

            user.setProtector(member);
            memberRepository.save(user);
            memberRepository.save(member);
        } else {

            memberRepository.save(member);
        }
    }

    // 보호자인지 확인
    public List<Long> checkProtector(Long protectorId){
        Member member = memberRepository.findById(protectorId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        if (member.getRole().equals(Role.ROLE_PROTECTOR)){

            List<Long> ids = new ArrayList<>();

            List<Member> wards = member.getWards();

            for (Member user : wards){
                ids.add(user.getMemberId());
            }

            return ids;
        }

        throw new CustomException(ErrorCode.NOT_MATCH_ROLE);
    }

}
