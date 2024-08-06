package com.example.dm_be.dto.game;

import com.example.dm_be.domain.AttendanceGame;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Getter
@Builder
public class TodayAttendanceInfoDTO {

    private int mathScore;
    private int matchScore;
    private int adScore;
    private String attendanceDate;

    public TodayAttendanceInfoDTO(PreTestDTO preTestDTO, String attendanceDate) {
        this.mathScore = preTestDTO.getMathScore();
        this.matchScore = preTestDTO.getMatchScore();
        this.adScore = preTestDTO.getAdScore();
        this.attendanceDate = attendanceDate;
    }

    public TodayAttendanceInfoDTO(AttendanceGame attendanceGame){
        this.mathScore = attendanceGame.getMathScore();
        this.matchScore = attendanceGame.getMatchScore();
        this.adScore = attendanceGame.getAdScore();
        this.attendanceDate = attendanceGame.getAttendanceDate();
    }


}
