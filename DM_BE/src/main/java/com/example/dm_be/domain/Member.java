package com.example.dm_be.domain;

import com.example.dm_be.constant.Gender;
import com.example.dm_be.constant.Level;
import com.example.dm_be.constant.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

// 사용자
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    // 사용자 아이디
    private String userId;

    // 사용자 비밀번호
    private String userPw;

    // 사용자 이름
    private String userName;

    // 사용자 폰번호
    private String userPhone;

    // 사용자 주소
    private String userAddress;

    // 사용자 특이사항(알레르기 라던지)
    private String significant;

    // 사용자 생일 (ex. 20010215)
    private LocalDate userBirth;

    // 사용자 현재 난이도 ( 0~9까지 존재, 3미만 (LOW), 3~6 (MIDIUM), 7~9(HIGH) )
    @Enumerated(EnumType.STRING)
    @Column
    private Level userLevel = Level.NONE;

    // 사용자 개인 코드
    private String code;

    // 사용자 전체 출석률 (소수점 한자리까지만)
    @Column(name = "all_attendance", columnDefinition = "DOUBLE DEFAULT 0")
    private double allAttendance;

    // 사진 주소
    private String file;

    // 사용자 가입날짜
    private String registerDate;

    // 사용자 초기 난이도 ( HIGH, MIDIUM, LOW )
    @Enumerated(EnumType.STRING)
    @Column
    private Level difficulty = Level.NONE;

    // 역할 (권한 : USER, PROTECTOR, ADMIN)
    @Enumerated(EnumType.STRING)
    private Role role;

    // 성별 (MAIL, FEMAIL)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    // == 자기 참조 관계 설정 ==
    @ManyToOne
    @JoinColumn(name = "protector_id")
    private Member protector;

    @OneToMany(mappedBy = "protector", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Member> wards = new ArrayList<>();




    // insert 연산 때, 아래 구문 실행 (현재 시간 저장)
    @PrePersist
    public void createdAccount(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.registerDate = LocalDateTime.now().format(formatter);

        this.userLevel = Level.NONE;

    }

    // 흠 불가피한 세터 사용이라 . ..
    public void setProtector(Member protector){
        this.protector = protector;
    }
    public void setAllAttendance(double attendance){
        this.allAttendance = attendance;
    }
    public void setWards(List<Member> wards) {
        this.wards = wards;
    }
    public void setSignificant(String significant){
        this.significant = significant;
    }



    public Member(String userId, String userName, String userPhone, String userBirthYear, String userBirthDay, String gender){
        this.userId = userId;
        this.userName = userName;
        this.userPhone = userPhone;
        this.role = Role.ROLE_USER;

        String birth = userBirthYear + "-" + userBirthDay.substring(0, 2) + "-" + userBirthDay.substring(2, 4);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        this.userBirth = LocalDate.parse(birth, formatter);

        if (gender.equals("mail")) this.gender = Gender.MAIL;
        if (gender.equals("femail")) this.gender = Gender.FEMAIL;

    }

    public Member.MemberBuilder toBuilder() {
        return Member.builder()
                .memberId(this.memberId)
                .userId(this.userId)
                .userPw(this.userPw)
                .userName(this.userName)
                .userPhone(this.userPhone)
                .userAddress(this.userAddress)
                .significant(this.significant)
                .userLevel(this.userLevel)
                .userBirth(this.userBirth)
                .allAttendance(this.allAttendance)
                .file(this.file)
                .gender(this.gender)
                .difficulty(this.difficulty)
                .code(this.code)
                .role(this.role)
                .protector(this.protector)
                .registerDate(this.registerDate)
                .wards(this.wards);

    }

    // == 서비스 로직 == //
    // 난이도 상승
    public void levelUp(){
        Level level = this.userLevel;

        if (level.equals(Level.NONE)){
            this.userLevel = Level.LOW;
        } else if (level.equals(Level.LOW)){
            this.userLevel = Level.MEDIUM;
        } else if (level.equals(Level.MEDIUM)){
            this.userLevel = Level.HIGH;
        }
    }

    public void levelDown(){
        Level level = this.userLevel;

        if (level.equals(Level.HIGH)){
            this.userLevel = Level.MEDIUM;
        } else if (level.equals(Level.MEDIUM)){
            this.userLevel = Level.LOW;
        }
    }

    // 권한 확인 String To Enum
    public Role checkRole(String role){
        if (role.equals("USER")) return Role.ROLE_USER;
        if (role.equals("PROTECTOR")) return Role.ROLE_PROTECTOR;
        if (role.equals("ADMIN")) return Role.ROLE_ADMIN;

        return Role.ROLE_USER;
    }



}
