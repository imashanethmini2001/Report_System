package com.weeklyreport.weekly_report_backend.service;

import com.weeklyreport.weekly_report_backend.dto.DashboardSummaryResponse;
import com.weeklyreport.weekly_report_backend.entity.Report;
import com.weeklyreport.weekly_report_backend.entity.User;
import com.weeklyreport.weekly_report_backend.entity.enums.ReportStatus;
import com.weeklyreport.weekly_report_backend.repository.ReportRepository;
import com.weeklyreport.weekly_report_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ManagerService {

	private final ReportRepository reportRepository;
	private final UserRepository userRepository;

	public List<Report> getAllReports() {
		return reportRepository.findAll();
	}

	public DashboardSummaryResponse getSummary() {

		List<Report> reports = reportRepository.findAll();

		long totalReports = reports.size();

		long submittedReports = reports.stream()
				.filter(report -> report.getStatus() == ReportStatus.SUBMITTED)
				.count();

		long pendingReports = reports.stream()
				.filter(report -> report.getStatus() == ReportStatus.DRAFT)
				.count();

		long openBlockers = reports.stream()
				.filter(report -> report.getBlockers() != null && !report.getBlockers().isBlank())
				.count();

		double complianceRate = totalReports == 0
				? 0
				: ((double) submittedReports / totalReports) * 100;

		return new DashboardSummaryResponse(
				totalReports,
				submittedReports,
				pendingReports,
				complianceRate,
				openBlockers
		);
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
}