package com.example.dm_be.constant;

public enum Level {
    NONE,       // 아직 테스트 게임 전
    HIGH,       // 상 (7~9)
    MEDIUM,     // 중 (3~6)
    LOW;        // 하 (3미만)

    public static Level value(int value){
        if (value >= 7 && value <= 9) {
            return HIGH;
        } else if (value >= 3 && value <= 6) {
            return MEDIUM;
        } else if (value < 3) {
            return LOW;
        } else {
            throw new IllegalArgumentException("범위를 벗어났습니다: " + value);
        }
    }
}
