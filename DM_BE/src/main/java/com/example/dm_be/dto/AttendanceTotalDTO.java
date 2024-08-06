package com.example.dm_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AttendanceTotalDTO {

    private String startDate;
    private double attendanceRate;

}
