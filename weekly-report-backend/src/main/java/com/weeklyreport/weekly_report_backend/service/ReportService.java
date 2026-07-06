package com.weeklyreport.weekly_report_backend.service;

import com.weeklyreport.weekly_report_backend.dto.ReportRequest;
import com.weeklyreport.weekly_report_backend.entity.Project;
import com.weeklyreport.weekly_report_backend.entity.Report;
import com.weeklyreport.weekly_report_backend.entity.User;
import com.weeklyreport.weekly_report_backend.entity.enums.ReportStatus;
import com.weeklyreport.weekly_report_backend.repository.ProjectRepository;
import com.weeklyreport.weekly_report_backend.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

	private final ReportRepository reportRepository;
	private final ProjectRepository projectRepository;

	public Report createReport(User user, ReportRequest request) {

		Project project = projectRepository.findById(request.getProjectId())
				.orElseThrow(() -> new RuntimeException("Project not found"));

		Report report = new Report();
		report.setUser(user);
		report.setProject(project);
		report.setWeekStart(request.getWeekStart());
		report.setWeekEnd(request.getWeekEnd());
		report.setTasksCompleted(request.getTasksCompleted());
		report.setTasksPlanned(request.getTasksPlanned());
		report.setBlockers(request.getBlockers());
		report.setHoursWorked(request.getHoursWorked());
		report.setNotes(request.getNotes());
		report.setStatus(ReportStatus.DRAFT);
		report.setCreatedAt(LocalDateTime.now());
		report.setUpdatedAt(LocalDateTime.now());

		return reportRepository.save(report);
	}

	public List<Report> getMyReports(User user) {
		return reportRepository.findByUserOrderByWeekStartDesc(user);
	}

	public Report updateReport(User user, Long reportId, ReportRequest request) {

		Report report = reportRepository.findById(reportId)
				.orElseThrow(() -> new RuntimeException("Report not found"));

		if (!report.getUser().getId().equals(user.getId())) {
			throw new RuntimeException("You can update only your own reports");
		}

		Project project = projectRepository.findById(request.getProjectId())
				.orElseThrow(() -> new RuntimeException("Project not found"));

		report.setProject(project);
		report.setWeekStart(request.getWeekStart());
		report.setWeekEnd(request.getWeekEnd());
		report.setTasksCompleted(request.getTasksCompleted());
		report.setTasksPlanned(request.getTasksPlanned());
		report.setBlockers(request.getBlockers());
		report.setHoursWorked(request.getHoursWorked());
		report.setNotes(request.getNotes());
		report.setUpdatedAt(LocalDateTime.now());

		return reportRepository.save(report);
	}

	public Report submitReport(User user, Long reportId) {

		Report report = reportRepository.findById(reportId)
				.orElseThrow(() -> new RuntimeException("Report not found"));

		if (!report.getUser().getId().equals(user.getId())) {
			throw new RuntimeException("You can submit only your own reports");
		}

		report.setStatus(ReportStatus.SUBMITTED);
		report.setSubmittedAt(LocalDateTime.now());
		report.setUpdatedAt(LocalDateTime.now());

		return reportRepository.save(report);
	}

	public void deleteReport(User user, Long reportId) {

		Report report = reportRepository.findById(reportId)
				.orElseThrow(() -> new RuntimeException("Report not found"));

		if (!report.getUser().getId().equals(user.getId())) {
			throw new RuntimeException("You can delete only your own reports");
		}

		reportRepository.delete(report);
	}
}