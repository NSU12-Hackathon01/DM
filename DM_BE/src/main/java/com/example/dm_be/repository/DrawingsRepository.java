package com.example.dm_be.repository;

import com.example.dm_be.domain.Drawings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DrawingsRepository extends JpaRepository<Drawings, Long> {

    @Query("SELECT d from Drawings d where d.member.memberId = :memberId")
    Optional<List<Drawings>> findDrawingsByMember(Long memberId);
}
