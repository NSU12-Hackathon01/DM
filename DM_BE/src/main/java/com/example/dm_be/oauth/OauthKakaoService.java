package com.example.dm_be.oauth;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.common.exception.CustomException;
import com.example.dm_be.domain.Member;
import com.example.dm_be.dto.member.TokenDTO;
import com.example.dm_be.dto.member.TokenRequestDTO;
import com.example.dm_be.jwt.TokenProvider;
import com.example.dm_be.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class OauthKakaoService {

    // 간편하게 Rest 방식 API를 호출할 수 있는 Spring 내장 클래스
    private final RestTemplate restTemplate;
    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;

    @Value("${Kakao_Client_ID}")
    private String KAKAO_CLIENT_KEY;

    @Value("${Kakao_Client_SECRET}")
    private String KAKAO_CLIENT_SECRET;

    @Value("${Kakao_Token_URI}")
    private String KAKAO_TOKEN_URL;

    @Value("${KAKAO_USER_INFO_URL}")
    private String KAKAO_UserInfoURL;

    @Value("${Kakao_Redirect-URI}")
    private String redirectUri;

    // 카카오로부터 토큰을 요청
    public KakaoTokenDTO getToken(String code){

        log.info("getToken 실행 + code => " + code);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        log.info("Header 생성");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", KAKAO_CLIENT_KEY);
        body.add("redirect_uri", redirectUri);
        body.add("code", code);
        body.add("client_secret", KAKAO_CLIENT_SECRET);

        log.info("params 채우기");
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);

        log.info(body.toString());
        log.info(headers.toString());
        log.info(KAKAO_TOKEN_URL);

//        KakaoTokenDTO body1 = restTemplate.exchange(KAKAO_TOKEN_URL, HttpMethod.POST, kakaoTokenRequest, KakaoTokenDTO.class).getBody();
//        ResponseEntity<KakaoTokenDTO> body = (ResponseEntity<KakaoTokenDTO>) body1;

        ResponseEntity<KakaoTokenDTO> response = restTemplate.postForEntity(KAKAO_TOKEN_URL, kakaoTokenRequest , KakaoTokenDTO.class);

        log.info("토큰 발급 성공" + response.getBody());

        return response.getBody();
    }

    // 사용자 정보 요청
    public KakaoUserDTO getUserInfo(String accessToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        log.info("사용자 정보 요청");
        HttpEntity<Void> kakaoUserInfoRequest = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(KAKAO_UserInfoURL, HttpMethod.GET, kakaoUserInfoRequest, String.class);

//        ResponseEntity<KakaoUserDTO> response = restTemplate.exchange(KAKAO_UserInfoURL, HttpMethod.GET, kakaoUserInfoRequest, KakaoUserDTO.class);
        log.info(response.toString());

        ObjectMapper objectMapper = new ObjectMapper();

        KakaoUserDTO kakaoUserDTO = objectMapper.readValue(response.getBody(), KakaoUserDTO.class);

        if (memberRepository.existsByUserId(kakaoUserDTO.getKakaoAccount().getEmail())){
            return kakaoUserDTO;
        } else {
            Member member = new Member(kakaoUserDTO.getKakaoAccount().getEmail(),
                    kakaoUserDTO.getKakaoAccount().getName(),
                    kakaoUserDTO.getKakaoAccount().getPhoneNumber(),
                    kakaoUserDTO.getKakaoAccount().getBirthyear(),
                    kakaoUserDTO.getKakaoAccount().getBirthday(),
                    kakaoUserDTO.getKakaoAccount().getGender());

            memberRepository.save(member);

            return kakaoUserDTO;
        }

    }

    // 자체 JWT 생성
    public TokenDTO createJwt(KakaoUserDTO kakaoUser) {
        log.info("토큰 생성");
        // 카카오 사용자 정보로 JWT 생성 로직
        Authentication authentication = new UsernamePasswordAuthenticationToken(kakaoUser.getKakaoAccount().getEmail(), "", new ArrayList<>());
        TokenDTO tokenDTO = tokenProvider.generateTokenDto(authentication);

        log.info(tokenDTO.getAccessToken() + " " + tokenDTO.getRefreshToken());

        return tokenDTO;
    }

    // 특이사항 등 추가 정보 체킹
    public boolean checkInfo(String userId){
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        return member.getSignificant() == null;
    }

}
