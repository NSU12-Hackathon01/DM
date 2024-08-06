package com.example.dm_be.service;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.dto.member.*;
import com.example.dm_be.domain.Member;
import com.example.dm_be.domain.RefreshToken;
import com.example.dm_be.common.exception.CustomException;
import com.example.dm_be.jwt.TokenProvider;
import com.example.dm_be.repository.MemberRepository;
import com.example.dm_be.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional // 반환값 변경해주기 MemberId
    public MemberResponseDTO signup(MemberRequestDTO memberRequestDto){
        if (memberRepository.existsByUserId(memberRequestDto.getUserId())) {
            throw new CustomException(ErrorCode.DUPLICATE_USERID);
        }

        UUID uuid = UUID.randomUUID();
        log.info("uuid생성 => " + uuid.toString());

        while (memberRepository.existsByCode(uuid.toString())){
            log.info("중복되는 UUID => " + uuid.toString());
            uuid = UUID.randomUUID();
        }

        // 보호자일경우
        if (memberRequestDto.getRole().equals("PROTECTOR")){
            log.info("ROLE = 보호자");

            // 사용자
            Member user = memberRepository.findByCode(memberRequestDto.getCode()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

            // 보호자
            Member protector = memberRequestDto.toProtector(passwordEncoder, uuid.toString());

            Member saveProtector = memberRepository.save(protector);
            log.info("생성된 보호자 memberId = " + saveProtector.getMemberId());

            if(saveProtector.getWards() == null){
                log.info("wards가 null값이라 생성");
                List<Member> wards = new ArrayList<>();
                wards.add(user);
                protector.setWards(wards);
            }

            user.setProtector(saveProtector);

            memberRepository.save(user);

            log.info("사용자 역할 => " + saveProtector.getRole());

            return MemberResponseDTO.of(memberRepository.save(saveProtector));
        }

        Member member = memberRequestDto.toMember(passwordEncoder, uuid.toString());

        return MemberResponseDTO.of(memberRepository.save(member));
    }

    @Transactional
    public TokenDTO login(MemberLoginDTO memberLoginDTO) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = memberLoginDTO.toAuthentication();

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDTO tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. 사용자 역할 정보를 가져옴
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userRole = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // 5. TokenDTO에 역할 정보 넣기
        tokenDto.setUserRole(userRole);

        // 6. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 7. 토큰 발급
        return tokenDto;
    }

    @Transactional
    public TokenDTO reissue(TokenRequestDTO tokenRequestDto) {

        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDTO tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

}
