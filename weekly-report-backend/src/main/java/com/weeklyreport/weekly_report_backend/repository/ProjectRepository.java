package com.weeklyreport.weekly_report_backend.repository;

import com.weeklyreport.weekly_report_backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}