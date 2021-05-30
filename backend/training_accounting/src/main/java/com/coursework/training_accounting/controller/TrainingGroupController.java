package com.coursework.training_accounting.controller;

import com.coursework.training_accounting.domain.Certificate;
import com.coursework.training_accounting.domain.CertificateOwning;
import com.coursework.training_accounting.domain.TrainingGroup;
import com.coursework.training_accounting.domain.User;
import com.coursework.training_accounting.dto.CertOwnDto;
import com.coursework.training_accounting.repo.CertificateOwningRepo;
import com.coursework.training_accounting.repo.CertificateRepo;
import com.coursework.training_accounting.repo.TrainingGroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "*")
public class TrainingGroupController {
    private final CertificateOwningRepo certificateOwningRepo;
    private final CertificateRepo certificateRepo;
    private final TrainingGroupRepo trainingGroupRepo;

    @Autowired
    public TrainingGroupController(CertificateOwningRepo certificateOwningRepo,
                                   CertificateRepo certificateRepo,
                                   TrainingGroupRepo trainingGroupRepo) {
        this.certificateOwningRepo = certificateOwningRepo;
        this.certificateRepo = certificateRepo;
        this.trainingGroupRepo = trainingGroupRepo;
    }

    private TrainingGroup getTrainingGroup(CertificateOwning certificateOwning) {
        Certificate certificate = certificateOwning.getCertificate();
        if (certificate == null)
            return null;
        // System.out.println(certificate.getDaysValid());

        Iterable<TrainingGroup> groupsByCertificate = trainingGroupRepo.findAllByCertificate(certificate);
        Calendar dateCertEnds = Calendar.getInstance();
        dateCertEnds.setTime(certificateOwning.getDateReceived());
        dateCertEnds.add(Calendar.MONTH, certificate.getDaysValid()); // daysValid is actually months valid

        Calendar yearFromNow = Calendar.getInstance();
        yearFromNow.add(Calendar.YEAR, 1);

        if (dateCertEnds.after(yearFromNow)) {
            return null;
        }
        for (var group : groupsByCertificate) {
            Calendar dateGroupEnds = Calendar.getInstance();
            dateGroupEnds.setTime(group.getDateStart());
            dateGroupEnds.add(Calendar.DAY_OF_MONTH, group.getDaysLong());

            // System.out.println("group ends " + dateGroupEnds.getTime() + " cert ends " + dateCertEnds.getTime());
            if (!dateGroupEnds.after(dateCertEnds)) {
                return group;
            }
        }

        // no groups found
        dateCertEnds.add(Calendar.DAY_OF_MONTH, -certificate.getTrainingDurationDays());
        Date dateStart = dateCertEnds.getTime();
        TrainingGroup newGroup = new TrainingGroup(
                dateStart,
                certificate.getTrainingDurationDays(),
                certificate);
        return trainingGroupRepo.save(newGroup);
    }

    @GetMapping("/{id}")
    public Iterable<TrainingGroup> trainingGroupsForUser(@PathVariable(name="id") User user) {
        Iterable<CertificateOwning> certificateOwnings = certificateOwningRepo.findAllByOwner(user);
        Set<TrainingGroup> groups = new HashSet<>();
        for (var certOwn : certificateOwnings) {
            TrainingGroup group = getTrainingGroup(certOwn);
            if (group != null)
                groups.add(group);
        }
        return groups;
    }
}
