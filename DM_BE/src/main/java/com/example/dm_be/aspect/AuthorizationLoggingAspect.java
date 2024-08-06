package com.example.dm_be.aspect;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;


@Slf4j
@Aspect
@Component
public class AuthorizationLoggingAspect {

    // 컨트롤러에서 Authorization의 값을 로깅하는 AOP
    @Before("execution(* com.example.dm_be.controller..*(..))")
    public void logAuthorizationHeader(JoinPoint joinPoint){
        for (Object arg : joinPoint.getArgs()){
            if (arg instanceof HttpServletRequest){
                HttpServletRequest request = (HttpServletRequest) arg;
                String authorization = request.getHeader("Authorization");
                if (authorization != null){
                    log.info("Authorization accessToken => " + authorization);
                } else {
                    log.info("Authorization header not found");
                }
            }
        }
    }

}
