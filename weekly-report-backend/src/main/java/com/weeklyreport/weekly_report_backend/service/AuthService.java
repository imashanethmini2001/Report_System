package com.weeklyreport.weekly_report_backend.service;

import com.weeklyreport.weekly_report_backend.dto.auth.AuthResponse;
import com.weeklyreport.weekly_report_backend.dto.auth.LoginRequest;
import com.weeklyreport.weekly_report_backend.dto.auth.RegisterRequest;
import com.weeklyreport.weekly_report_backend.entity.enums.Role;
import com.weeklyreport.weekly_report_backend.entity.User;
import com.weeklyreport.weekly_report_backend.repository.UserRepository;
import com.weeklyreport.weekly_report_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public AuthResponse register(RegisterRequest request) {
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already exists");
		}

		User user = new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(request.getRole() != null ? request.getRole() : Role.TEAM_MEMBER);
		user.setCreatedAt(LocalDateTime.now());

		user = userRepository.save(user);

		return new AuthResponse(
				jwtService.generateToken(user),
				user.getRole().name(),
				user.getName(),
				user.getEmail()
		);
	}

	public AuthResponse login(LoginRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("Invalid credentials"));

		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new RuntimeException("Invalid credentials");
		}

		return new AuthResponse(
				jwtService.generateToken(user),
				user.getRole().name(),
				user.getName(),
				user.getEmail()
		);
	}
}