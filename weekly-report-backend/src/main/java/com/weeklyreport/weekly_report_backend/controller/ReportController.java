package com.weeklyreport.weekly_report_backend.controller;

import com.weeklyreport.weekly_report_backend.dto.ReportRequest;
import com.weeklyreport.weekly_report_backend.entity.Report;
import com.weeklyreport.weekly_report_backend.entity.User;
import com.weeklyreport.weekly_report_backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReportController {

	private final ReportService reportService;

	@PostMapping
	public Report createReport(
			@AuthenticationPrincipal User user,
			@RequestBody ReportRequest request
	) {
		return reportService.createReport(user, request);
	}

	@GetMapping("/my")
	public List<Report> getMyReports(@AuthenticationPrincipal User user) {
		return reportService.getMyReports(user);
	}

	@PutMapping("/{id}")
	public Report updateReport(
			@AuthenticationPrincipal User user,
			@PathVariable Long id,
			@RequestBody ReportRequest request
	) {
		return reportService.updateReport(user, id, request);
	}

	@PostMapping("/{id}/submit")
	public Report submitReport(
			@AuthenticationPrincipal User user,
			@PathVariable Long id
	) {
		return reportService.submitReport(user, id);
	}

	@DeleteMapping("/{id}")
	public String deleteReport(
			@AuthenticationPrincipal User user,
			@PathVariable Long id
	) {
		reportService.deleteReport(user, id);
		return "Report deleted successfully";
	}
}