package com.example.dm_be.dto.game;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class PreTestDTO {
    private int mathScore;
    private int matchScore;
    private int adScore;

    public int sumScore(){
        return matchScore + mathScore + adScore;
    }
}
