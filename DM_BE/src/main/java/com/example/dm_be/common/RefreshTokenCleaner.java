package com.example.dm_be.common;

import com.example.dm_be.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.Schedules;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class RefreshTokenCleaner {

    private final RefreshTokenRepository refreshTokenRepository;

    @Scheduled(cron = "0 0 */12 * * *")
    @Transactional
    public void cleanExpiredTokens(){

        log.info("=== 12시간마다 스케줄링 === ");

        LocalDateTime now = LocalDateTime.now();
        refreshTokenRepository.deleteByExpiryDateBefore(now);
    }

}
