package com.example.dm_be.dto.admin;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class UpdateProtectorDTO {

    private Long protectorId;
    private String userId;
}
