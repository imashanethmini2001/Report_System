package com.weeklyreport.weekly_report_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}

class Project {
}