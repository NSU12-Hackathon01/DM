package com.example.dm_be.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.Schedules;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Table(name = "refresh_token")
@Entity
public class RefreshToken {

    @Id
    @Column(name = "rt_key")
    private String key; // Member Id 값이 들어갑니다.

    @Column(name = "rt_value")
    private String value;   // Refresh Token Sring

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @Builder
    public RefreshToken(String key, String value){
        this.key = key;
        this.value = value;
        this.expiryDate = LocalDateTime.now().plusHours(12);
    }

    public RefreshToken updateValue(String token){
        this.value = token;
        return this;
    }

}
