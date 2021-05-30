package com.coursework.training_accounting.repo;

import com.coursework.training_accounting.domain.Certificate;
import com.coursework.training_accounting.domain.Company;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.repository.CrudRepository;

public interface CertificateRepo extends CrudRepository<Certificate, Long> {
    Certificate findByName(String name);
    Certificate findById(long id);
    Iterable<Certificate> findAllByCompany(Company company);
}
