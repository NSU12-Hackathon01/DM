package com.example.dm_be.config;

import com.example.dm_be.jwt.JwtAccessDeniedHandler;
import com.example.dm_be.jwt.JwtAuthenticationEntryPoint;
import com.example.dm_be.jwt.TokenProvider;
import com.example.dm_be.service.CustomUserDetailsService;
import com.example.dm_be.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtSecurityConfig jwtSecurityConfig;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final TokenProvider tokenProvider;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{


        // permitall() => 접근 모두 허용
        // hasRole => 하나의 권한만 접근 가능하게 설정
        // hasAnyRole => 여러 개의 권한 접근 가능하게 설정 가능

        // CSRF 설정 Disable
        http.csrf(AbstractHttpConfigurer::disable)

                //HTTP Basic 인증 방식 disable
                .httpBasic(AbstractHttpConfigurer::disable)

                // exception handling 할 때 우리가 만든 클래스를 추가
                .exceptionHandling((exc) -> exc.authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(jwtAccessDeniedHandler))

                        .headers((headers) -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))

                // 시큐리티는 기본적으로 세션 사용
                // 세션을 사용하지 않기 위해 세션 설정을 Stateless로 설정
                .sessionManagement(sessionManage -> sessionManage
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 로그인, 회원가입 API는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll 설정
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/member/**", "/game/**", "/drawing/**").hasAnyRole("ADMIN", "USER", "PROTECTOR")
                        .requestMatchers("/protector/**").hasAnyRole("ADMIN", "PROTECTOR")
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated());

        // 로그인 로그아웃 설정
        http.logout(AbstractHttpConfigurer::disable);
        http.formLogin((AbstractHttpConfigurer::disable));

//         oauth 설정
//        http
//                .oauth2Login((oauth2) -> oauth2
//                        .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
//                                .userService()));

        // 동시 로그인 여부
        http.sessionManagement((session) ->
                session
                        .maximumSessions(2) // 최대 2명
                        .maxSessionsPreventsLogin(false));  // 먼저 로그인 되어 있는 계정 로그아웃

        // JwtFilter 를 addFilterBefore로 등록했던 JwtSecurityConfig 클래스를 적용
        // 정석적인 방식은 아님, apply 대체용으로 사용함
        http.with(new JwtSecurityConfig(tokenProvider), JwtSecurityConfig::getClass);

        return http.build();
    }

}
