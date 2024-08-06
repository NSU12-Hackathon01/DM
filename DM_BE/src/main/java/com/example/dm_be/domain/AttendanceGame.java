package com.example.dm_be.domain;

import com.example.dm_be.dto.game.PreTestDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@NoArgsConstructor
public class AttendanceGame {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendanceId;

    //=== 게임들 ===
    private int mathScore;
    private int matchScore;
    private int adScore;

    // 출석 날짜
    private String attendanceDate;

    // 출석 한 사람
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public AttendanceGame(PreTestDTO preTestDTO, Member member) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        this.mathScore = preTestDTO.getMathScore();
        this.matchScore = preTestDTO.getMatchScore();
        this.adScore = preTestDTO.getAdScore();
        this.member = member;
        this.attendanceDate = LocalDateTime.now().format(formatter);
    }
}
