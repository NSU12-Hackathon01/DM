package com.example.dm_be.oauth;

import com.example.dm_be.dto.member.TokenDTO;
import com.example.dm_be.dto.member.TokenRequestDTO;
import com.example.dm_be.jwt.TokenProvider;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class OauthKakaoController {

//
//    @GetMapping("/add/info")
//    public ResponseEntity<?> kakaoLogin(@RequestParam(value = "code") String code){
//
//    }

    private final OauthKakaoService kakaoService;

    @GetMapping("/add/info")
    public ResponseEntity<?> kakaoCallback(@RequestParam String code, HttpServletResponse response) throws IOException {
        
        log.info("컨트롤러 형성");
        // 카카오로부터 액세스 토큰 요청
        KakaoTokenDTO tokenDto = kakaoService.getToken(code);

        log.info("컨트롤러 액세스 토큰 발급 성공");
        // 카카오로부터 사용자 정보 요청
        KakaoUserDTO kakaoUser = kakaoService.getUserInfo(tokenDto.getAccessToken());

        log.info("===사용자 정보 요청 성공===");
        log.info(kakaoUser.toString());
        // 자체 JWT 생성
        TokenDTO jwt = kakaoService.createJwt(kakaoUser);

        // 클라이언트에 JWT 전달
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization", "Bearer " + jwt.getAccessToken());

        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", jwt.getAccessToken())
                .httpOnly(false)             // http세션
                .path("/")                   // /로 시작해야함
                .maxAge(7200) // 유효기간 설정 (2시간)
                .sameSite("Strict")     // 같은 주소에서의 요청만 허용
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", jwt.getRefreshToken())
                .httpOnly(false)
                .path("/")
                .maxAge(43200) // 유효기간 설정 (12시간)
                .sameSite("Strict")
                .build();

        // 쿠키를 응답에 추가
        // 쿠키를 응답에 추가
        response.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE2, refreshTokenCookie.toString());
        
        TokenRequestDTO tokenRequestDTO = new TokenRequestDTO(jwt.getAccessToken(), jwt.getRefreshToken());

        log.info("응답");
        if (kakaoService.checkInfo(kakaoUser.getKakaoAccount().getEmail())) {

            // 리다이렉트 (만약 특이사항이 null이면 주소로 반환 (반환 이후 프론트는 기본값으로 없음 처리
            response.sendRedirect("http://3.36.19.167:80/Kakao_join");
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                    .header(HttpHeaders.SET_COOKIE2, refreshTokenCookie.toString())
                    .body(jwt.getUserRole());

        }

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE2, refreshTokenCookie.toString())
                .body(jwt.getUserRole());

    }
}
