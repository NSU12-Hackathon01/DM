package com.example.dm_be.service;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.common.exception.CustomException;
import com.example.dm_be.domain.Drawings;
import com.example.dm_be.domain.Member;
import com.example.dm_be.repository.DrawingsRepository;
import com.example.dm_be.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class DrawingsService {

    private final DrawingsRepository drawingsRepository;
    private final S3Uploader s3Uploader;
    private final MemberRepository memberRepository;

    public Drawings saveDrawing(MultipartFile file, String origin, String dirName, Long memberId) throws IOException {

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        // 파일 업로드
        String imgUrl = s3Uploader.upload(file, dirName);

        // Drawings 엔티티 생성
        Drawings drawing = Drawings.builder()
                .origin(origin)
                .imgUrl(imgUrl)
                .member(member)
                .build();

        // 엔티티 저장
        return drawingsRepository.save(drawing);
    }

    public List<Drawings> getDrawing(Long memberId) {


        return drawingsRepository.findDrawingsByMember(memberId).orElseThrow(() -> new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));
    }

    // 파일 업데이트 로직
//    public Drawings updateDrawing(Long id, MultipartFile file, String origin, String dirName) throws IOException {
//        Drawings drawing = getDrawing(id);
//
//        // 기존 파일 삭제
//        s3Uploader.deleteFile(drawing.getImgUrl());
//
//        // 새 파일 업로드
//        String imgUrl = s3Uploader.upload(file, dirName);
//
//        // 엔티티 업데이트
//        drawing.setImgUrl(imgUrl);
//        drawing.setOrigin(origin);
//
//        return drawingsRepository.save(drawing);
//    }

    public void deleteDrawing(Long id, Long memberId) {
        Drawings drawing = drawingsRepository.findById(id). orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

        if (!Objects.equals(drawing.getMember().getMemberId(), memberId)){
            throw new CustomException(ErrorCode.NOT_MATCH_ROLE);
        }
        // 파일 삭제
        s3Uploader.deleteFile(drawing.getImgUrl());

        // 엔티티 삭제
        drawingsRepository.delete(drawing);
    }
}
