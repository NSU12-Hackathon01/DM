package com.example.dm_be.controller;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.domain.Drawings;
import com.example.dm_be.service.DrawingsService;
import com.example.dm_be.util.SecurityUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Security;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/drawing")
@AllArgsConstructor
public class DrawingsController {

    private DrawingsService drawingsService;


    @PostMapping("/upload")
    public ResponseEntity<?> fileUpload(@RequestParam("files") List<MultipartFile> files,
                                        @RequestParam Map<String, String> fileTitles) throws IOException {
        Long memberId = SecurityUtil.getCurrentMemberId();

        if (files.size() != fileTitles.size()) {
            return ResponseEntity.badRequest().body("파일과 제목의 수가 일치하지 않습니다.");
        }

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            String fileTitle = fileTitles.get("fileTitle" + i);

            drawingsService.saveDrawing(file, fileTitle, "drawing", memberId);
        }

        return ResponseEntity.ok(ErrorCode.SUCCESS);
    }


    // 사진 저장
//    @PostMapping("/upload")
//    public ResponseEntity<?> fileUpload(@RequestPart MultipartFile file,
//                                           @RequestParam String fileTitle) throws IOException {
//
//        Long memberId = SecurityUtil.getCurrentMemberId();
//
//        Drawings drawing = drawingsService.saveDrawing(file, fileTitle, "drawing", memberId);
//
//        return ResponseEntity.ok(ErrorCode.SUCCESS);
//    }

    // 사진 가져오기
    @PostMapping("/get")
    public ResponseEntity<List<Drawings>> getFile(@RequestHeader("Authorization") String accessToken){

        Long memberId = SecurityUtil.getCurrentMemberId();
        List<Drawings> drawings = drawingsService.getDrawing(memberId);

        return ResponseEntity.ok(drawings);
    }

    // 사진 삭제하기
    @DeleteMapping("/delete/{drawId}")
    public ResponseEntity<?> deleteFile(@PathVariable Long drawId){
        Long memberId = SecurityUtil.getCurrentMemberId();

        drawingsService.deleteDrawing(drawId, memberId);

        return ResponseEntity.ok(ErrorCode.SUCCESS);
    }
}
