package com.weeklyreport.weekly_report_backend.service;

import com.weeklyreport.weekly_report_backend.dto.ProjectRequest;
import com.weeklyreport.weekly_report_backend.entity.Project;
import com.weeklyreport.weekly_report_backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

	private final ProjectRepository projectRepository;

	public Project create(ProjectRequest request) {
		Project project = new Project();
		project.setName(request.getName());
		project.setDescription(request.getDescription());
		project.setCreatedAt(LocalDateTime.now());

		return projectRepository.save(project);
	}

	public List<Project> getAll() {
		return projectRepository.findAll();
	}

	public Project update(Long id, ProjectRequest request) {
		Project project = projectRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Project not found"));

		project.setName(request.getName());
		project.setDescription(request.getDescription());

		return projectRepository.save(project);
	}

	public void delete(Long id) {
		projectRepository.deleteById(id);
	}
}