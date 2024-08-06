package com.example.dm_be.repository;

import com.example.dm_be.domain.AttendanceGame;
import com.example.dm_be.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AttendanceGameRepository extends JpaRepository<AttendanceGame, Long> {

    // 사용자의 출석일자들 조회
    List<AttendanceGame> findByMember(Member member);
}
