package com.example.dm_be.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Drawings {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long drawId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 원래 사진이름
    private String origin;
    
    // 주소
    private String imgUrl;
    
    // 업로드 시간
    private LocalDate uploadDate;

    @PrePersist
    public void createdAccount(){
        this.uploadDate = LocalDate.now();
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
