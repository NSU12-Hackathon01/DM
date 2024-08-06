package com.example.dm_be.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QrResponseDTO {
    private String userId;
    private String qrCodeUrl;
}
