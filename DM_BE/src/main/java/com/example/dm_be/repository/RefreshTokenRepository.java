package com.example.dm_be.repository;

import com.example.dm_be.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByKey(String key);
    
    // 만료시간 이전값들 찾기
    List<RefreshToken> findByExpiryDateBefore(LocalDateTime now);
    
    // 만료된 값들 삭제
    void deleteByExpiryDateBefore(LocalDateTime now);
}
