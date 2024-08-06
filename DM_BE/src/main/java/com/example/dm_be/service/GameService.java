package com.example.dm_be.service;

import com.example.dm_be.common.ErrorCode;
import com.example.dm_be.domain.AttendanceGame;
import com.example.dm_be.domain.Member;
import com.example.dm_be.dto.game.PreTestDTO;
import com.example.dm_be.dto.game.TodayAttendanceInfoDTO;
import com.example.dm_be.common.exception.CustomException;
import com.example.dm_be.repository.AttendanceGameRepository;
import com.example.dm_be.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class GameService {

        private AttendanceGameRepository gameRepository;
        private MemberRepository memberRepository;

        // 당일 출석 저장
        public TodayAttendanceInfoDTO saveAttendanceScore(Long memberId, PreTestDTO preTestDTO){

                Optional<Member> byId = memberRepository.findById(memberId);
                Member member = byId.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUNDED_USER));

                // 유저 출석한 날짜들 가져오기
                List<AttendanceGame> byMember = gameRepository.findByMember(member);

                // Attendance 객체 생성
                AttendanceGame attendanceGame = new AttendanceGame(preTestDTO, member);

                // 출석 날짜 가져오기 (객체 생성 시 자동으로 날짜 저장됨)
                String newAttendanceDate = attendanceGame.getAttendanceDate();

                // ==날짜 변환 포매터==
                DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                // 날짜 형식 변환 yyyy-MM-dd HH:mm:ss => yyyy-MM-dd
                String formatNewAttendance = LocalDateTime.parse(newAttendanceDate, inputFormatter).format(outputFormatter);

                // 출석일들 순회
                for (AttendanceGame attendance : byMember){
                        String attendanceDate = attendance.getAttendanceDate();

                        String formatAttendance = LocalDateTime.parse(attendanceDate, inputFormatter).format(outputFormatter);

                        if (formatAttendance.equals(formatNewAttendance)) {
                                log.info("출석이 완료된 날 : " + formatNewAttendance);
                                throw new CustomException(ErrorCode.DUPLICATE_ATTENDANCE_TODAY);
                        }

                }

                gameRepository.save(attendanceGame);


                // 출석 날짜 정렬
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

                List<LocalDate> sortedAttendanceDates = byMember.stream()
                        .map(att -> LocalDateTime.parse(att.getAttendanceDate(), formatter).toLocalDate())
                        .sorted()
                        .toList();

                // 3일 연속 출석 확인
                boolean isConsecutiveAttendance = false;

                if (sortedAttendanceDates.size() >= 3) {
                        for (int i = sortedAttendanceDates.size() - 1; i >= 2; i--) {
                                LocalDate d1 = sortedAttendanceDates.get(i);
                                LocalDate d2 = sortedAttendanceDates.get(i - 1);
                                LocalDate d3 = sortedAttendanceDates.get(i - 2);

                                if (d1.minusDays(1).equals(d2) && d2.minusDays(1).equals(d3)) {
                                        isConsecutiveAttendance = true;
                                        break;
                                }
                        }
                }

                // 3일 연속 출석 시 난이도 조정
                if (isConsecutiveAttendance) {
                        log.info("3일 연속 출석 확인됨. 난이도 상승");
                        // 여기에 난이도 상승 로직 추가
                        member.levelUp();
                }



                // 사용자의 가입날짜와 현재 날짜 비교
                LocalDateTime registrationDate = LocalDateTime.parse(member.getRegisterDate(), inputFormatter);
                LocalDate registerDate = registrationDate.toLocalDate();

                // 현재 날짜를 yyyy-MM-dd 형식으로 변환
                String currentDateStr = LocalDate.now().format(outputFormatter);
                LocalDate currentDate = LocalDate.parse(currentDateStr);

                // 가입 날짜로부터 현재까지의 일수 계산
                long daysSinceRegistration = ChronoUnit.DAYS.between(registerDate, currentDate) + 1;
                log.info("가입 날짜로부터 현재까지의 일 수 계산 => " + daysSinceRegistration);

                // 실제 출석한 날 수 계산 (byMember 리스트의 크기)
                int actualAttendanceDays = byMember.size() + 1; // 오늘 출석도 포함

                // 출석률 계산 (총 출석일 / 가능 출석일) * 100
                double attendanceRate = (double) actualAttendanceDays / daysSinceRegistration * 100;

                log.info("계산된 출석률 => " + attendanceRate);

                // 멤버의 출석률 업데이트 (소수점 한자리까지만 저장)
                member.setAllAttendance(Math.round(attendanceRate * 10) / 10.0);
                memberRepository.save(member);

                return new TodayAttendanceInfoDTO(preTestDTO, currentDateStr);
        }
}
