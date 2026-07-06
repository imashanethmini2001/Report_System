package com.weeklyreport.weekly_report_backend.security;

import com.weeklyreport.weekly_report_backend.entity.User;
import com.weeklyreport.weekly_report_backend.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtService {

	private final JwtProperties jwtProperties;

	private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes());
	}

	public String generateToken(User user) {
		return Jwts.builder()
				.subject(user.getEmail())
				.claim("role", user.getRole().name())
				.claim("userId", user.getId())
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + jwtProperties.getExpiration()))
				.signWith(getSigningKey())
				.compact();
	}

	public String extractEmail(String token) {
		Claims claims = Jwts.parser()
				.verifyWith(getSigningKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();

		return claims.getSubject();
	}
}