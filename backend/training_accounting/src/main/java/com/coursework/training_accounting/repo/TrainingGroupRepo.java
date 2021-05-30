package com.coursework.training_accounting.repo;

import com.coursework.training_accounting.domain.Certificate;
import com.coursework.training_accounting.domain.TrainingGroup;
import org.springframework.data.repository.CrudRepository;

public interface TrainingGroupRepo extends CrudRepository<TrainingGroup, Long> {
    Iterable<TrainingGroup> findAllByCertificate(Certificate certificate);

    void deleteAllByCertificate(Certificate certificate);
}
