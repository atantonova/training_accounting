package com.coursework.training_accounting.repo;

import com.coursework.training_accounting.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepo extends JpaRepository<Company, Long> {
    Company findByName(String name);
}
