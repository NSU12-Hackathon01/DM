package com.example.dm_be.controller;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.dto.admin.UpdateProtectorDTO;
import com.example.dm_be.dto.member.MemberResponseDTO;
import com.example.dm_be.service.AdminService;
import com.example.dm_be.util.SecurityUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

    private AdminService adminService;

    // 관리자: 사용자 목록 조회
    @GetMapping("/users")
    public ResponseEntity<List<MemberResponseDTO>> adminUserList(){

        Long adminId = SecurityUtil.getCurrentMemberId();

        return ResponseEntity.ok(adminService.adminUserList(adminId));
    }

    // 관리자: 사용자 세부 조회
    @GetMapping("/users/{memberId}")
    public ResponseEntity<?> adminUserDetail(@PathVariable Long memberId){

        Long adminId = SecurityUtil.getCurrentMemberId();

        return ResponseEntity.ok(adminService.adminUserDetail(adminId, memberId));
    }

    // 관리자: 사용자 계정 삭제
    @DeleteMapping("/delete/{memberId}")
    public ResponseEntity<ErrorCode> deleteUser(@PathVariable Long memberId){

        Long adminId = SecurityUtil.getCurrentMemberId();

        adminService.deleteUser(adminId, memberId);

        return ResponseEntity.ok(ErrorCode.SUCCESS);
    }

    // 관리자: 보호자와 연관 되어있는 사용자 리스트 조회
    @GetMapping("/protectlist/{protectorId}")
    public ResponseEntity<?> adminProtectorList(@PathVariable Long protectorId){

        Long adminId = SecurityUtil.getCurrentMemberId();

        return ResponseEntity.ok(adminService.adminProtectList(adminId, protectorId));
    }

    // 관리자: 보호자에 사용자 추가
    @PostMapping("/add/protect")
    public ResponseEntity<?> adminAddProtector(@RequestBody UpdateProtectorDTO updateProtectorDTO){

        Long adminId = SecurityUtil.getCurrentMemberId();

        adminService.adminAddProtector(adminId, updateProtectorDTO);

        return ResponseEntity.ok(ErrorCode.SUCCESS);
    }

    // 관리자: 보호자에 사용자 삭제
    @PostMapping("/delete/protector")
    public ResponseEntity<?> adminDeleteProtector(@RequestBody UpdateProtectorDTO updateProtectorDTO){

        Long adminId = SecurityUtil.getCurrentMemberId();

        adminService.adminDeleteProtector(adminId, updateProtectorDTO);

        return ResponseEntity.ok(ErrorCode.SUCCESS);
    }

}
