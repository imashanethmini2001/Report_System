package com.weeklyreport.weekly_report_backend.entity;

// ReportStatus enum import removed - using String for status to avoid missing-symbol error
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate weekStart;

    private LocalDate weekEnd;

    @Column(columnDefinition = "TEXT")
    private String tasksCompleted;

    @Column(columnDefinition = "TEXT")
    private String tasksPlanned;

    @Column(columnDefinition = "TEXT")
    private String blockers;

    private Integer hoursWorked;

    @Column(columnDefinition = "TEXT")
    private String notes;

    // Using String for status to avoid dependency on missing enum class
    private String status;

    private LocalDateTime submittedAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "project_id")
    private Long projectId;
}