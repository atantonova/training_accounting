package com.coursework.training_accounting.repo;

import com.coursework.training_accounting.domain.Company;
import com.coursework.training_accounting.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {
    User findUserByUsername(String username);

    Boolean existsByUsername(String username);

    Iterable<User> findAllBySupervisor(User supervisor);

    Iterable<User> findAllByCompany(Company company);
}
