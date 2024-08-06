package com.example.dm_be.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberUpdateDTO {
    private String userPw;
    private String userName;
    private String userPhone;
    private String userAddress;
    private String significant;
    private String file;
}
