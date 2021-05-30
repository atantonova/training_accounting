package com.coursework.training_accounting.repo;

import com.coursework.training_accounting.domain.Certificate;
import com.coursework.training_accounting.domain.CertificateOwning;
import com.coursework.training_accounting.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface CertificateOwningRepo extends CrudRepository<CertificateOwning, Long> {
    Iterable<CertificateOwning> findAllByOwner(User owner);
    void deleteAllByCertificate(Certificate certificate);
}
