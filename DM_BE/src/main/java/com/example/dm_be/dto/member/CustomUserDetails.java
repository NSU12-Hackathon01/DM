package com.example.dm_be.dto.member;

import com.example.dm_be.domain.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final Member member;

    public CustomUserDetails(Member member){

        this.member = member;
    }


    // 계정이 가지고 있는 권한 목록 리턴
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {

                return member.getRole().toString();
            }
        });
        return collection;
    }

    // 계정의 이름 리턴 (일반적으로 아이디)
    @Override
    public String getUsername() {
        return member.getUserId();
    }

    // 계정의 비밀번호 리턴
    @Override
    public String getPassword() {
        return member.getUserPw();
    }

    // 계정이 만료되었는지 리턴 (true -> 만료되지 않았다.)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정이 잠겨있는지 리턴 (true -> 잠기지 않았다.)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 비밀번호가 만료됐는지 리턴 (true -> 만료되지 않았다.)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정이 활성화되어 있는지 리턴 (true -> 만료되지 않았다.)
    @Override
    public boolean isEnabled() {
        return true;
    }




}
