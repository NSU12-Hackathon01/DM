package com.example.dm_be.controller;

import com.example.dm_be.dto.game.PreTestDTO;
import com.example.dm_be.dto.game.PreTestResponseDTO;
import com.example.dm_be.constant.Level;
import com.example.dm_be.dto.game.TodayAttendanceInfoDTO;
import com.example.dm_be.service.GameService;
import com.example.dm_be.service.MemberService;
import com.example.dm_be.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {

    private final MemberService memberService;
    private final GameService gameService;

    // 사전 테스트 => 초기 난이도 설정
    @PostMapping("/pretest")
    public ResponseEntity<PreTestResponseDTO> preTest(@RequestBody PreTestDTO preTestDTO){

        Long currentMemberId = SecurityUtil.getCurrentMemberId();

        Level level = memberService.savePreTest(currentMemberId, preTestDTO);

        PreTestResponseDTO preTestResponseDTO = new PreTestResponseDTO("사전 테스트 결과 입니다.", level);

        return ResponseEntity.ok(preTestResponseDTO);
    }


    // 짝맞추기 20, 틀린그림 20, 산수 20, 제시어 0

    // 출석 게임
    @PostMapping("/today")
    public ResponseEntity<TodayAttendanceInfoDTO> attendanceGame(@RequestBody PreTestDTO preTestDTO) {


        Long currentMemberId = SecurityUtil.getCurrentMemberId();

        TodayAttendanceInfoDTO todayAttendanceInfoDTO = gameService.saveAttendanceScore(currentMemberId, preTestDTO);

        int math = todayAttendanceInfoDTO.getMathScore() * 5;
        int match = todayAttendanceInfoDTO.getMatchScore() * 5;
        int ad = todayAttendanceInfoDTO.getAdScore() * 5;

        todayAttendanceInfoDTO.setMathScore(math);
        todayAttendanceInfoDTO.setMatchScore(match);
        todayAttendanceInfoDTO.setAdScore(ad);

        return ResponseEntity.ok(todayAttendanceInfoDTO);


    }


}
