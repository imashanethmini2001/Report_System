package com.weeklyreport.weekly_report_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Object, Long> {
    Optional<Object> findByEmail(String email);
    boolean existsByEmail(String email);
}