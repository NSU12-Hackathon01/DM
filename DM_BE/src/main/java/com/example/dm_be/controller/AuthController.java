package com.example.dm_be.controller;

import com.example.dm_be.dto.member.*;
import com.example.dm_be.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 회원가입 / 로그인 / 재발급 을 처리하는 API 입니다.
 * SecurityConfig 에서 /auth/** 요청은 전부 허용했기 때문에 토큰 검증 로직을 타지 않습니다.
 * MemberRequestDto 에는 사용자가 로그인 시도한 ID / PW String 이 존재합니다.
 * TokenRequestDto 에는 재발급을 위한 AccessToken / RefreshToken String 이 존재합니다.
 */

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 회원가입 컨트롤러
    @PostMapping("/register")
    public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO memberRequestDto){
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    // 로그인, 쿠키로 액세스 토큰과 리프레쉬 토큰을 넘겨줌
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginDTO memberLoginDTO) {
        TokenDTO tokenDto = authService.login(memberLoginDTO);

        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", tokenDto.getAccessToken())
                .httpOnly(false)             // http세션 ture => JS로 접근 불가하게 막음
                .path("/")                   // /로 시작해야함
                .maxAge(7200) // 유효기간 설정 (2시간)
                .sameSite("Strict")     // 같은 주소에서의 요청만 허용
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", tokenDto.getRefreshToken())
                .httpOnly(false)
                .path("/")
                .maxAge(43200) // 유효기간 설정 (12시간)
                .sameSite("Strict")
                .build();

        TokenRequestDTO tokenRequestDTO = new TokenRequestDTO(tokenDto.getAccessToken(), tokenDto.getRefreshToken());

//        return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
//                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
//                .body(tokenDto.getUserRole());

        return ResponseEntity.ok(tokenRequestDTO);
    }

    // 토큰 재발급 (Header로 받게 바꿀 예정)
    @PostMapping("/reissue")
    public ResponseEntity<TokenDTO> reissue(@RequestBody TokenRequestDTO tokenRequestDto) {

        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

}
