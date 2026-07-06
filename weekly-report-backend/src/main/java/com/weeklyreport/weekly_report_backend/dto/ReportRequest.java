package com.weeklyreport.weekly_report_backend.dto;

import java.time.LocalDate;

public class ReportRequest {
	private Long projectId;
	private LocalDate weekStart;
	private LocalDate weekEnd;
	private String tasksCompleted;
	private String tasksPlanned;
	private String blockers;
	private Integer hoursWorked;
	private String notes;

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public LocalDate getWeekStart() {
		return weekStart;
	}

	public void setWeekStart(LocalDate weekStart) {
		this.weekStart = weekStart;
	}

	public LocalDate getWeekEnd() {
		return weekEnd;
	}

	public void setWeekEnd(LocalDate weekEnd) {
		this.weekEnd = weekEnd;
	}

	public String getTasksCompleted() {
		return tasksCompleted;
	}

	public void setTasksCompleted(String tasksCompleted) {
		this.tasksCompleted = tasksCompleted;
	}

	public String getTasksPlanned() {
		return tasksPlanned;
	}

	public void setTasksPlanned(String tasksPlanned) {
		this.tasksPlanned = tasksPlanned;
	}

	public String getBlockers() {
		return blockers;
	}

	public void setBlockers(String blockers) {
		this.blockers = blockers;
	}

	public Integer getHoursWorked() {
		return hoursWorked;
	}

	public void setHoursWorked(Integer hoursWorked) {
		this.hoursWorked = hoursWorked;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
}