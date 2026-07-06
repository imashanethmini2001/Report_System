package com.weeklyreport.weekly_report_backend.controller;

import com.weeklyreport.weekly_report_backend.dto.DashboardSummaryResponse;
import com.weeklyreport.weekly_report_backend.entity.Report;
import com.weeklyreport.weekly_report_backend.entity.User;
import com.weeklyreport.weekly_report_backend.service.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ManagerController {

	private final ManagerService managerService;

	@GetMapping("/reports")
	public List<Report> getAllReports() {
		return managerService.getAllReports();
	}

	@GetMapping("/summary")
	public DashboardSummaryResponse getSummary() {
		return managerService.getSummary();
	}

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return managerService.getAllUsers();
	}
}