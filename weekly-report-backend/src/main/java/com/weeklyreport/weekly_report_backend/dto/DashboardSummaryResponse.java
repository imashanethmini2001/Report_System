package com.weeklyreport.weekly_report_backend.dto;

public class DashboardSummaryResponse {
	private long totalReports;
	private long submittedReports;
	private long pendingReports;
	private double complianceRate;
	private long openBlockers;

	public DashboardSummaryResponse(long totalReports, long submittedReports, long pendingReports, double complianceRate, long openBlockers) {
		this.totalReports = totalReports;
		this.submittedReports = submittedReports;
		this.pendingReports = pendingReports;
		this.complianceRate = complianceRate;
		this.openBlockers = openBlockers;
	}

	public long getTotalReports() {
		return totalReports;
	}

	public void setTotalReports(long totalReports) {
		this.totalReports = totalReports;
	}

	public long getSubmittedReports() {
		return submittedReports;
	}

	public void setSubmittedReports(long submittedReports) {
		this.submittedReports = submittedReports;
	}

	public long getPendingReports() {
		return pendingReports;
	}

	public void setPendingReports(long pendingReports) {
		this.pendingReports = pendingReports;
	}

	public double getComplianceRate() {
		return complianceRate;
	}

	public void setComplianceRate(double complianceRate) {
		this.complianceRate = complianceRate;
	}

	public long getOpenBlockers() {
		return openBlockers;
	}

	public void setOpenBlockers(long openBlockers) {
		this.openBlockers = openBlockers;
	}
}