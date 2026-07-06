package com.weeklyreport.weekly_report_backend.repository;

import com.weeklyreport.weekly_report_backend.entity.Project;
import com.weeklyreport.weekly_report_backend.entity.Report;
import com.weeklyreport.weekly_report_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

	List<Report> findByUserOrderByWeekStartDesc(User user);

	List<Report> findByWeekStartBetween(LocalDate start, LocalDate end);

	List<Report> findByProject(Project project);

	List<Report> findByUser(User user);
}