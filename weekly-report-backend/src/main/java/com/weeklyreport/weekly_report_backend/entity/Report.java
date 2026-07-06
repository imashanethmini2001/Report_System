package com.weeklyreport.weekly_report_backend.entity;

import com.weeklyreport.weekly_report_backend.entity.enums.ReportStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
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

	@Enumerated(EnumType.STRING)
	private ReportStatus status;

	private LocalDateTime submittedAt;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id")
	private Project project;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public ReportStatus getStatus() {
		return status;
	}

	public void setStatus(ReportStatus status) {
		this.status = status;
	}

	public LocalDateTime getSubmittedAt() {
		return submittedAt;
	}

	public void setSubmittedAt(LocalDateTime submittedAt) {
		this.submittedAt = submittedAt;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}
}