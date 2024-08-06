package com.example.dm_be.controller;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.common.ErrorResponse;
import com.example.dm_be.dto.AttendanceTotalDTO;
import com.example.dm_be.dto.SignificantDTO;
import com.example.dm_be.dto.game.TodayAttendanceInfoDTO;
import com.example.dm_be.dto.member.AddInfoDTO;
import com.example.dm_be.dto.member.MemberResponseDTO;
import com.example.dm_be.dto.member.MemberUpdateDTO;
import com.example.dm_be.dto.member.QrResponseDTO;
import com.example.dm_be.service.MemberService;
import com.example.dm_be.util.SecurityUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    // 개인정보 조회 (accessToken 이용)
    // Response 데이터들 확인하기
    @GetMapping("/me")
    public ResponseEntity<MemberResponseDTO> findMemberInfoById(){
        return ResponseEntity.ok(memberService.findMemberInfoById(SecurityUtil.getCurrentMemberId()));
    }

    // 유저정보 아이디로 조회
    @GetMapping("/{userId}")
    public ResponseEntity<MemberResponseDTO> findMemberInfoByUserId(@PathVariable String userId){
        return ResponseEntity.ok(memberService.findMemberInfoByUserId(userId));
    }

    // 전체 출석률 (소수 한자리까지만)
    @GetMapping("/attendance/total")
    public ResponseEntity<AttendanceTotalDTO> getTotalAttendance(){
        Long currentMemberId = SecurityUtil.getCurrentMemberId();

        AttendanceTotalDTO totalAttendance = memberService.getTotalAttendance(currentMemberId);

        return ResponseEntity.ok(totalAttendance);
    }

    // 사용자 정보 수정
    @PostMapping("/update")
    public ResponseEntity<HttpStatus> updateMember(@RequestBody MemberUpdateDTO memberUpdateDTO){
        Long currentMemberId = SecurityUtil.getCurrentMemberId();

        memberService.updateMember(currentMemberId, memberUpdateDTO);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    // 사용자 계정 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<HttpStatus> deleteMember(HttpServletRequest request){

        memberService.deleteMember(request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    // 사용자 개인고유 코드 조회
    @GetMapping("/qrcode")
    public ResponseEntity<QrResponseDTO> getQrcode(@RequestHeader("Authorization") String accessToken){

        log.info("accessToken => " + accessToken);
        Long currentMemberId = SecurityUtil.getCurrentMemberId();

        log.info("memberId => " + currentMemberId);
        QrResponseDTO qrcode = memberService.getQrcode(currentMemberId);

        return ResponseEntity.ok(qrcode);
    }

    // 사용자 본인 출석 조회
    @GetMapping("/attendances")
    public ResponseEntity<List<TodayAttendanceInfoDTO>> attendances(){

        Long memberId = SecurityUtil.getCurrentMemberId();

        List<TodayAttendanceInfoDTO> attendances = memberService.attendances(memberId);

        return ResponseEntity.ok(attendances);
    }

    // 소셜 로그인 시 추가 정보 기입
    @PostMapping("/add/info")
    public ResponseEntity<?> addInfo(@RequestBody AddInfoDTO addInfoDTO){

        Long memberId = SecurityUtil.getCurrentMemberId();

        memberService.addInfo(memberId, addInfoDTO);

        return ResponseEntity.ok(ErrorCode.SUCCESS);
    }
 }
