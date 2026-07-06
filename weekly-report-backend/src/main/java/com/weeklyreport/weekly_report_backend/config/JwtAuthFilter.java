package com.weeklyreport.weekly_report_backend.config;

import com.weeklyreport.weekly_report_backend.entity.User;
import com.weeklyreport.weekly_report_backend.repository.UserRepository;
import com.weeklyreport.weekly_report_backend.security.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final UserRepository userRepository;

	public JwtAuthFilter(JwtService jwtService, UserRepository userRepository) {
		this.jwtService = jwtService;
		this.userRepository = userRepository;
	}

	@Override
	protected void doFilterInternal(
			HttpServletRequest request,
			HttpServletResponse response,
			FilterChain filterChain
	) throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = authHeader.substring(7);
		String email = jwtService.extractEmail(token);

		User user = userRepository.findByEmail(email).orElse(null);

		if (user != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			UsernamePasswordAuthenticationToken authentication =
					new UsernamePasswordAuthenticationToken(
							user,
							null,
							List.of(new SimpleGrantedAuthority(user.getRole().name()))
					);

			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		filterChain.doFilter(request, response);
	}
}