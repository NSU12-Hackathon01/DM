package com.example.dm_be.dto.game;

import com.example.dm_be.constant.Level;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PreTestResponseDTO {
    private String message;
    private Level level;
}
