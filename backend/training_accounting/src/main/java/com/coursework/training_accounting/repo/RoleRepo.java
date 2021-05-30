package com.coursework.training_accounting.repo;

import com.coursework.training_accounting.domain.ERole;
import com.coursework.training_accounting.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByName(ERole name);
}
