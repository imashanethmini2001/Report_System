package com.weeklyreport.weekly_report_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

@SuppressWarnings({"rawtypes", "unchecked"})
public interface ReportRepository extends JpaRepository {

    List findByUserIdOrderByWeekStartDesc(Long userId);

    List findByWeekStartBetween(LocalDate start, LocalDate end);

    List findByProjectId(Long projectId);

    List findByUserId(Long userId);
}