package com.coursework.training_accounting.repo;

import com.coursework.training_accounting.domain.Certificate;
import com.coursework.training_accounting.domain.Company;
import com.coursework.training_accounting.domain.Occupation;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface OccupationRepo extends CrudRepository<Occupation, Long> {
    Occupation findByName(String name);
    Iterable<Occupation> findAllByRequiredCertificatesContains(Certificate certificate);
    Iterable<Occupation> findAllByCompany(Company company);
}
