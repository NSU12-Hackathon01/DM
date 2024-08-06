package com.example.dm_be.repository;

import com.example.dm_be.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    // 사용자 아이디를 통한 쿼리 검색
    @Query(value = "SELECT m FROM Member m WHERE m.userId = :userId")
    Optional<Member> findByUserId(String userId);

    // 아이디 존재 여부
    boolean existsByUserId(String userId);

    // 코드 중복 여부
    boolean existsByCode(String uuid);

    // 코드 기반 사용자 찾기
    @Query(value = "SELECT m FROM Member m WHERE m.code = :code")
    Optional<Member> findByCode(String code);

    // 보호자 Id에 연관되어 있는 유저 찾기
    Optional<List<Member>> findByProtector_MemberId(Long protectorId);
}
