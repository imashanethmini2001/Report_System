package com.weeklyreport.weekly_report_backend.controller;

import com.weeklyreport.weekly_report_backend.dto.ProjectRequest;
import com.weeklyreport.weekly_report_backend.entity.Project;
import com.weeklyreport.weekly_report_backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProjectController {

	private final ProjectService projectService;

	@PostMapping
	public Project create(@RequestBody ProjectRequest request) {
		return projectService.create(request);
	}

	@GetMapping
	public List<Project> getAll() {
		return projectService.getAll();
	}

	@PutMapping("/{id}")
	public Project update(@PathVariable Long id, @RequestBody ProjectRequest request) {
		return projectService.update(id, request);
	}

	@DeleteMapping("/{id}")
	public String delete(@PathVariable Long id) {
		projectService.delete(id);
		return "Project deleted successfully";
	}
}