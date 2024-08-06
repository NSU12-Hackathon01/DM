package com.example.dm_be.controller;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.domain.Drawings;
import com.example.dm_be.dto.QrAddDTO;
import com.example.dm_be.dto.SignificantDTO;
import com.example.dm_be.dto.game.TodayAttendanceInfoDTO;
import com.example.dm_be.dto.member.MemberResponseDTO;
import com.example.dm_be.service.DrawingsService;
import com.example.dm_be.service.MemberService;
import com.example.dm_be.service.ProtectorService;
import com.example.dm_be.util.SecurityUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/protector")
@AllArgsConstructor
public class ProtectorController {

    private ProtectorService protectorService;
    private DrawingsService drawingsService;
    private MemberService memberService;

    // 보호자와 연결되어 있는 유저들 목록 조회
    @GetMapping("/users")
    public ResponseEntity<List<MemberResponseDTO>> getList(@RequestHeader("Authorization") String accessToken){
        Long currentMemberId = SecurityUtil.getCurrentMemberId();

        List<MemberResponseDTO> listUsers = protectorService.getListUsers(currentMemberId);

        return ResponseEntity.ok(listUsers);
    }

    // 보호자에 유저 연결 추가
    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody QrAddDTO code){
        Long protectorId = SecurityUtil.getCurrentMemberId();

        String qrCode = code.getCode();
        protectorService.addUser(qrCode, protectorId);

        return ResponseEntity.ok("등록 성공");
    }

    // 보호자 유저 연결 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam Long memberId){
        Long protectorId = SecurityUtil.getCurrentMemberId();
        protectorService.deleteUser(protectorId, memberId);

        return ResponseEntity.ok("삭제 성공");
    }

    // 보호자에 연결된 사용자 출석 확인 (리스트)
    @GetMapping("/attendance/{memberId}")
    public ResponseEntity<List<TodayAttendanceInfoDTO>> getUserAttendance(@PathVariable Long memberId){

        Long protectorId = SecurityUtil.getCurrentMemberId();

        List<TodayAttendanceInfoDTO> todayAttendanceInfoDTOS = protectorService.checkScore(protectorId, memberId);

        return ResponseEntity.ok(todayAttendanceInfoDTOS);
    }

    // 보호자용 특이사항 변경
    @PutMapping("/update/significant/{memberId}")
    public ResponseEntity<ErrorCode> userAttendanceUpdate(@PathVariable Long memberId,
                                                  SignificantDTO significantDTO){

        Long protectorId = SecurityUtil.getCurrentMemberId();

        protectorService.updateSignificant(protectorId, memberId, significantDTO);

        return ResponseEntity.ok(ErrorCode.SUCCESS);
    }

    // 보호자용 사용자 그림 확인
    @GetMapping("/read/{memberId}")
    public ResponseEntity<?> readDraw(@PathVariable Long memberId){
        Long protectorId = SecurityUtil.getCurrentMemberId();

        List<Long> longs = memberService.checkProtector(protectorId);
        if (!longs.isEmpty() && longs.contains(memberId)) {

            List<Drawings> drawing = drawingsService.getDrawing(memberId);

            return ResponseEntity.ok(drawing);
        }

        return ResponseEntity.badRequest().build();

    }
}
