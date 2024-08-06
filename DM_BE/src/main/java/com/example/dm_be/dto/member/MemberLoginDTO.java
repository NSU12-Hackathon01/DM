package com.example.dm_be.dto.member;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Data
@Getter @Setter
public class MemberLoginDTO {

    private String userId;

    private String userPw;

    public UsernamePasswordAuthenticationToken toAuthentication(){
        return new UsernamePasswordAuthenticationToken(userId, userPw);
    }
}
